#!/usr/bin/env python3
"""Decrypt an Authenticator backup and export OTP URIs plus Steam maFile data."""

from __future__ import annotations

import argparse
import base64
import binascii
import getpass
import hashlib
import json
import re
import sys
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlencode


BACKUP_FORMAT = "harmony-authenticator-backup"
BACKUP_AAD = b"harmony-authenticator-backup.v1"


def parse_args() -> argparse.Namespace:
    """解析输入备份、密码和可选输出路径等命令行参数。"""
    parser = argparse.ArgumentParser(
        description=(
            "解密 Authenticator 备份，输出所有 Token 的 otpauth URI；"
            "带元信息的 Steam Token 会额外包含 mafile 对象。"
        )
    )
    parser.add_argument("input", type=Path, help="应用导出的 .authbackup 文件")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="输出 JSON 路径；默认在输入文件旁生成 *.tokens.json",
    )
    parser.add_argument(
        "-p",
        "--password",
        help="备份密码；省略时安全地交互输入（推荐）",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="允许覆盖已有的输出文件",
    )
    return parser.parse_args()


def decode_base64(value: Any, field: str) -> bytes:
    """校验并解码备份外层的 Base64 字段，同时提供明确字段名错误。"""
    if not isinstance(value, str) or not value:
        raise ValueError(f"备份字段 {field} 缺失或不是字符串")
    try:
        return base64.b64decode(value, validate=True)
    except (binascii.Error, ValueError) as error:
        raise ValueError(f"备份字段 {field} 不是有效的 Base64") from error


def remove_optional_pkcs7(data: bytes) -> bytes:
    """移除 HarmonyOS AES256|GCM|PKCS7 可能保留的可选填充。"""
    if not data:
        return data
    padding = data[-1]
    if 1 <= padding <= 16 and data.endswith(bytes([padding]) * padding):
        return data[:-padding]
    return data


