# agent-loop 项目演化分析

## 项目背景与目的

`agent‑loop` 是一个面向 ChatGPT﻿/Claude 类模型的最小化代理循环示例。它使用 OpenAI﻿兼容的聊天接口，通过流式 SSE 方式逐字输出模型回复，同时暴露了一组工具函数供模型调用（例如读取/写入文件、网络请求、天气查询等）。项目的目标是探索如何构建一个可迭代演进的代理系统，从简单的一次性循环逐步扩展到支持多轮对话、记忆管理、子代理、技能加载、持久化任务、后台任务、Git 分支隔离以及团队协作等功能。

本文按照时间顺序梳理仓库的主要提交，分析每个功能是如何一步步实现和演进的，并结合代码片段揭示其技术细节。

## 初始实现：流式 Agent Loop（commit `7ca4122`）

第一版代理循环实现于 2026‑04‑26，核心文件是 `agent_loop.py`，它完成了以下功能：

- 设置 SSE 输出：定义 `_ensure_utf8_stdio`、`emit_sse` 方法，保证在标准输出中以事件流的格式发送数据 [oai_citation:0‡raw.githubusercontent.com](https://raw.githubusercontent.com/DouglasXiao/agent-loop/7ca412257b3189c08fbfb2e3d177ba36e5aa7521/agent_loop.py#:~:text=import%20argparse%20import%20json%20import,sys%20from%20typing%20import%20Any)。
- 定义工具列表 `TOOLS`，包括读取文件 (`read_file`)、写入文件 (`write_file`) 和获取天气 (`get_weather`) 等函数，描述其名称、参数 schema 及解释文字。
- 实现 `_stream_one_completion`：调用 OpenAI API 获得模型回复，并在流中解析 `content_delta` 和 `tool_calls`，实时通过 `emit_sse` 发送至前端。 [oai_citation:1‡raw.githubusercontent.com](https://raw.githubusercontent.com/DouglasXiao/agent-loop/7ca412257b3189c08fbfb2e3d177ba36e5aa7521/agent_loop.py#:~:text=import%20argparse%20import%20json%20import,sys%20from%20typing%20import%20Any)
- 实现 `core_agent_loop_streaming`：构造系统消息、用户消息和工具列表，通过 `_stream_one_completion` 与模型交互。当模型返回 `tool_calls` 时，将工具调用参数解析为 JSON，通过 `execute_tool` 调用对应的本地工具，并把工具结果再次作为 SSE `tool` 事件发送。
- 提供命令行入口：支持一次性响应用户输入，也支持交互式循环模式。

该版本的目标是构建一个最小可用的代理循环，为之后的扩展奠定基础。

## 系统提示与规则（commit `062a86b`）

第二个重要提交在同一天引入 `CLAUDE.md` 和系统提示生成函数 `build_system_prompt`，主要改进包括：

- 组合系统提示：`build_system_prompt` 按章节拼接“基本人格与安全规则”、“工具说明”、“项目背景”等部分，并从 `CLAUDE.md` 中读取介绍文插入系统提示。系统提示的结构化设计让模型始终携带重要的规则和项目上下文信息。
- 修改工具描述：为每个工具添加更详细的使用指引。例如 `read_file` 提示模型一次最多读取 100 行，若文件过大会截断结果；`write_file` 提醒会覆盖整个文件；这些描述在系统提示中被引用。
- 新增 `tools_for_api()`，向 API 返回所有已注册工具的 schema 列表，用于传递给聊天接口。

这样，系统提示与工具说明解耦，便于在后续扩展时统一修改。

## 多轮对话支持（commit `cccd103`）

随后提交将代理从单轮对话扩展为状态机式的多轮对话：

- 新增 `init_conversation_messages` 用来初始化 `messages` 列表，仅包含系统消息。
- `core_agent_loop_streaming` 接受 `messages` 列表并在每个用户输入后将其追加，这样模型可以看到完整的历史上下文，实现连续对话。
- 工具调用、系统提示及 SSE 事件的逻辑保持不变，但通过在循环中保留 `messages`，实现会话记忆。

## 上下文压缩与记忆系统（commit `ba095e0`）

随着对话轮数增加，历史消息会挤占有限的上下文窗口。此提交引入 `context_memory.py` 和三项关键功能：

1. **工具结果溢出到磁盘**：`budget_tool_result_for_messages` 判断工具返回的内容长度，如果超过阈值则将结果写入 `.claude/memory/spill/` 目录并返回一段预览文本，预览中包含完整路径供模型之后通过 `read_file` 读取 [oai_citation:2‡github.com](https://github.com/DouglasXiao/agent-loop/commit/ba095e0.patch)。这样长文本不会占用上下文窗口，但仍然可恢复。
2. **会话压缩**：`maybe_compress_conversation` 在估计总 token 超过 `AGENT_CONTEXT_COMPRESS_RATIO * AGENT_MAX_CONTEXT_TOKENS` 时，通过调用模型生成旧消息摘要，替换早期消息为一条“会话压缩—早期轮次摘要”的用户消息，并记录一个完整的会话快照路径 [oai_citation:3‡github.com](https://github.com/DouglasXiao/agent-loop/commit/adc4789.patch#:~:text=%2B%20%20%20%20,if%20not%20tail%3A%20return%20False)。该摘要将被插入到对话中，而所有旧消息被删除，从而显著减少上下文长度。
3. **记忆布局**：`ensure_memory_layout` 创建 `.claude/memory/`, `.claude/memory/past_tasks`, `.claude/memory/spill` 等目录并生成 `MEMORY.md`、`project_structure.md`、`user_preferences.md` 等种子文件，供模型记忆使用 [oai_citation:4‡raw.githubusercontent.com](https://raw.githubusercontent.com/DouglasXiao/agent-loop/ba095e07325dd8daa9daa488938ef100a6a91bf2/context_memory.py#:~:text=%22%22%22%20Context%20window%20budgeting%2C%20tool,)。这些文件可在不同会话间持久存在，但强调**记忆文件只是提示，模型应通过 `read_file` 验证真实代码**。

此外，该提交还更新系统提示，使其在每一轮对话前注入记忆节与环境变量节，并增加 `edit_file` 工具用于精确的字符串替换。

## 子代理与工具注册（commit `66a6cbe`）

代理通过 `run_sub_agent` 工具实现“代理中的代理”能力：

- `sub_agent.py` 提供 `run_sub_agent` 和 `run_sub_agents_parallel`：子代理拥有自己的 `OpenAI` 客户端、独立的系统提示和对话上下文，使用 `SUB_AGENT_*` 环境变量配置。调用时需要传入完整的任务描述，子代理返回 JSON 结果，包含 `ok`, `final_text`, `error` 等字段 [oai_citation:5‡github.com](https://github.com/DouglasXiao/agent-loop/commit/47c76f0.patch#:~:text=base_url%20%3D%20opts,SubAgent)。
- 在 `agent_loop.py` 中，工具调度逻辑由 `orchestrator_execute_tool` 接管：根据工具名称选择本地工具或子代理工具。当模型调用 `run_sub_agent` 时，主代理将任务发送给子代理并接收其结果。
- 新建 `tools_registry.py` 整理所有工具的 schema，并引入 `ToolPolicy` 定义风险类别（`read`、`mutate`、`network`、`system`、`delegate`）。环境变量 `AGENT_TOOL_MODE` 可限制某些风险类别的工具，`execute_tool` 在运行前检查权限。

此设计使代理能够在主对话外并行执行重任务，同时实现安全的工具调用管理。

## 完整工具集与权限（commit `e164fbf`）

该提交扩充了工具种类并完善安全机制：

- 新增工具：`glob_files` 列出符合模式的文件、`grep_files` 在多文件中搜索文本、`web_fetch` 下载网页内容、`run_terminal_cmd` 在 Shell 中执行命令等。`run_terminal_cmd` 只有在 `AGENT_ALLOW_BASH=1` 时才开放，以防止误操作。
- 更新 `read_file` 支持偏移和限制，可以读取文件片段或加上行号，避免一次读取过大内容。
- 引入 `ToolPolicy` 和 `filter_tools_by_policy`，按风险类别过滤可用工具。例如可通过 `AGENT_TOOL_MODE=read-only` 关闭所有写操作。

## 计划文档（commit `85a2e51`）

项目作者增加了 `PLAN.md`，列出了与社区教程 `learn-claude-code` 对应的阶段和改进计划，分为三阶段：第一阶段是加入 `todo_write` 工具并实现 nag 提醒；第二阶段是并行工具执行；第三阶段是三层压缩（微缩、摘要、手动压缩）。这个文档为后续迭代提供了路线图 [oai_citation:6‡github.com](https://github.com/DouglasXiao/agent-loop/commit/85a2e51.patch#:~:text=%2B%20%2B,%EF%BC%89%EF%BC%8C%E8%BF%94%E5%9B%9E%E5%BD%93%E5%89%8D%E6%B8%85%E5%8D%95%E7%9A%84%20markdown%20%E8%A7%86%E5%9B%BE%E3%80%82)。

## 持久化待办事项（commit `b200a19`）

为了让模型规划和跟踪多步骤任务，作者实现了持久化待办事项管理：

- `todo_manager.py` 定义 `TodoState` 类，存储任务条目及状态（`pending`, `in_progress`, `completed`），持久化于 `.claude/todos/current.json`。工具 `todo_write` 支持 `set`、`add`、`update`、`complete`、`clear` 操作，返回带状态统计的 Markdown 摘要 [oai_citation:7‡raw.githubusercontent.com](https://raw.githubusercontent.com/DouglasXiao/agent-loop/b200a1968df13867af861964094cb071de4b897a/todo_manager.py#:~:text=%22%22%22%20Persistent%20in,s03%20%2B%20s07%20persistence%20ideas)。
- 在系统提示中新增“当前 TODO 列表”部分，展示待办事项；并在模型多轮未调用 `todo_write` 时通过 `<reminder>` 提示模型使用该工具。
- 规则要求一次只能有一个 `in_progress` 条目；模型应先用 `set` 规划步骤，再按顺序完成。

## 并行工具执行（commit `80ee0a8`）

为了减少在同一回合中连续调用多个只读工具的延迟，作者实现了并行执行机制：

- `_run_one_tool_call` 函数负责解析单个工具调用、执行工具并发送 SSE；
- `_run_all_tool_calls` 按工具风险类别分组：如果相邻多个 `read` 或 `network` 类工具调用，则使用 `ThreadPoolExecutor` 并行处理，返回结果后按原顺序发送 [oai_citation:8‡github.com](https://github.com/DouglasXiao/agent-loop/commit/80ee0a8.patch#:~:text=%40%40%20,return%20assistant_msg%2C%20finish_reason)；
- 在主循环中，当模型返回多个工具调用时，系统先检查调用的风险类别并行执行，大幅减少等待时间。

## 三层压缩（commit `adc4789`）

为了长期对话稳定运行，作者在上下文压缩策略上进一步完善：

1. **微缩 (micro‑compact)**：每轮调用模型前，对旧的 `role=tool` 消息执行轻量压缩，只保留最近 `AGENT_KEEP_RECENT_TOOL_RESULTS` 条工具结果，旧结果替换为一行占位符，包含工具名、删减的字符数以及 spill 路径。这一过程不调用模型，开销很小 [oai_citation:9‡github.com](https://github.com/DouglasXiao/agent-loop/commit/adc4789.patch)。
2. **摘要压缩**：当估计 token 超过阈值时，调用模型生成早期轮次摘要，并在摘要块中附带完整 transcript 的路径 [oai_citation:10‡github.com](https://github.com/DouglasXiao/agent-loop/commit/adc4789.patch#:~:text=%2B%20summary_model%20%3D%20os.getenv%28,return%20False)。
3. **预留的手动压缩**：预留了 `compact` 工具的接口，未来模型可以主动请求压缩会话。

同时，`maybe_compress_conversation` 记录了压缩前后估计 token 数，并通过 SSE 发出 `context_compress` 事件，帮助监控 [oai_citation:11‡github.com](https://github.com/DouglasXiao/agent-loop/commit/adc4789.patch#:~:text=%2B%20%20%20%20,summary_block%7D%2C%20%2Atail%2C)。

## 结构化子代理协议（commit `47c76f0`）

为了让 orchestrator 更好地处理子代理的失败情况，该提交改造了 `SubAgentResult`：

- `SubAgentResult` 增加了 `label`、`error_category`、`rounds_used`、`duration_ms`、`tools_used`、`tool_errors` 等字段，支持更加丰富的元数据；
- `error_category` 具体区分配置错误、API 错误、超时、达到最大回合、模型 `finish_reason` 异常、权限拒绝等不同类型 [oai_citation:12‡github.com](https://github.com/DouglasXiao/agent-loop/commit/47c76f0.patch#:~:text=%40%40%20,)；
- 在 `run_sub_agent` 中，根据不同异常分类填充 `error_category`，并在循环中记录使用过的工具及工具错误次数。若超出 `max_tool_rounds` 或超过总时长，则返回相应的错误类别和信息；
- 工具 `run_sub_agents_parallel` 添加 per-item 覆盖参数，如 `model`、`timeout`、`max_tool_rounds`，返回结果同时返回整体 `ok` 和 `count` 字段 [oai_citation:13‡github.com](https://github.com/DouglasXiao/agent-loop/commit/47c76f0.patch#:~:text=%2B%20%20%20%20,to_dict)；
- 工具定义描述更新，详细列出子代理返回的所有字段及错误类别 [oai_citation:14‡github.com](https://github.com/DouglasXiao/agent-loop/commit/47c76f0.patch)。

这些改进使 orchestrator 能根据错误类型决定重试或放弃策略，提高系统稳定性。

## 动态技能加载（commit `f1e6f4b`）

为了向模型传授复杂流程而不占用系统提示太多空间，作者实现了按需加载技能：

- 在 `.claude/skills/<name>/SKILL.md` 存放技能说明文件，支持可选的 YAML 前置块，包含技能名称和描述；正文则是完整流程说明。
- `skill_loader.py` 提供函数 `discover_skills` 用于扫描所有技能并返回名称与描述列表，`render_skill_index` 渲染一行一个的索引，`render_skill_body` 包装技能正文为 `<skill name="...">…</skill>` 的格式 [oai_citation:15‡github.com](https://github.com/DouglasXiao/agent-loop/commit/f1e6f4b.patch)。
- 新增 `list_skills` 和 `load_skill` 工具：`list_skills` 返回已安装技能的名称和短描述；`load_skill` 根据技能名返回完整正文。工具描述提醒模型先查看索引再按需加载，避免一次性将大量文本注入上下文 [oai_citation:16‡github.com](https://github.com/DouglasXiao/agent-loop/commit/f1e6f4b.patch)。
- 系统提示中新增“已安装的 skill”部分，展示技能索引，鼓励模型在需要时调用 `load_skill` [oai_citation:17‡github.com](https://github.com/DouglasXiao/agent-loop/commit/f1e6f4b.patch)。
- 仓库内提供两个示例技能：`git-commit`（约定式提交规范）和 `code-review`（自我检查清单）。

这套机制实现了知识的“懒加载”，避免冗长流程占据上下文窗口，同时为代理带来可扩展的技能库。

## 持久化任务图和后台任务（commit `07ac32a`）

为支持长时间迭代和并行执行，项目新增两大模块：

1. **任务图 (`task_graph.py`)**：
   - 每个任务存储为 `.claude/tasks/task_<id>.json` 文件，包含 ID、标题、描述、状态（`pending`、`in_progress`、`completed`、`cancelled`）、依赖列表 `blockedBy`、负责人 `owner` 等字段 [oai_citation:18‡github.com](https://github.com/DouglasXiao/agent-loop/commit/07ac32a.patch)。
   - 工具 `task` 支持 `create`、`update`、`complete`、`get`、`list` 五种操作。例如 `task_create` 自动分配自增 ID 并保存到磁盘；`task_update` 可变更状态或增删依赖；`task_complete` 会同时从所有其他任务的 `blockedBy` 删除该任务 ID，以解除依赖 [oai_citation:19‡github.com](https://github.com/DouglasXiao/agent-loop/commit/07ac32a.patch)。
   - `render_task_prompt_section` 会在系统提示中插入任务概要，显示不同状态的数量以及每个任务的依赖关系 [oai_citation:20‡github.com](https://github.com/DouglasXiao/agent-loop/commit/07ac32a.patch)。
   - 与 `todo_write` 相比，任务图适用于需要跨会话保存的长期目标，以及带显式依赖的工作流。

2. **后台任务 (`bg_tasks.py`)**：
   - 提供 `bg_run` 工具在新线程中执行长时间 shell 命令，立即返回任务 ID 和状态；`bg_check` 可查询单个任务状态或列出所有任务；结果包括命令、状态、退出码、执行时长和输出预览 [oai_citation:21‡github.com](https://github.com/DouglasXiao/agent-loop/commit/07ac32a.patch)。
   - 主循环在每轮模型调用前调用 `drain_notifications`，将已完成的后台任务转换为 `<background-results>` 用户消息插入会话 [oai_citation:22‡github.com](https://github.com/DouglasXiao/agent-loop/commit/07ac32a.patch#:~:text=%2B%20%20%20%20,len%28notifs%29%7D%29)。这样模型无需主动轮询即可获取结果。
   - 任务输出长度和通知预览长度可通过环境变量限制；`AGENT_ALLOW_BASH=1` 必须开启才能使用。

这两个模块让代理具备管理长周期任务和异步 shell 命令的能力，为更复杂的工作流奠定基础。

## Git worktree 隔离与团队邮箱（commit `b3634aa`）

在前一阶段的基础上，作者继续添加用于代码协作的工具：

1. **Git worktree** (`worktree.py`):
   - 每个工作树存放在 `.worktrees/<name>` 目录，使用 Git 分支 `wt/<name>`；元数据记录在 `.worktrees/index.json`，生命周期事件记录在 `.worktrees/events.jsonl` [oai_citation:23‡github.com](https://github.com/DouglasXiao/agent-loop/commit/b3634aa.patch#:~:text=worktree.py%20,never%20diverges%20from%20disk%20reality)。
   - 工具 `worktree` 支持 `create`/`remove`/`keep`/`list`/`run`/`events` 等动作，可绑定到指定任务 ID。在 `create` 时若绑定任务，任务状态会变为 `in_progress` 且 `owner` 设为 `worktree:<name>`；在 `remove` 时若设置 `complete_task=true`，同时将任务标记为 `completed` [oai_citation:24‡github.com](https://github.com/DouglasXiao/agent-loop/commit/b3634aa.patch#:~:text=,fallback%20on)。
   - `run` 子命令允许在工作树目录中执行 shell 命令；`events` 返回生命周期事件列表。所有操作属于 `system` 风险类别，需要 `AGENT_ALLOW_BASH=1`。

2. **团队邮箱** (`team_mailbox.py`):
   - 存放于 `.team/` 目录，包含 `roster.json` 和每个用户的收件箱（append‑only JSONL 文件）。
   - 工具 `team` 支持 `register`（创建邮箱）、`send`（发送给单个用户）、`broadcast`（广播给所有用户）、`read`（读取并清空个人收件箱）、`peek`（查看但不清空）、`list`（列出团队成员）等操作 [oai_citation:25‡github.com](https://github.com/DouglasXiao/agent-loop/commit/b3634aa.patch#:~:text=team_mailbox.py%20,already%20carries%20%27type%27%20and%20%27from)。
   - 该实现故意省略 S10/S11 协议中的自动认领等复杂逻辑，只提供基本的跨会话消息传递功能。

系统提示相应更新，说明 worktree 用于隔离并行工作，team 用于跨会话协作 [oai_citation:26‡github.com](https://github.com/DouglasXiao/agent-loop/commit/b3634aa.patch#:~:text=%2B,want%20to%20look%20without%20consuming)。

## 更健壮的压缩与紧急回收（commit `981160e`）

在真实使用中，作者发现 GPT‑5 类模型对 `max_tokens` 参数的支持不一致，导致摘要请求失败，甚至出现上下文长度超限的错误。为此，新增一系列改进：

- `_summarize_with_fallback`：尝试使用 `max_completion_tokens`；若 API 提示不支持该参数，则退回 `max_tokens`，并缓存当前客户端偏好 [oai_citation:27‡github.com](https://github.com/DouglasXiao/agent-loop/commit/981160e.patch#:~:text=and%20caches%20the%20winner%20per,then%20retries%20the%20call%20once)。
- `emergency_compact_inplace`：当上下文接近极限或摘要失败时，无需模型参与而直接删除最早的非系统消息，只保留必要的尾部，并用一条占位符 `"[emergency‑compacted: N elided]"` 代替 [oai_citation:28‡github.com](https://github.com/DouglasXiao/agent-loop/commit/981160e.patch#:~:text=and%20caches%20the%20winner%20per,then%20retries%20the%20call%20once)。该方法保证聊天协议仍然合法，能及时降低上下文长度。
- 主循环在调用模型前若估计 token 数超过 `AGENT_EMERGENCY_COMPACT_RATIO`，会执行紧急压缩；`_stream_one_completion` 在检测到 `context_length_exceeded` 错误时也会触发紧急压缩并重试一次 [oai_citation:29‡github.com](https://github.com/DouglasXiao/agent-loop/commit/981160e.patch)。
- 当出现其他 HTTP4xx/5xx 错误时不再抛出异常而是通过 `upstream_error` SSE 通知前端，循环返回 `None`，避免整个代理崩溃 [oai_citation:30‡github.com](https://github.com/DouglasXiao/agent-loop/commit/981160e.patch)。

同时调整默认值：`AGENT_MAX_CONTEXT_TOKENS` 上调到 200k，`AGENT_CONTEXT_COMPRESS_RATIO` 降低到 0.7，并新增 `AGENT_EMERGENCY_COMPACT_RATIO`（默认 0.95） [oai_citation:31‡github.com](https://github.com/DouglasXiao/agent-loop/commit/981160e.patch#:~:text=and%20caches%20the%20winner%20per,then%20retries%20the%20call%20once)。系统提示也解释了三层压缩方案（微缩、摘要、紧急）。

## 支持 OpenRouter 提供商和默认模型优化（commits `fb0abfe`, `a1ccfbc`, `12afd9e`）

这些提交修改了聊天客户端的初始化逻辑，使主代理可以根据环境变量自动选择调用 OpenAI 还是 OpenRouter：

- `_build_main_client` 判断 `OPENROUTER_API_KEY` 是否设置，如果设置则使用 OpenRouter 作为提供商，默认基地址 `https://openrouter.ai/api/v1`，模型默认从 `OPENROUTER_MODEL` 读取；若未设置则退回使用 `OPENAI_API_KEY` 及 `OPENAI_BASE_URL` [oai_citation:32‡github.com](https://github.com/DouglasXiao/agent-loop/commit/fb0abfe.patch#:~:text=Selection%20,OPENAI_API_KEY%20%2B%20OPENAI_BASE_URL%20%2B%20OPENAI_MODEL)。
- 新增可选 header `HTTP-Referer` 和 `X-Title`，供 OpenRouter 用于应用排名；不影响功能 [oai_citation:33‡github.com](https://github.com/DouglasXiao/agent-loop/commit/fb0abfe.patch#:~:text=model%20%20%3D%20OPENROUTER_MODEL%20or,compatible)。
- 修改系统提示 SSE 事件，包含当前提供商和模型名称，使运行日志透明。
- `a1ccfbc` 提交将默认的 `OPENROUTER_MODEL` 从 `openai/gpt-5.2` 调整为 `openrouter/auto`，该模型由 OpenRouter 按请求自动选用成本合适的底层模型，通常更便宜 [oai_citation:34‡github.com](https://github.com/DouglasXiao/agent-loop/commit/a1ccfbc.patch#:~:text=%2B%20%20,Title)。
- `12afd9e` 为 OpenRouter 流式响应启用 `include_usage` 参数，捕获实际路由到的模型和 token 使用量，并在 SSE 中通过 `model_routed` 事件发送给前端 [oai_citation:35‡github.com](https://github.com/DouglasXiao/agent-loop/commit/12afd9e.patch#:~:text=,stream%3DTrue%2C%20%2A%2Aextra)。这样，用户可以监控每次调用使用了哪个具体模型以及消耗的 token 数。

## 总结

通过对 `agent‑loop` 仓库从 2026‑04‑26 到 2026‑05‑03 的提交历史分析，可以看到一个简洁的代理循环逐步演化为具备持久化记忆、子代理、权限管理、多级压缩、动态技能加载、任务图、后台任务、工作树隔离、团队协作和多提供商支持的综合系统。每个功能都围绕提高代理的可扩展性、可控性和稳定性而设计，并通过系统提示向模型提供明确的使用指南。

这一系统的技术亮点包括：

- **流式 SSE 与工具调用集成**：在保证响应实时性的同时，使用统一的接口处理模型的工具调用并返回结果。
- **三层上下文压缩**：结合轻量微缩、摘要压缩和紧急删除，确保长对话不会因上下文爆炸而失效。
- **子代理与并行执行**：通过子代理隔离复杂任务，并对只读工具调用进行并行化，提高效率。
- **技能与任务体系**：引入可扩展的技能库、持久化任务图和工作树隔离，为构建复杂的项目管理代理奠定基础。
- **鲁棒的错误处理和多提供商支持**：对 API 错误进行分类处理并提供紧急补救措施，支持 OpenRouter 提供更灵活的模型路由和成本控制。

总体而言，`agent‑loop` 展示了一种以最小核心为出发点，按模块逐步扩展功能的思路，每个阶段的设计都保证与现有功能兼容，并保持清晰的系统提示和工具指南。这种渐进式演化方法为开发复杂的聊天代理提供了优秀范例。