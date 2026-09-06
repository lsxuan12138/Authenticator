# Authenticator 产品与代码架构

本文是 Authenticator 当前功能边界、页面职责、调用关系和后续重构规则的权威说明。新增或删除功能时，应先更新本文，再修改代码和测试清单；README 继续面向使用者，本文面向开发与代码审查。

> 基线：2026-09-06，基于提交 `09a3ff3` 之后的代码梳理。交易确认协议已经实现，但仍缺少真实账户的完整实机验证。

## 1. 产品边界

### 1.1 当前应提供的功能

- 标准 TOTP：SHA-1、SHA-256、SHA-512，6/8 位，周期 1–300 秒。
- Token 添加：二维码、`otpauth://` URI、手动填写。
- Token 管理：编辑、删除、拖拽排序、长按复制、二维码展示和手动选择图标。
- Steam Guard：五位验证码、maFile/JSON 导入、账号登录、新增验证器、短信迁移。
- Steam 在线操作：会话更新、扫码登录、待登录请求、交易/账户操作确认、验证器状态查询和撤销。
- 本地能力：安全持久化、加密导入导出、多图标包管理、诊断日志、中英文、防截屏。
- Steam 操作历史：仅记录已经完成的批准/拒绝摘要，最多 100 条；这是本地持久化功能，继续保留。

### 1.2 明确不做的功能

以下内容不属于当前产品范围，不能因为参考仓库存在相似实现而直接加入：

- Steam 公开资料、头像或昵称同步。
- Steam 社区、好友、聊天、库存、交易市场等完整客户端能力。
- 增强代理或应用内代理配置。
- 内嵌图标包；没有安装图标包时使用稳定配色的首字母图标。
- Steam Desktop Authenticator 加密文件导入；当前仅导入明文 maFile/JSON。
- Google Authenticator 批量迁移和服务卡片。
- HOTP、SHA-3、任意非常用验证码位数等扩展 OTP 能力。

如果以后需要其中任何一项，应先记录需求来源、入口、保存的数据、网络行为和测试方法，再决定是否实现。

## 2. 总体结构

当前应用适合继续保持单 Entry HAP、单 UIAbility。HarmonyOS 推荐以 `Navigation` 作为根容器、`NavDestination` 作为子页面并由 `NavPathStack` 管理页面栈；项目已经使用系统路由表完成页面名到 Builder 的映射，不需要改回已不推荐的 `router`。

逻辑依赖方向应保持为：

```text
页面与组件（展示、输入、短生命周期状态）
        ↓
应用编排（AppStore；后续逐步提取 use case/controller）
        ↓
领域模型与纯逻辑（Token、OTP、URI、校验、去重）
        ↓
基础设施（安全存储、文件、图标包、日志、Steam 网络与协议）
        ↓
HarmonyOS Kit / Steam 服务端
```

代码目录的当前含义：

| 目录 | 当前职责 | 约束 |
| --- | --- | --- |
| `pages/` | 页面 UI、页面状态和用户操作编排 | 不直接使用 Network Kit、Preferences、Asset Store 或 protobuf 生成对象 |
| `components/` | 可复用的局部 UI | 不持久化业务数据，不发起 Steam 请求 |
| `navigation/` | 路由名、参数和唯一 `NavPathStack` | 不承载业务状态 |
| `domain/` | `StoredToken`、Steam 元信息等稳定领域模型 | 不依赖页面或系统 I/O |
| `core/` | OTP、Base32、URI、UUID、校验、去重、本地化错误适配 | 尽量保持纯逻辑；本地化是当前例外 |
| `data/` | 响应式共享状态和 Token 仓库 | Token 必须先持久化成功，再更新 `AppStorage` |
| `security/` | Asset Store 主密钥与 AES-GCM 信封加密 | 不关心页面、Steam 或图标业务 |
| `services/` | 文件、设置、日志、图标以及 Steam 业务/基础设施 | 当前目录较宽，后续按本文第 9 节逐步细分 |
| `services/protobuf/` | Steam `.proto` 与生成物 | `.js`、`.d.ts` 禁止手工修改 |
| `resources/` | 中英文字符串、浅色/深色颜色、媒体和路由表 | 用户可见文本必须通过资源本地化 |
| `tools/` | 备份解析和 protobuf 生成脚本 | 必须与应用当前格式和生成流程同步维护 |

## 3. 页面与导航

首页是根 `Navigation` 的 NavBar，不进入页面栈。其他页面由 `router_map.json` 注册为 `NavDestination`。

