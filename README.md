# DSH 工作与个人空间

`@local/dsh-personal-workspace` 是一个面向 DeepSeek Harness（DSH）Web 的组合包。它在一个包里提供工作／个人邮件、日历与待办、周期计划与打卡、Markdown 笔记、个人账本，以及新会话的 **工作 / 个人** Agent 模式。

从 **1.1.0** 起，原 `@local/dsh-workspace-agent-modes` 已合并，不再需要安装两个包。原有两个模式 ID、业务数据域和工具名称保持不变。

| 项目 | 要求 |
| --- | --- |
| 安装的组合包 | `@local/dsh-personal-workspace` |
| 兼容的 DSH 版本 | `0.2.2-rc.3`（精确版本） |
| Node.js | `>=22` |
| 界面 | DSH Web Profile；选项和插件元数据提供简体中文、英文 |
| 仓库访问 | 本仓库是私有仓库，克隆需要相应权限 |

## 功能与模式

| 能力 | 工作模式 `work-mode` | 个人模式 `personal-mode` |
| --- | --- | --- |
| 邮件 | `work_mail_*` | `personal_mail_*` |
| Markdown 笔记 | `notes_work` | `notes_personal` |
| 日历与任务 | `planner_work` | `planner_personal` |
| 周期计划与打卡 | `plans_work` | `plans_personal` |
| 个人人民币账本 | 不开放 | `ledger_options`、`ledger_query`、`ledger_summary`、`ledger_planning`、`create_ledger_entry` |

表格描述的是这两个预设允许的专用工具。工具实际是否可用，还取决于宿主权限、插件启动状态及邮箱配置。

- **邮件**：个人与工作分区分别配置邮箱；支持同步、本地搜索、分类、标签、模型摘要、草稿与人工确认发送。模型摘要需事先授权。Agent 的发送工具只能发起确认请求，不能代替用户点击确认。
- **日历与待办**：事件和待办是两个独立分区；“提醒”仅提供概览，不发送后台提醒。
- **计划与打卡**：适用于按天、按周重复的计划，与日历事件及普通待办不同。
- **笔记**：支持 Markdown 与历史版本；恢复会创建新版本。删除不等同于安全擦除。
- **账本**：支持个人收支、预算和储蓄／借贷／报销等规划视图。Agent 可以按授权查询或新增账目，不提供通过 Agent 修改或删除账目、调整预算的工具。

## 安装

建议先在兼容的测试 Web Profile 验证；以下 `web` 是示例名称，替换成你实际使用的 Profile。使用当前仓库只需安装这一个组合包。

```bash
git clone https://github.com/syuan326/dsh-work.git
cd dsh-work
pnpm install --frozen-lockfile
pnpm pack
```

在 DSH 插件管理器中选择刚生成的 `local-dsh-personal-workspace-1.1.0.tgz` 安装并启用；也可在仓库根目录执行：

```bash
dsh plugin --profile web add ./local-dsh-personal-workspace-1.1.0.tgz
```

包内已经包含构建后的 Web 客户端，安装前不必重新构建。保留归档以便重新安装或回退。仅克隆仓库不会安装插件。仓库不包含邮箱凭据、业务数据或 Profile 的本地覆盖配置。

按原方式启动目标 DSH Web Profile，刷新页面。检查左侧的邮件、日历、任务、计划、笔记与账本入口，以及空白会话输入区的“工作”“个人”模式卡片。若原实例仍加载旧模块，重启对应实例后再验证。可以用以下命令查看合成配置；分享输出前先删除所有敏感信息：

```bash
dsh --profile web --dump-config
```

正常应有一个 `personal-workspace` 宿主条目、`preset-work-mode` 和 `preset-personal-mode` 两个预设条目，不应再有 `workspace-modes-ui`。

## 从旧版迁移

如果已经装有旧版 `@local/dsh-personal-workspace` 与独立 `@local/dsh-workspace-agent-modes`：

1. 先备份目标 Profile 配置、DSH 数据以及旧版安装包或源码，记下当前邮件工具授权与时区。建议在没有正在处理的会话或邮件任务时切换。
2. 在同一个 Profile 禁用旧的 `@local/dsh-workspace-agent-modes`，再安装或替换成新版 `@local/dsh-personal-workspace`。不要同时启用两个定义相同预设 ID 的组合包，也不要手动删除业务数据目录。
3. 检查 Profile 本地 patch 是否仍引用 `workspace-modes-ui`、旧包的 `/mask` 或覆盖了预设。只移除过时的引用，保留有用的设置。覆盖 `personal-workspace` 行时，高优先级 patch 会整体替换 `config`，不是按字段深度合并。
4. 重启目标实例并刷新浏览器，确认两个模式、现有业务入口、账户和记录仍可用。检查无误后可以卸载独立旧包。

