"""Regression tests for the portable backup inspection/export tool."""

from __future__ import annotations

import base64
import hashlib
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

import export_backup_tokens as tool


PASSWORD = "correct horse battery staple"
SALT = bytes(range(16))
IV = bytes(range(12))


def token_fixture() -> list[dict[str, object]]:
    """Create current-version TOTP and Steam records with deterministic secrets."""
    return [
        {
            "id": "12345678-1234-4234-9234-1234567890ab",
            "issuer": "示例 服务",
            "account": "alice@example.com",
            "secret": "JBSWY3DPEHPK3PXP",
            "digits": 8,
            "period": 60,
            "kind": "totp",
            "algorithm": "SHA256",
            "iconPath": "",
            "iconManual": False,
            "createdAt": 1_700_000_000_000,
        },
        {
            "id": "22345678-1234-4234-a234-1234567890ab",
            "issuer": "Steam",
            "account": "steam_user",
            "secret": "AEBAGBAFAYDQQCIKBMGA2DQPCAIREEYU",
            "digits": 5,
            "period": 30,
            "kind": "steam",
            "algorithm": "SHA1",
            "iconPath": "",
            "iconManual": False,
            "createdAt": 1_700_000_000_001,
            "steam": {
                "steamId": "76561198000000000",
                "accountName": "steam_login",
                "identitySecret": "AQIDBAUGBwgJCgsMDQ4PEBESExQ=",
                "deviceId": "android:00000000-0000-0000-0000-000000000000",
                "accessToken": "access.jwt",
                "refreshToken": "refresh.jwt",
                "guardData": "guard.jwt",
                "revocationCode": "R12345",
                "serialNumber": "123456789",
                "tokenGid": "987654321",
                "uri": "otpauth://totp/Steam:steam_login?secret=original",
                "secret1": "AQIDBA",
            },
        },
    ]


def encrypted_envelope(content: dict[str, object], padded: bool = False) -> dict[str, object]:
    """Encrypt a fixture with the exact PBKDF2/AES-GCM envelope used by BackupService."""
    plaintext = json.dumps(content, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    if padded:
        padding = 16 - len(plaintext) % 16
        plaintext += bytes([padding]) * padding
    key = hashlib.pbkdf2_hmac("sha256", PASSWORD.encode(), SALT, 210_000, dklen=32)
    combined = AESGCM(key).encrypt(IV, plaintext, tool.BACKUP_AAD)
    return {
        "format": tool.BACKUP_FORMAT,
        "version": tool.BACKUP_VERSION,
        "createdAt": 1_700_000_000_002,
        "iterations": 210_000,
        "salt": base64.b64encode(SALT).decode(),
        "iv": base64.b64encode(IV).decode(),
        "authTag": base64.b64encode(combined[-16:]).decode(),
        "ciphertext": base64.b64encode(combined[:-16]).decode(),
    }


class BackupToolTests(unittest.TestCase):
    """Verify current app format, token normalization, URI and maFile conversion."""

    def test_decrypt_and_export_current_backup(self) -> None:
        content = {"version": 1, "tokens": token_fixture()}
        decrypted = tool.decrypt_backup(encrypted_envelope(content), PASSWORD)
        result, skipped = tool.export_tokens(decrypted)

        self.assertEqual(0, skipped)
        self.assertEqual(2, len(result["tokens"]))
        self.assertIn("algorithm=SHA256&digits=8&period=60", result["tokens"][0]["uri"])
        mafile = result["tokens"][1]["mafile"]
        self.assertEqual(76561198000000000, mafile["steam_id"])
        self.assertEqual("steam_login", mafile["account_name"])
        self.assertEqual("AQIDBAUGBwgJCgsMDQ4PEBESExQ=", mafile["shared_secret"])
        self.assertEqual("guard.jwt", mafile["guard_data"])
        self.assertEqual("access.jwt", mafile["tokens"]["access_token"])

    def test_optional_harmony_pkcs7_output_is_accepted(self) -> None:
        content = {"version": 1, "tokens": token_fixture()}
        self.assertEqual(content, tool.decrypt_backup(encrypted_envelope(content, padded=True), PASSWORD))

    def test_wrong_password_and_wrong_content_version_are_rejected(self) -> None:
        content = {"version": 1, "tokens": token_fixture()}
        with self.assertRaisesRegex(ValueError, "密码错误或文件已损坏"):
            tool.decrypt_backup(encrypted_envelope(content), "wrong password")
        wrong_version = {"version": 2, "tokens": token_fixture()}
        with self.assertRaisesRegex(ValueError, "内容版本"):
            tool.decrypt_backup(encrypted_envelope(wrong_version), PASSWORD)

    def test_validation_matches_current_token_rules(self) -> None:
        invalid = token_fixture()[0]
        invalid["digits"] = True
        result, skipped = tool.export_tokens({"version": 1, "tokens": [invalid]})
        self.assertEqual([], result["tokens"])
        self.assertEqual(1, skipped)
        with self.assertRaisesRegex(ValueError, "填充位"):
            tool.normalized_secret("AB")

        numeric = token_fixture()[0]
        numeric["digits"] = 8.0
        numeric["period"] = 60.0
        self.assertEqual(8, tool.normalize_token(numeric)["digits"])
        lowercase = token_fixture()[0]
        lowercase["algorithm"] = "sha256"
        with self.assertRaisesRegex(ValueError, "摘要算法"):
            tool.normalize_token(lowercase)

    def test_cli_file_loader_and_size_guard(self) -> None:
        content = {"version": 1, "tokens": token_fixture()}
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "sample.authbackup"
            path.write_text(json.dumps(encrypted_envelope(content)), encoding="utf-8")
            self.assertEqual(content, tool.load_encrypted_backup(path, PASSWORD))
            path.write_bytes(b"x" * (tool.MAX_BACKUP_SIZE + 1))
            with self.assertRaisesRegex(ValueError, "小于 8 MB"):
                tool.load_encrypted_backup(path, PASSWORD)

    def test_cli_writes_expected_json(self) -> None:
        content = {"version": 1, "tokens": token_fixture()}
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "sample.authbackup"
            output = Path(directory) / "sample.tokens.json"
            source.write_text(json.dumps(encrypted_envelope(content)), encoding="utf-8")
            argv = ["export_backup_tokens.py", str(source), "-p", PASSWORD, "-o", str(output)]
            with patch("sys.argv", argv):
                self.assertEqual(0, tool.main())
            exported = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(2, len(exported["tokens"]))
            self.assertIn("mafile", exported["tokens"][1])


if __name__ == "__main__":
    unittest.main()