```text
首页 Index
├─ 添加 AddTokenPage
├─ 设置 SettingsPage
└─ Token 详情 TokenDetailPage
   ├─ 图标选择 IconPickerPage
   ├─ Steam 确认 SteamConfirmationsPage
   └─ Steam 管理 SteamManagementPage
```

| 页面 | 用户入口与职责 | 主要依赖 |
| --- | --- | --- |
| `Index.ets` | 显示动态验证码；复制；排序；删除；展示 URI 二维码；进入详情、添加、设置和图标选择 | `OtpEngine`、`OtpUriParser`、`IconPackService`、`AppStore`、`SteamLocalDataCleaner` |
| `AddTokenPage.ets` | 四个 Tab：扫码、URI、手动、Steam；Steam Tab 负责登录后新增或迁移验证器 | `OtpUriParser`、`TokenDuplicateGuard`、`SteamLoginService`、`SteamAuthenticatorService`、`SteamSessionService`、`AppStore` |
| `TokenDetailPage.ets` | 编辑通用 Token 字段；选择图标；Steam Token 进入确认/管理；处理 Steam 扫码登录 | `Base32`、`IconPackService`、`SteamGuardService`、`SteamSessionService`、`SteamConfirmationHistoryRepository`、`AppStore` |
| `IconPickerPage.ets` | 懒加载全部已安装图标包并保存手动图标覆盖 | `TokenIconPicker`、`IconPackService`、`AppStore` |
| `SteamConfirmationsPage.ets` | 分开展示待处理与历史；待处理再分登录请求和交易/账户操作；支持单项与批量操作 | `SteamGuardService`、`SteamSessionService`、`SteamConfirmationHistoryRepository`、`AppStore` |
| `SteamManagementPage.ets` | 会话状态与重新登录；服务端验证器状态与撤销；元信息只读展示及高级修复/导入 | `SteamSessionService`、`SteamLoginService`、`SteamAuthenticatorService`、`SteamImportService`、`AppStore` |
| `SettingsPage.ets` | 图标包安装/选择/删除；加密备份；诊断日志；防截屏 | `IconPackService`、`BackupService`、`DiagnosticLogService`、`AppSettingsService`、`AppStore` |

路由约束：

- Token 相关页面只传 UUID，不传完整 Token，页面始终从共享状态读取最新记录。
- `AppRouter` 持有与根 `Navigation` 一一对应的唯一 `NavPathStack`。
- `*PageBuilder` 由系统路由表调用，即使静态搜索没有普通调用点也不能删除。
- 页面离开时必须清理密码、验证码、临时密钥和进行中的轮询。

## 4. 功能到服务的完整映射

### 4.1 标准 Token

| 功能 | 核心流程 | 数据写入 |
| --- | --- | --- |
| 扫码/URI 添加 | Scan Kit → `OtpUriParser` → `TokenValidator` → `TokenDuplicateGuard` → `AppStore.updateTokens` | 加密 Token 仓库 |
| 手动添加 | 页面输入 → `Base32`/字段检查 → `TokenDuplicateGuard` → `AppStore.updateTokens` | 加密 Token 仓库 |
| 验证码显示 | `StoredToken` → `OtpEngine` → `TokenCode` | 无 |
| 编辑/排序/删除 | 页面生成新数组 → `AppStore.updateTokens` | 加密 Token 仓库 |
| URI 二维码 | `OtpUriParser.serialize` → ArkUI `QRCode` | 无 |

### 4.2 Steam 登录、验证器与确认

| 功能 | 应用服务 | 底层依赖 | 结果 |
| --- | --- | --- | --- |
| 账号密码登录 | `SteamLoginService` | `SteamProtocol`、`SteamWebApiClient`、Crypto Kit | `SteamSessionTokens`；密码不落盘 |
| 新增验证器 | `SteamAuthenticatorService` | `SteamSessionService`、`SteamTimeService`、`SteamProtocol`、`SteamWebApiClient` | 完整 Steam Token 元信息 |
| 短信迁移 | `SteamAuthenticatorService` | 同上；迁移后用 QueryStatus 获取服务端 Device ID | 新验证器密钥和会话 |
| 会话续期 | `SteamSessionService` | `SteamWebApiClient` | 新 Access Token；必要时同时返回 Refresh Token |
| 状态查询/撤销 | `SteamAuthenticatorService` | `SteamSessionService`、`SteamProtocol`、`SteamWebApiClient` | 服务端状态；撤销成功后删除本地 Token 与关联历史 |
| 扫码登录 | `SteamGuardService` | `SteamSessionService`、`SteamProtocol`、`SteamWebApiClient` | 批准/拒绝，并写本地操作历史 |
| 待登录请求 | `SteamGuardService` | 同上 | 服务端请求列表与处理结果 |
| 交易/账户确认 | `SteamGuardService` | `SteamTimeService`、Community HTTP 接口 | 服务端确认列表与处理结果 |
| maFile/JSON 导入 | `SteamImportService` | File Kit、字段/Base64 校验 | 更新 Steam 元信息与共享密钥 |