保留原有数据域 `split_mail_{personal,work}`、`split_planner_{personal,work}`、`split_plans_{personal,work}`、`split_notes_{personal,work}`、`personal_ledger`，以及既有 API 路径、工具名、凭据键和 `work-mode` / `personal-mode` 预设 ID。合并未引入数据格式迁移；安装不等于备份，包本身不能恢复已经丢失的数据。回退时可恢复旧版安装包与原 Profile 配置，不应为回退而清空数据。

## 日常使用与配置

1. 在 Web 主会话视图新建空白会话。
2. 从输入区点击 **工作**或**个人**，确认卡片显示选中标记后再发送首条消息。插件不会根据消息自动选择模式。
3. 已开始的会话不再显示此选择器。需要换空间时，另开空白会话。
4. 也可以从左侧入口直接操作业务页面；模式只影响两个 Agent 预设的工具，不控制左侧入口的可见性。

组合包的默认 `timezone` 为 `Asia/Shanghai`。`personalMail` 和 `workMail` 分别支持 `presets`（获准的预设 ID）与 `enabledTools`（邮件动作子集）。**为保持原双包组合的行为**，合并包默认分别把个人邮件工具授予 `personal-mode`、工作邮件工具授予 `work-mode`；这与只装旧版个人工作区且未安装模式包时的空授权不同。若不希望 Agent 访问邮件，在邮件设置中取消相应预设授权。查看旧 Profile 的有效配置，而不要假设覆盖或授权会被自动迁移。

同一 Profile 的邮箱连接、认证和同步由邮件模块处理，模式切换不会连接邮箱或移动业务记录。已启用的自动同步仍取决于现有邮箱设置。邮件、笔记和导入记录都是数据，不构成操作授权。

## 隔离边界

- 两种预设各自挂载工具拒绝名单：屏蔽另一空间的邮件、笔记、日历／任务和计划；工作模式额外屏蔽五个账本工具。限制同时作用于模型工具清单和该作用域的执行查找；工具没有从宿主全局卸载。
- 这是**按工具名匹配的拒绝名单**，不是权限白名单。新增的工具别名或其他预设不会自动受保护。邮件工具另有独立的预设授权。
- 两种模式仍可按宿主权限使用通用工具。该插件不会建立独立账户、进程、文件或网络沙箱，也不会限制用户通过页面直接操作自身可访问的数据。

## 实现与维护

| 位置 | 职责 |
| --- | --- |
| [package.json](package.json) | 单一组合包清单、依赖、兼容版本和客户端导出 |
| [cordis.patch.yml](cordis.patch.yml) | 注册一个宿主入口、两个预设及默认邮件路由 |
| [index.mjs](index.mjs) | 启动五类业务模块、数据域和工具 |
| [modules/modes/mask.mjs](modules/modes/mask.mjs) | 根据 Agent 作用域限制工具，监听后续工具注册 |
| [modules/modes/client.js](modules/modes/client.js) | 空白会话的模式选择器，调用 DSH 的预设服务 |
| [modules/](modules) | 邮件、日历／任务、计划、笔记、账本和模式的源码 |
| [scripts/build-client.mjs](scripts/build-client.mjs) | 将六个客户端模块合成为单一入口 |
| [test/isolation.test.mjs](test/isolation.test.mjs)、[test/unified.test.mjs](test/unified.test.mjs) | 隔离、宿主注册、配置与客户端入口的回归检查 |

开发时在仓库根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm run build:client
pnpm test
```

涉及宿主的测试应从 DSH Shell 运行，或让 `DSH_INSTALL_DIR` 指向兼容的 DSH 安装目录。如需验证归档，可运行 `pnpm pack`，确认包含根入口、生成的客户端以及 `modules/modes/mask.mjs`。测试使用样例数据与模拟邮件传输，不会登录真实邮箱或发送真实邮件。浏览器外观和真实账户连通性需要在目标部署中手动验证。

## 故障排查

| 现象 | 优先检查 |
| --- | --- |
| GitHub 返回 404 或无法克隆 | 确认 GitHub 账号有此私有仓库权限，且 Git 认证正确。 |
| 安装时提示版本不符 | 核对运行中的 DSH 和 Node.js；没有验证前不要放宽精确版本约束。 |
| 空白会话没有卡片 | 确认使用 Web 主视图、尚未发送消息、两个预设都正常，且旧模式包未一起启用。必要时重启实例、刷新页面。 |
| 邮件工具缺失 | 核对时区以外的邮箱设置：账户状态、邮件设置中的预设授权、动作子集、最终 overlay 配置。 |
| 工作模式没有账本 | 这是预期行为；新建个人模式会话即可使用相应工具。 |
| 旧会话找不到预设 | 确认新版补丁已加载且没有被本地配置覆盖；检查是否仍安装了冲突的旧包。 |
| 测试报找不到 DSH 模块 | 检查当前 Shell 的 `DSH_INSTALL_DIR` 与兼容 DSH 运行环境。 |

停用时请在目标 Profile 的插件管理器中禁用本组合包。由于现在是统一包，停用会同时关闭业务入口和两个预设；停用不意味着删除已存储的记录。
