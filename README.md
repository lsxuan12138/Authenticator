# Authenticator

Authenticator 是一款面向 HarmonyOS 的本地双重验证应用，支持标准 TOTP、Steam Guard、二维码与 URI 导入、加密备份以及可切换的第三方图标包。

项目参考了 [kdada/Authenticator](https://github.com/kdada/Authenticator) 中经过验证的 Steam 登录与 Steam Guard 交互流程，但重新组织了数据模型、页面结构和服务边界。Steam 协议字段以 [SteamTracking/Protobufs](https://github.com/SteamTracking/Protobufs) 的持续跟踪结果为基准，并参考 [SteamRE/SteamKit](https://github.com/SteamRE/SteamKit) 核对登录调用语义；编解码代码由 `protobufjs` 生成，不再维护手写的 wire parser。本项目不是上述项目的官方版本或分支。

## 功能

- 标准 TOTP
  - 支持 6 位和 8 位验证码
  - 支持常用的 HMAC-SHA1、HMAC-SHA256 和 HMAC-SHA512
  - 支持自定义刷新周期（1–300 秒）
  - 手动添加与详情页提供常用的 30/60 秒快捷选择
  - 支持手动填写、单条或多行 `otpauth://` URI 和二维码添加
  - 长按验证码复制
- Steam Guard
  - 自动识别 `issuer=Steam`，无需手动开启 Steam 模式
  - 生成 Steam 五位验证码
  - 从 maFile 或 JSON 导入 Steam 元信息
  - 使用账号密码登录 Steam，并处理邮箱验证码、已有 Steam Guard 验证码或设备确认
  - 添加新的移动验证器并获取完整元信息
  - 通过短信转移已有移动验证器
  - 查询 Steam 服务端记录的移动验证器状态
  - 使用撤销码移除移动验证器（成功后同步删除已失效的本地 Token）
  - 查看并处理交易、账户操作以及服务端待登录请求
  - 本机加密保存最近 100 条批准/拒绝操作历史
  - 扫码登录 Steam，并在操作前展示请求设备、位置、IP、会话类型和风险提示
  - 支持明确批准或拒绝扫码登录，并沿用请求方声明的会话持久性
- Token 管理
  - 编辑、删除和拖拽排序
  - 可将 Token URI 显示为二维码，便于迁移到可信设备
  - 新增和恢复时同时按 UUID 与实际 OTP 配置去重
  - UUID 作为唯一标识，备份恢复时按 UUID 合并
  - 普通 Token 与 Steam Token 使用不同的详情能力
- 数据安全
  - Token 数据使用 AES-256-GCM 加密
  - 本机主密钥保存在 HarmonyOS Asset Store，禁止跨设备同步
  - 密码加密备份使用 PBKDF2-SHA256（210,000 次迭代）和 AES-256-GCM
  - Steam 登录密码仅在登录阶段保留于内存，不写入本地存储
  - 可选防截屏保护，设置会持久化并在下次启动时恢复
- 诊断
  - 本地滚动诊断日志支持导出和清理，便于反馈联网或导入问题
  - 日志写入前会清理常见令牌、密钥和密码字段
- 图标包
  - 支持安装、删除和切换多个 Aegis 格式图标包
  - 根据 issuer 自动匹配图标
  - 长按首页图标可从已安装图标包中手动选择
  - 未匹配图标时显示稳定配色的 issuer 首字母
  - 图标列表采用懒加载，避免一次加载大量图片

## 添加 Token

添加入口位于首页右上角，页面提供四种方式：

1. 扫码：扫描普通 TOTP 或 Steam `otpauth://` 二维码。
2. URI：粘贴完整的 `otpauth://` URI；批量添加时每行一个。
3. 手动：填写服务名称、账户、密钥、位数和刷新周期。服务名称为 `Steam` 时会自动使用 Steam 五位验证码与 30 秒周期。
4. Steam：登录 Steam 后添加新的移动验证器，或转移已经存在的移动验证器。

> [!WARNING]
> Steam 登录本身无法读取一个已经存在的移动验证器密钥。若账户已经绑定移动 Steam Guard，只能通过短信转移；转移成功后，原验证器会失效。请在操作前确认能够接收账户绑定手机号的短信，并妥善保存 Steam 返回的撤销码。

## maFile / JSON 导入

Steam Token 详情页支持粘贴 maFile 或等价 JSON。解析器支持常见字段及其别名，包括：

- `steamid` / `steam_id`
- `shared_secret`
- `identity_secret`
- `device_id`
- `access_token`
- `refresh_token`
- `serial_number`
- `token_gid`
- `uri`
- `secret_1`
- `revocation_code`

## 加密备份

设置页可以导出 `.authbackup` 文件，并使用同一密码在其他设备恢复。

- 备份包含 Token 的 OTP 密钥、基本信息、排序和 Steam 元信息。
- 本机沙箱中的图标路径不会导出；恢复后会根据当前设备安装的图标包重新匹配。
- 密码至少需要 8 个字符。
- 当前实现会将备份文件整体读入内存，因此导入文件限制为 8 MB。
- 恢复时相同 UUID 的 Token 会原位更新；不同 UUID 但 OTP 配置相同的条目会跳过，其余条目按备份顺序追加。

请妥善保管备份密码。应用不保存该密码，也无法找回或绕过它。

如需在电脑端检查备份内容，可使用仓库中的 `tools/export_backup_tokens.py`。脚本与当前 v1
备份格式使用相同的 PBKDF2-SHA256（210000 次）、AES-256-GCM、12 字节 IV、16 字节认证标签和
AAD，并按应用当前校验规则输出所有可用 Token 的 `otpauth://` URI；元信息完整的 Steam Token
还会附带可重新导入的 maFile 对象。

```shell
python -m pip install cryptography
python tools/export_backup_tokens.py path/to/backup.authbackup
```

默认会安全地交互输入密码，并在备份旁生成 `*.tokens.json`。输出包含 OTP 密钥及 Steam 会话
凭据，应按明文敏感文件保管并在使用后妥善删除；不建议通过 `-p` 参数传入密码，以免进入命令历史。

## 图标包格式

应用支持包含 `pack.json` 的 ZIP 图标包。`pack.json` 的核心结构如下：

```json
{
  "uuid": "example.icon.pack",
  "name": "Example Icons",
  "version": 1,
  "icons": [
    {
      "filename": "icons/github.png",
      "name": "GitHub",
      "issuer": ["GitHub", "github.com"]
    }
  ]
}
```

`filename` 必须是 ZIP 解压目录内的相对路径。应用会拒绝绝对路径和包含 `..` 的路径，并在系统日志中输出实际解压目录，便于排查包结构问题。

## 项目结构

面向开发与代码审查的完整页面、功能、服务、数据边界和渐进式重构计划见
[项目与代码架构](docs/PROJECT_ARCHITECTURE.md)。新增功能前应先核对其中的产品边界和审查门槛。

```text
entry/src/main/ets/
├── components/       可复用 UI 组件
├── core/             Base32、OTP、URI 与 UUID 等纯逻辑
├── data/             Token 仓库
├── domain/           领域数据结构
├── pages/            应用页面与交互状态
├── security/         本机 Token 信封加密
└── services/         备份、图标包与 Steam 服务
    └── protobuf/     Steam proto 及生成代码
```

## 开发与构建

### 环境要求

- DevEco Studio，包含 HarmonyOS SDK 6.1.1（API 24）
- Node.js（可使用 DevEco Studio 自带版本）
- OHPM

### 安装依赖

```powershell
ohpm install --all
```

### 构建 Debug HAP

可以直接在 DevEco Studio 中构建，也可以在已配置 `NODE_HOME` 与 `DEVECO_SDK_HOME` 的 PowerShell 中运行：

```powershell
hvigorw --mode module `
  -p product=default `
  -p module=entry@default `
  -p buildMode=debug `
  assembleHap --no-daemon
```

未配置签名时，产物位于：

```text
entry/build/default/outputs/default/entry-default-unsigned.hap
```

正式安装或发布前，请在 `build-profile.json5` 中配置自己的签名信息。不要提交证书、私钥、密码或 `local.properties`。

## Protobuf 说明

Steam 协议定义位于：

```text
entry/src/main/ets/services/protobuf/steam_auth.proto
```

`steam_auth.js` 与 `steam_auth.d.ts` 是生成文件，不应直接修改。修改协议时，应先与 SteamTracking 的 `steammessages_auth.steamclient.proto`、`steammessages_twofactor.steamclient.proto` 比对，然后在项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File tools/generate_steam_protobuf.ps1
```

脚本按照 `@ohos/protobufjs@2.1.0` 上游说明固定使用 `protobufjs@7.2.4` 和 `protobufjs-cli@1.1.3`，并自动完成 HarmonyOS 导入、`long` 和 ArkTS 声明的兼容处理。`protobufjs-cli@1.1.3` 的 `pbts` 在输入含顶层枚举时会引用消息的 `I*` 接口却漏掉接口定义；脚本优先保留 `pbts` 已生成的接口，并根据 `.proto` 自动补齐缺失定义。不要手工维护接口或消息字段编号。升级 `@ohos/protobufjs` 或生成器前必须重新验证运行时和生成代码兼容性。

Steam 代码按职责分为三层：

- `SteamWebApiClient` 是唯一的 Network Kit 入口，统一处理超时、HTTP 状态、`x-eresult`、日志和请求释放。
- `SteamProtocol` 是生成代码的唯一业务适配入口，负责 protobuf 请求构造、响应解码和领域模型转换。
- 登录、会话、验证器和移动确认服务只编排各自流程，不再各自实现 HTTP 或 protobuf 解析。

RSA 公钥和 `GenerateAccessTokenForApp` 保留 kdada/Authenticator 已验证的 JSON/表单调用形式；登录会话、扫码会话与 TwoFactor 接口使用 SteamTracking 定义生成的 protobuf。两类请求都经过同一个网络底层。历史协议中的 `want_more = 2` 已被当前 SteamTracking 与 SteamKit 移除；后续字段仍保留原始 wire tag，不能因为中间字段消失而重新编号。

## 权限与网络

应用声明 `ohos.permission.INTERNET`，仅 Steam 登录、验证器注册、待确认项目和扫码登录等 Steam 在线功能需要联网。普通 TOTP 生成、Token 管理和本地备份不依赖网络。

## 致谢与第三方组件

Steam 相关流程参考 [kdada/Authenticator](https://github.com/kdada/Authenticator)。第三方依赖及许可信息见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

本项目与 Valve 或 Steam 无隶属、授权或背书关系。Steam 是 Valve Corporation 的商标。