Steam 底层必须遵守：

1. `SteamWebApiClient` 是唯一 Network Kit 入口，其他 Steam 类不得自行创建 `HttpRequest`。
2. `SteamProtocol` 是业务代码接触生成 protobuf 的唯一适配层。
3. `SteamSessionService` 是 Access Token 有效期、透明刷新、并发合并和进程缓存的唯一实现。
4. 透明刷新产生的新 Access/Refresh Token 必须通过 `AppStore.updateSteamSession` 写回安全仓库。
5. 查询页面不应自动发起与页面目的无关的请求；任何新增网络请求都必须有明确用户入口或文档化的必要生命周期触发点。
6. 错误详情写入脱敏诊断日志，用户界面只显示本地化、可行动的错误信息。

### 4.3 图标、备份、日志和设置

| 功能 | 负责类 | 边界 |
| --- | --- | --- |
| 图标包安装/发现/删除/选择 | `IconPackService` | 只支持 Aegis ZIP；校验大小、数量和路径；正式目录位于 `filesDir/icon_packs` |
| 图标解析 | `IconPackService` | 手动有效路径 > 当前包自动匹配 > 首字母默认图标 |
| 可移植备份 | `BackupService` | PBKDF2-SHA256 + AES-256-GCM；不导出沙箱图标路径 |
| 本机 Token 加密 | `TokenRepository` + `SecureTokenVault` | Preferences 只保存密文；主密钥只在 Asset Store |
| 诊断日志 | `DiagnosticLogService` | 三个 256 KiB 环形文件；写入前脱敏；用户主动导出 |
| 防截屏 | `AppSettingsService` + `EntryAbility` | Preferences 保存开关；启动时恢复到主窗口 |
| 密码保险箱 | `PasswordAutoFillService` | 只发起系统保存请求；应用不保存 Steam 密码 |

## 5. 服务职责索引

| 类 | 唯一职责 |
| --- | --- |
| `AppStore` | 连接加密仓库与 `AppStorage`，提供页面间一致的 Token/图标包状态 |
| `TokenRepository` | 读取、校验、加密保存 Token 数组 |
| `SecureTokenVault` | 管理本机主密钥及通用 AES-GCM 信封 |
| `BackupService` | 创建、读取、合并和选择文件形式的密码加密备份 |
| `IconPackService` | 管理第三方图标包生命周期与图标匹配 |
| `DiagnosticLogService` | 脱敏、轮换、统计、清理和导出诊断日志 |
| `AppSettingsService` | 保存并应用非敏感应用设置 |
| `PasswordAutoFillService` | 调用 HarmonyOS 自动填充保存能力 |
| `SteamLoginService` | 凭据登录、确认方式处理与轮询 |
| `SteamAuthenticatorService` | 验证器新增、激活、迁移、状态和撤销 |
| `SteamGuardService` | 扫码登录、待登录请求和移动确认 |
| `SteamSessionService` | Access Token 选择、有效期解析、刷新和进程缓存 |
| `SteamTimeService` | Steam 服务端校时与偏差缓存 |
| `SteamImportService` | maFile/JSON 兼容解析与文件读取 |
| `SteamConfirmationHistoryRepository` | 加密保存本地操作历史 |
| `SteamLocalDataCleaner` | Token 删除/撤销后的关联历史和内存会话清理 |
| `SteamProtocol` | 生成 protobuf 与稳定领域对象之间的唯一转换层 |
| `SteamWebApiClient` | Steam HTTP 请求、超时、HTTP/EResult 校验和释放 |
| `SteamResult` | Steam EResult 到可本地化应用错误的映射 |

## 6. 数据与安全边界

