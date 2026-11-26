# 验证记录

验证日期：2026-11-19（Asia/Shanghai）。运行安装版本：DSH 0.2.2-rc.3；插件包 @local/personal-ledger 2.0.0。

## 自动检查

- `npm test`：25/25 通过，无跳过。
- `npm run check`：Host、Client、业务、工具及 HTTP 接口脚本语法通过。
- `import('./index.js')`：真实 Host 入口可导入，zod 依赖可解析。
- 清单导出及运行文件、locale、图标、说明资源存在。
- 使用当前安装版 DSH JsonStorageBackend + DomainFacility 的隔离磁盘测试：工具新增记录、关闭域／backend、重开后记录与幂等回执仍在；损坏文件明确拒绝加载且不覆盖。
- 整数分、普通十进制金额、非法日期、版本冲突、幂等重放／冲突、持久化失败、关联结算原子回滚、分期尾差、导入重复／冲突及汇总溢出均有回归测试。
- HTTP 认证、独立 API Peer、缺失防跨站头及非法操作拒绝有测试。

## 当前运行实例

通过只读工具实际调用：ledger_options、ledger_query、ledger_summary、ledger_planning 均成功。运行时工具目录包含 create_ledger_entry 等五个预定工具。为避免未经记账授权写入真实数据，新增工具只在隔离测试中执行。

Client Slots 检查显示 sidebar.panellist 的 personal-ledger 入口以及 main 的 personal-ledger 面板都为 active。

注意：Config Inspect 的 status=absent 表示没有导出的 Config schema，不代表插件 fiber 未激活。运行状态应以实际工具调用、Client 注册和插件 fiber 状态判断。

## 体验复核与限制

静态复核已修正贷款方向文案、关联结算账目的编辑／删除引导、分类冲突后的放弃重载入口、历史账目保存后的月份定位、预算 80%／100% 页面提示以及下载 URL 生命周期。

没有浏览器控制，未完成实际点击流程、浏览器 console、图标渲染或深浅主题的视觉验收；槽位 active 不等同于视觉验收。

插件管理器安装返回 restart-required（unmanaged-plugin）。当前实例已有可调用工具和入口；为了保证安装后所有最终 Host 修改都采用新 JavaScript generation，仍建议重启 DSH 后刷新原页面。不应另起替代 Web 服务。

## 范围边界

- 原 NoneBot 数据不自动读取或同步；通过 v2 JSON 迁移。
- 不支持直接导入旧 paddys-ledger v1；须先在原秘书转换为 v2。
- 保留提醒字段和预算状态，但不投递后台提醒。
- 不修改真实用户账目作为测试。