def decrypt_backup(envelope: dict[str, Any], password: str) -> dict[str, Any]:
    """按应用备份格式派生密钥、验证 GCM 标签并返回解密后的 JSON 对象。"""
    try:
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    except ImportError as error:
        raise RuntimeError(
            "解密备份需要 cryptography，请先运行：pip install cryptography"
        ) from error

    if envelope.get("format") != BACKUP_FORMAT or envelope.get("version") != 1:
        raise ValueError("这不是受支持的 Authenticator 加密备份")
    if not password:
        raise ValueError("备份密码不能为空")

    iterations = envelope.get("iterations")
    if not isinstance(iterations, int) or not 10_000 <= iterations <= 1_000_000:
        raise ValueError("备份中的 PBKDF2 迭代次数无效")

    salt = decode_base64(envelope.get("salt"), "salt")
    iv = decode_base64(envelope.get("iv"), "iv")
    auth_tag = decode_base64(envelope.get("authTag"), "authTag")
    ciphertext = decode_base64(envelope.get("ciphertext"), "ciphertext")
    if len(salt) != 16 or len(iv) != 12 or len(auth_tag) != 16:
        raise ValueError("备份的 salt、IV 或认证标签长度无效")

    key = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, iterations, dklen=32
    )
    try:
        plaintext = AESGCM(key).decrypt(iv, ciphertext + auth_tag, BACKUP_AAD)
    except Exception as error:
        raise ValueError("无法解密备份：密码错误或文件已损坏") from error

    try:
        content = json.loads(remove_optional_pkcs7(plaintext).decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise ValueError("备份已解密，但内容不是有效的 UTF-8 JSON") from error
    if not isinstance(content, dict):
        raise ValueError("解密后的备份根节点必须是对象")
    return content


def load_encrypted_backup(path: Path, password: str) -> dict[str, Any]:
    """以 UTF-8 读取加密备份外壳并交给统一解密流程。"""
    try:
        envelope = json.loads(path.read_text(encoding="utf-8-sig"))
    except OSError as error:
        raise ValueError(f"无法读取输入文件：{error}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"输入文件不是有效的 JSON：第 {error.lineno} 行") from error
    if not isinstance(envelope, dict):
        raise ValueError("输入 JSON 的根节点必须是对象")
    return decrypt_backup(envelope, password)


def string_value(value: Any) -> str:
    """把可选 JSON 字段安全收敛为去除首尾空白的字符串。"""
    return value.strip() if isinstance(value, str) else ""


def normalized_secret(value: Any) -> str:
    """规范化并校验 Token 的 Base32 OTP 密钥。"""
    if not isinstance(value, str) or not value.strip():
        raise ValueError("Token 缺少 OTP 密钥")
    secret = re.sub(r"[\s=-]", "", value).upper()
    padding = "=" * ((8 - len(secret) % 8) % 8)
    try:
        base64.b32decode(secret + padding, casefold=True)
    except (binascii.Error, ValueError) as error:
        raise ValueError("Token 的 Base32 密钥无效") from error
    return secret


def build_otpauth_uri(token: dict[str, Any]) -> str:
    """根据备份 Token 字段重建可供其他验证器导入的 otpauth URI。"""
    issuer = string_value(token.get("issuer"))
    account = string_value(token.get("account"))
    secret = normalized_secret(token.get("secret"))
    is_steam = string_value(token.get("kind")).lower() == "steam" or issuer.lower() == "steam"

    label = f"{issuer}:{account}" if issuer else account
    digits = 5 if is_steam else token.get("digits", 6)
    period = token.get("period", 30)
    if not isinstance(digits, int) or digits <= 0:
        digits = 6
    if not isinstance(period, int) or period <= 0:
        period = 30

    query: list[tuple[str, str]] = [("secret", secret)]
    if issuer:
        query.append(("issuer", issuer))
    query.extend(
        [("algorithm", "SHA1"), ("digits", str(digits)), ("period", str(period))]
    )
    return f"otpauth://totp/{quote(label, safe='')}?{urlencode(query, quote_via=quote)}"


def shared_secret_to_base64(secret: Any) -> str:
    """把应用保存的 Base32 Steam shared secret 转换为 maFile 所需 Base64。"""
    normalized = normalized_secret(secret)
    padding = "=" * ((8 - len(normalized) % 8) % 8)
    secret_bytes = base64.b32decode(normalized + padding, casefold=True)
    return base64.b64encode(secret_bytes).decode("ascii")


def build_mafile(token: dict[str, Any]) -> dict[str, Any] | None:
    """为元信息完整的 Steam Token 生成 maFile 对象，普通 Token 返回 None。"""
    steam = token.get("steam")
    if not isinstance(steam, dict) or not steam:
        return None

    steam_id_text = string_value(steam.get("steamId"))
    if not steam_id_text.isdigit():
        return None
    account_name = string_value(steam.get("accountName")) or string_value(
        token.get("account")
    )

    return {
        "account_name": account_name,
        "steam_id": int(steam_id_text),
        "serial_number": string_value(steam.get("serialNumber")),
        "revocation_code": string_value(steam.get("revocationCode")),
        "shared_secret": shared_secret_to_base64(token.get("secret")),
        "token_gid": string_value(steam.get("tokenGid")),
        "identity_secret": string_value(steam.get("identitySecret")),
        "uri": string_value(steam.get("uri")) or build_otpauth_uri(token),
        "device_id": string_value(steam.get("deviceId")),
        "guard_data": string_value(steam.get("guardData")),
        "secret_1": string_value(steam.get("secret1")),
        "tokens": {
            "access_token": string_value(steam.get("accessToken")),
            "refresh_token": string_value(steam.get("refreshToken")),
        },
    }


def export_tokens(content: dict[str, Any]) -> tuple[dict[str, Any], int]:
    """导出所有 Token URI，并为符合条件的 Steam Token 附加 maFile 数据。"""
    source_tokens = content.get("tokens")
    if not isinstance(source_tokens, list):
        raise ValueError("解密内容缺少 tokens 数组")

    exported: list[dict[str, Any]] = []
    skipped = 0
    for index, token in enumerate(source_tokens, start=1):
        if not isinstance(token, dict):
            print(f"跳过第 {index} 个 Token：数据格式无效", file=sys.stderr)
            skipped += 1
            continue
        try:
            item: dict[str, Any] = {"uri": build_otpauth_uri(token)}
            mafile = build_mafile(token)
            if mafile is not None:
                item["mafile"] = mafile
            exported.append(item)
        except ValueError as error:
            print(f"跳过第 {index} 个 Token：{error}", file=sys.stderr)
            skipped += 1
    return {"tokens": exported}, skipped


def default_output_path(input_path: Path) -> Path:
    """在输入文件旁生成不会覆盖原备份的默认输出文件名。"""
    return input_path.with_name(f"{input_path.stem}.tokens.json")


def main() -> int:
    """执行解密、转换和 UTF-8 JSON 写出，并返回进程退出码。"""
    args = parse_args()
    output = args.output or default_output_path(args.input)
    if output.exists() and not args.overwrite:
        print(f"错误：输出文件已存在：{output}；可使用 --overwrite 覆盖", file=sys.stderr)
        return 1

    password = args.password
    if password is None:
        password = getpass.getpass("备份密码：")

    try:
        content = load_encrypted_backup(args.input, password)
        result, skipped = export_tokens(content)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(
            json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
    except (ValueError, RuntimeError, OSError) as error:
        print(f"错误：{error}", file=sys.stderr)
        return 1

    count = len(result["tokens"])
    print(f"已输出：{output}")
    print(f"完成：导出 {count} 个 Token，跳过 {skipped} 个条目。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