| 数据 | 位置 | 是否敏感 | 生命周期/说明 |
| --- | --- | --- | --- |
| Token 与 Steam 元信息 | Preferences `authenticator_v1/tokens_encrypted_v2` | 是 | `SecureTokenVault` 加密；应用卸载时删除 |
| AES 主密钥 | Asset Store `authenticator.token-master-key.v1` | 是 | 禁止跨设备同步 |
| 页面共享 Token | `AppStorage` | 是 | 仅进程内；不是额外持久化副本 |
| Steam Access Token 缓存 | `SteamSessionService` 静态 Map | 是 | 仅进程内；删除 Token 时失效 |
| Steam 操作历史 | Preferences `authenticator_steam_history` | 可能敏感 | 独立 AAD 加密；全局最多 100 条 |
| 活动图标包键 | Preferences `icon_settings_v1` | 否 | 只保存当前选择 |
| 图标包文件 | `filesDir/icon_packs` | 否 | 每个包独立正式目录 |
| 防截屏设置 | Preferences `authenticator_settings` | 否 | Ability 启动时恢复 |
| 诊断日志 | `filesDir/diagnostic_logs` | 可能敏感 | 脱敏后轮换；不自动上传 |
| 备份文件 | 用户选择的外部位置 | 是 | 密码派生密钥加密；应用不保存密码 |
| Steam 登录密码/验证码 | 页面内存 | 是 | 页面离开或流程重置时清空，不落盘 |

Steam 可选返回的 Guard Data 是供以后重新登录使用的 remembered-machine 兼容字段。应用继续加密保存、备份和回传它，但普通会话 UI 不展示；只有高级修复模式显示“已配置/未配置”，且不允许直接编辑原始值。

任何新增字段必须同时回答：是否进入本机密文、是否进入备份、是否进入日志、删除 Token 时如何清理、是否需要本地化展示。

## 7. 关键状态流

### 7.1 Token 写入

```text
页面构造新 Token 数组
  → AppStore.updateTokens
  → TokenRepository.save
  → TokenValidator.normalizeAll
  → SecureTokenVault.encrypt
  → Preferences flush + 回读校验
  → AppStorage 更新并触发相关页面刷新
```

持久化失败时不得先修改 `AppStorage`，否则 UI 会显示并不存在于磁盘的数据。

### 7.2 Steam 会话透明刷新

```text
页面读取最新 StoredToken
  → SteamSessionService.resolveAccessToken
  ├─ 当前 Access Token 有效：直接复用
  └─ 无效/即将过期：用 Refresh Token 生成新 Token
       → 合并同账户并发刷新
       → AppStore.updateSteamSession 按 UUID 持久化
       → 继续原始 Steam 操作
```

添加/迁移尚未创建 Token 时，新会话暂存在 `AddTokenPage`，最终保存验证器时一次写入。

## 8. 当前审计结论

### 8.1 已确认应保留

- 六个 `*PageBuilder`：由 `router_map.json` 反射调用，不是死代码。
- `TokenIconPicker` 中四个 `IDataSource` 方法：由 ArkUI `LazyForEach` 调用。
- `SteamProtocol.ets`：虽然较大，但它是生成 protobuf 与业务模型之间必需的适配层。
- `steam_auth.js` 和 `steam_auth.d.ts`：构建时需要的生成物，修改来源只能是 `.proto` 和生成脚本。
- `SteamConfirmationHistoryRepository`：用户明确要求保留操作历史。
- `no-pack` 选择键：表示“不使用图标包”的持久化状态，不是内嵌图标包残留。

### 8.2 未发现可直接删除的代码

本轮对所有 `.ets` 顶层类、接口、枚举、类型、函数和常规方法做了引用扫描。除框架反射入口外，没有发现只定义而从未使用的业务符号。因此本轮不删除文件，避免把“低可见度框架入口”误判为冗余代码。

### 8.3 需要逐步收敛的结构问题

| 优先级 | 问题 | 风险 | 建议 |
| --- | --- | --- | --- |
| P1 | `AddTokenPage` 约 950 行，同时承担四种添加方式和完整 Steam 状态机 | 修改一种流程容易影响其他 Tab | 先提取 `SteamEnrollmentController`，再拆四个 Tab 组件；行为保持不变 |
| P1 | `SteamManagementPage` 约 780 行，同时负责会话、状态/撤销和数据修复 | 网络状态、表单状态互相干扰 | 按现有三个 Tab 提取独立组件/controller |
| P1 | 三个 Steam 页面重复“解析会话并持久化透明刷新” | 容易有一个入口忘记保存新 Token | 提取 `SteamTokenSessionCoordinator`，统一调用 `SteamSessionService` 与 `AppStore` |
| P2 | 页面重复 toast、本地化错误和部分忙碌状态处理 | 文案或错误策略容易不一致 | 提取小型 UI helper；不要做承载所有页面状态的巨型基类 |
| P2 | `services/` 同时包含业务服务、仓库和系统基础设施 | 新代码难以判断放置位置 | 逐步分为 `application/steam`、`data`、`infrastructure`；不为目录整洁一次性搬动全部文件 |
| P2 | `AppStore.initialize` 直接依赖 `IconPackService` | 数据入口同时承担图标修复编排 | 后续提取 `AppInitializer`，让 `AppStore` 只管理状态与 Token 持久化 |
| P3 | 大量页面直接持有数组级 `@StorageLink` | Token 任一变化可能让多个页面刷新 | 实机稳定后评估更细粒度状态；不要在测试前改动状态模型 |

这些是结构债务，不是新增产品功能。重构必须以现有行为、数据格式和网络协议不变为前提，并分小提交完成。

## 9. 推荐的渐进式目录目标

当前无需拆成多个 HAP/HSP；对单窗口验证器而言，单 HAP 更简单。只在 Entry 内逐步形成清晰边界：

```text
ets/
├─ pages/                    页面容器
├─ components/               无持久化、无网络的 UI
├─ application/
│  ├─ token/                 Token 增删改、导入、排序用例
│  └─ steam/                 登录、会话、注册、确认的页面无关编排
├─ domain/                   稳定模型和纯业务规则
├─ data/                     Repository 与 AppStorage 状态桥接
├─ infrastructure/
│  ├─ security/              Asset Store、加密
│  ├─ files/                 备份、图标包、日志
│  └─ steam/                 HTTP、protobuf、时间、EResult
└─ navigation/               Navigation 路由
```

迁移原则是“先抽取重复逻辑并补测试，再移动文件”，不要一边大规模改目录一边改变 Steam 协议行为。

## 10. 新增或修改功能的审查门槛

每个功能变更在实现前至少写清以下内容：

1. 用户问题：解决什么实际问题，是否属于第 1.1 节。
2. 页面入口：从哪里进入，是否增加自动触发行为。
3. 服务归属：复用哪个现有服务；如果新增类，它的唯一职责是什么。
4. 数据：新增/修改哪些字段，如何加密、备份、删除和去重。
5. 网络：访问哪个端点、何时触发、失败如何展示、日志如何脱敏。
6. 权限：是否新增 HarmonyOS 权限或系统能力。
7. 本地化与主题：中英文、浅色和深色是否完整。
8. 测试：自动化可覆盖什么，哪些步骤必须实机或真实 Steam 账户验证。

以下情况应在代码审查时直接阻止：

- 仅因为参考项目有该功能就加入，而没有当前需求。
- 页面直接创建网络请求、直接解析 protobuf 或直接写 Preferences。
- 新的 Steam Token 刷新结果没有持久化。
- 用户可见文本硬编码，或把诊断错误原文直接显示给用户。
- 把密码、密钥、令牌、确认 nonce 或完整请求响应写入日志。
- 修改生成的 protobuf 文件而没有同步 `.proto` 与生成脚本。
- 一个“顺便重构”的提交同时改变数据格式、网络协议和 UI 行为。

## 11. 验证策略

- 每次提交：ArkTSCheck、完整 Debug HAP 构建、资源键中英文一致性、`git diff --check`。
- 纯逻辑：优先为 Base32、OTP、URI、去重、备份合并和 Token 有效期补自动化测试。
- 文件与安全：验证错误密码、损坏密文、超限文件、ZIP 路径穿越和删除边界。
- 页面：可自动化验证本地添加、编辑、排序、删除、主题、图标和设置持久化。
- Steam：登录、迁移、扫码登录、QueryStatus、撤销和确认必须保留实机测试；交易确认在获得合适账户前标记为“实现完成、实机待验”。

## 12. 文档维护

- README 的功能清单必须是本文第 1 节的用户视角摘要。
- 路由变化同时更新 `router_map.json`、`AppRoute` 和本文第 3 节。
- 新增持久化字段同时更新 `Token.ets`、校验、备份、工具脚本和本文第 6 节。
- Steam 协议变化同时更新 `.proto`、生成物、适配层说明和对应实机测试项。
- 完成第 8.3 节某项重构后，在同一提交中更新其状态，避免文档与代码再次分离。
