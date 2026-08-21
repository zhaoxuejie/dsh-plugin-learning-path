/* ============================================================
   阶段四 · 进阶探索 —— 课程内容（4 课）
   深入 DSH 生态：工具、子代理、MCP、Skills、源码贡献
   ============================================================ */
window.COURSE_S4 = [
  {
    id: "s4-1",
    no: "4.1",
    title: "工具系统（Tool）",
    minutes: "约 30 分钟",
    stage: "阶段四 · 进阶探索",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>知道工具是什么、DSH 有哪些常用工具、模型调用工具的完整链路。</p>
        </div>
      </div>

      <h3>工具 = 给模型用的「手」</h3>
      <p>模型本身只会「想和说」。它想动手做事时，会向 Harness 发起一个<b>工具调用请求</b>，Harness 执行后把结果喂回模型，模型再继续想。这个机制在业界叫 function calling（函数调用）。</p>
      <p>DSH 内置的工具，每一个都是一个 <code>dsh-tool-*</code> 插件——这正好呼应阶段一：<b>工具本身就是插件</b>。</p>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：给大脑接上手</div>
        <p>模型只有嘴（只会说），工具是给它接上的手（能做事）。每多一只手，AI 就能多干一类活：bash 是「动手敲命令」的手，fs 是「翻文件」的手，web_search 是「查资料」的手。</p>
      </div>

      <h3>DSH 常用工具一览</h3>
      <table>
        <thead><tr><th>工具</th><th>能干什么</th><th>典型场景</th></tr></thead>
        <tbody>
          <tr><td>bash / pwsh</td><td>执行终端命令（Linux/Mac 用 bash，Windows 用 pwsh）</td><td>跑 node、git、构建脚本</td></tr>
          <tr><td>fs（文件系统）</td><td>读、写、改文件；目录浏览</td><td>修改配置、生成代码文件</td></tr>
          <tr><td>fs-search / glob / grep</td><td>按名字/内容搜索文件</td><td>在项目里找代码</td></tr>
          <tr><td>web_search</td><td>网页搜索</td><td>查最新资料（rc.8 起支持并发查询）</td></tr>
          <tr><td>subagent / workflow</td><td>派出子代理并行干活</td><td>大工程分工</td></tr>
          <tr><td>jobs</td><td>后台任务管理</td><td>长任务挂后台跑</td></tr>
          <tr><td>todo / goal / plan</td><td>任务清单、目标循环、先计划后执行</td><td>管理多步骤工作</td></tr>
        </tbody>
      </table>

      <h3>模型调用工具的完整链路</h3>
      <ol class="steps">
        <li>模型想：「我需要知道当前目录有什么」→ 生成一个工具调用：<code>bash: ls</code>；</li>
        <li>Harness 检查权限（沙箱、审批策略）——不允许的动作会被拦下；</li>
        <li>执行工具，拿到真实结果（比如文件列表）；</li>
        <li>结果喂回模型，模型继续推理下一步；</li>
        <li>循环，直到任务完成。</li>
      </ol>

      <h3>权限与沙箱：为什么 AI 不会乱来</h3>
      <p>DSH 的工具不是裸奔的：命令在<b>沙箱</b>里执行（隔离、限权），敏感操作会触发<b>审批</b>（弹窗让你同意）。你在用 AI 时看到的「是否允许执行…」确认框，就是这层门卫。开发插件时也要想清楚：你的插件会暴露什么能力、要不要设权限边界。</p>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 和阶段三的联系</div>
        <p>你写的 error-logger 其实就是一个「雏形工具」——如果给它声明好参数 schema 并注册进 DSH 的工具面板，模型在调试时就能直接查错误记录。想更进一步，可以研究 <code>dsh-tool-*</code> 官方插件的注册方式。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
        <p>在 web 里让 AI「用终端工具列出当前目录的内容」。观察界面里工具调用的展示：模型请求了什么、沙箱执行结果是什么。然后再让它做一件<b>危险的事</b>（比如尝试删除系统文件），观察审批/拦截是怎么工作的。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>工具 = 模型的手，由 <code>dsh-tool-*</code> 插件提供。链路：模型发起调用 → 权限检查 → 执行 → 结果回喂 → 继续推理。沙箱和审批是安全门卫。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "「工具」在 DSH 里的本质是？",
        options: ["一套快捷键", "给模型用的「手」（执行能力），本身是插件", "聊天表情包", "浏览器扩展"],
        answer: 1,
        explain: "工具 = dsh-tool-* 插件，让模型能执行命令、读写文件、搜索网页。",
      },
      {
        q: "模型发起工具调用后，Harness 第一步做什么？",
        options: ["直接执行", "检查权限（沙箱/审批）", "询问用户密码", "忽略调用"],
        answer: 1,
        explain: "权限门卫先过一遍：不允许的动作会被拦下，这就是安全机制。",
      },
      {
        q: "以下哪个不是 DSH 的常用工具？",
        options: ["bash（执行命令）", "web_search（网页搜索）", "fs（读写文件）", "photoshop（修图）"],
        answer: 3,
        explain: "bash/fs/web_search/jobs/subagent 等都是；photoshop 是软件，不是 DSH 工具。",
      },
    ],
  },

  {
    id: "s4-2",
    no: "4.2",
    title: "子代理 / Goal / Plan",
    minutes: "约 35 分钟",
    stage: "阶段四 · 进阶探索",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>知道子代理、/goal、/plan 各自解决什么问题，什么时候用哪个。</p>
        </div>
      </div>

      <h3>为什么需要这三种机制？</h3>
      <p>一个模型一口气干大活，容易「顾头不顾尾」：上下文越聊越长、步骤一多就乱。DSH 的解法是<b>分工</b>和<b>目标管理</b>——正是它区别于普通聊天工具的核心能力。</p>

      <h3>① 子代理（subagent）：派分身并行干活</h3>
      <p>主代理可以派出<b>多个子代理</b>同时工作：一个查资料、一个写代码、一个写测试，最后汇总。每个子代理有自己的独立上下文（互不干扰、不污染主线），完成后只交回结果。</p>
      <p>DSH 支持三种来源：内置子代理（同模型分身）、Claude Code、Codex（rc.8 起可作为 Profile Bundle 按需安装）。命令层面可用 <code>subagent</code> 工具派活，也可以用 <code>workflow</code> 编排大规模并行任务。</p>
      <pre><code># 在对话里直接提出分工需求，AI 会自动派出子代理
「把这三件事分开同时做：① 查 npm 上 dsh 的最新版本；② 检查我的项目
 有没有过期依赖；③ 写一个 README 草稿。最后汇总成一份报告。」</code></pre>

      <h3>② /goal：把任务变成「有目标的循环」</h3>
      <p><code>/goal</code> 命令启动一个<b>目标驱动的自动循环</b>：AI 反复「干活 → 检查目标 → 决定下一步」直到完成或卡住。适合「知道要什么结果、但步骤不确定」的中长期任务。</p>
      <pre><code>/goal 把 D:\\projects 下所有图片按月份整理进子文件夹</code></pre>
      <p>特点：AI 会自己规划步骤、自动续轮推进；卡住（比如连续失败）会停下来向你报告。这是「交代结果，不问过程」的用法。</p>

      <h3>③ /plan（计划模式）：先出计划，批准再干</h3>
      <p><code>/plan</code> 进入计划模式：AI 先做调研、产出<b>完整计划给你审阅</b>，你批准后才动手执行。适合「改动大、影响面广、不想让 AI 擅自行动」的场景。</p>
      <pre><code>/plan 帮我把这个项目的构建流程从旧脚本迁移到 pnpm workspace</code></pre>

      <h3>怎么选？</h3>
      <table>
        <thead><tr><th>任务特点</th><th>用什么</th><th>例子</th></tr></thead>
        <tbody>
          <tr><td>简单、一两轮</td><td>直接聊</td><td>「解释这个命令」</td></tr>
          <tr><td>中等、要控制节奏</td><td>/plan</td><td>重构项目结构</td></tr>
          <tr><td>结果明确、过程随意</td><td>/goal</td><td>整理文件、批量处理</td></tr>
          <tr><td>可拆解、可并行的大工程</td><td>子代理 / workflow</td><td>多仓库改造、全面审计</td></tr>
        </tbody>
      </table>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：总台派单</div>
        <p>子代理 = 总台把大订单拆给几个厨师并行做；/goal = 给一个厨师「把这桌菜做完，不用每步问我」；/plan = 先递菜单给你过目，你点头才开火。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（20 分钟）</div>
        <p>挑一个真实小任务，先用 /plan 走一遍（看它出的计划质量），再用 /goal 交给它自动完成（比如：把学习笔记目录里的 .md 文件按周归档）。对比两种模式的体验差异，记录你的感受。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>子代理（并行分工）、/goal（目标自动循环）、/plan（先计划后执行）是 DSH 的三大协作机制。简单直接聊、中等 /plan、结果导向 /goal、可并行 子代理。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "「结果明确、过程随意」的任务，最适合用哪种模式？",
        options: ["/plan", "/goal", "直接聊", "子代理"],
        answer: 1,
        explain: "/goal 目标循环：AI 自己规划步骤、自动推进，卡住才来报告。",
      },
      {
        q: "大改动想先让 AI 出计划、你批准后再动手，用什么？",
        options: ["/plan", "/goal", "bash 工具", "workflow"],
        answer: 0,
        explain: "/plan 计划模式：先调研出计划 → 你批准 → 才执行。",
      },
      {
        q: "几件互不依赖的事要同时做，用哪种机制最合适？",
        options: ["把它们塞进一句话让 AI 依次做", "派出多个子代理并行", "只能一件件手动来", "用 YAML 配置"],
        answer: 1,
        explain: "子代理各有独立上下文，可并行干活、最后汇总——DSH 的招牌分工能力。",
      },
    ],
  },

  {
    id: "s4-3",
    no: "4.3",
    title: "MCP 与 Skills",
    minutes: "约 35 分钟",
    stage: "阶段四 · 进阶探索",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>知道 MCP 是什么、怎么接入；知道 Skill 是什么、怎么用。能说出两者区别。</p>
        </div>
      </div>

      <h3>MCP：外设的「统一插座」</h3>
      <p><b>MCP（Model Context Protocol，模型上下文协议）</b>是一个开放协议：把数据库、浏览器、GitHub、文件服务等外部能力做成 <b>MCP 服务器</b>，任何支持 MCP 的 AI 应用都能「插上就用」，不用为每个应用单独写连接器。</p>
      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：USB-C 插座</div>
        <p>以前每种设备要配一根专用线；现在全世界统一用 USB-C——<b>MCP 就是 AI 外设界的 USB-C</b>。厂商按标准做插头，客户插上就能用。</p>
      </div>

      <h3>DSH 里怎么用 MCP</h3>
      <p>DSH 内置 MCP 客户端能力（<code>dsh-mcp-client</code> 插件）。配置一个 MCP 服务器 = 告诉 DSH「用这个命令启动它」，之后模型就能调用该服务器提供的工具。典型的配置形态：</p>
      <pre><code># MCP 服务器配置示意（放在 settings.yaml 的 mcp 段）
mcpServers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: "你的令牌"</code></pre>
      <p>接入后，你可以在对话里直接让 AI「用 GitHub 工具查 deepseek-harness 仓库最近的 issue」。</p>

      <h3>Skill：打包好的「手艺教材」</h3>
      <p><b>Skill（技能包）</b>是另一个思路：把「某个领域的做事方法」打包——包含该领域的说明、步骤、示例和常用工具链。模型加载 Skill 后，就像临时学会了这门手艺。</p>
      <p>DSH 有 Skill 系统（<code>dsh-skill</code> 插件），并内置一些技能包（比如 <code>filesystem</code> 文件操作技能）。Skill 适合「教 AI 干某个特定领域的事」，比如写某个框架的代码、按某公司规范做发布。</p>

      <h3>MCP 和 Skill 怎么区分？</h3>
      <table>
        <thead><tr><th>维度</th><th>MCP</th><th>Skill</th></tr></thead>
        <tbody>
          <tr><td>本质</td><td>外部<b>能力插座</b>（协议）</td><td>内部<b>知识/流程包</b>（内容）</td></tr>
          <tr><td>解决的问题</td><td>「怎么接上」外部系统</td><td>「怎么做好」某类工作</td></tr>
          <tr><td>运行时</td><td>独立进程（MCP 服务器）</td><td>随 DSH 加载的文档+流程</td></tr>
          <tr><td>典型产物</td><td>新增工具</td><td>新增做事套路</td></tr>
        </tbody>
      </table>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 对插件开发者的意义</div>
        <p>这两条路也是你的机会：你可以把某个好用的外部工具封装成 MCP 服务器给别人用；也可以把某个领域的经验写成 Skill 发布。两者都可以做成 DSH 插件/bundle 分发——社区里已有 <code>mcp-client-v2</code> 这类插件（dsh-plugins 系列）。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（30 分钟）</div>
        <p>调研一个社区 MCP 服务器（推荐 GitHub 官方 MCP 或 filesystem MCP），尝试在 DSH 里接入它，然后让 AI 用它完成一件小事。如果没时间搭，至少读一遍它的 README 并回答：它暴露了哪些工具？</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>MCP = 外设统一插座（接入外部能力），Skill = 手艺教材（教做事方法）。两者都能打包成插件分发，是插件开发者最值得投入的两条赛道。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "MCP 最贴切的比喻是？",
        options: ["一套做饭教材", "AI 外设界的 USB-C 统一插座", "一个文件压缩工具", "一种编程语言"],
        answer: 1,
        explain: "MCP 是协议：任何能力做成 MCP 服务器，支持 MCP 的 AI 就能插上就用。",
      },
      {
        q: "Skill（技能包）的本质是？",
        options: ["打包好的「手艺教材」（说明+步骤+示例）", "一个独立进程", "一种加密协议", "一个硬件设备"],
        answer: 0,
        explain: "Skill 是内容包：把某个领域的做事方法写成教材，模型加载后现学现用。",
      },
      {
        q: "MCP 服务器在运行时是？",
        options: ["随 DSH 一起启动的插件", "独立进程（用 command + args 启动）", "一段 YAML 文本", "浏览器里的脚本"],
        answer: 1,
        explain: "MCP 服务器是独立进程，DSH 通过 MCP 协议和它通信。",
      },
    ],
  },

  {
    id: "s4-4",
    no: "4.4",
    title: "Web GUI 插件与源码贡献",
    minutes: "约 40 分钟",
    stage: "阶段四 · 进阶探索",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>知道 web 插件的 client half 结构；知道什么时候才需要学 Vue 和 TypeScript；知道给官方仓库提 PR 的流程。</p>
        </div>
      </div>

      <h3>Web 插件：Node half + client half 双半结构</h3>
      <p>whale-girl 这样的网页插件是「双半」的：Node half 在服务端干活（第 2.4 课），client half 在浏览器里露脸。client half 通过 DSH 的 <code>__ModuleLoader__</code> 挂载进网页，它只能通过 <code>fetch</code> 调用 Node half 的接口。</p>
      <pre><code># whale-girl client half 的分工（lib/client/）
index.mjs        # 挂载入口：从 DOM 找挂载点，渲染组件
character.mjs    # 角色渲染：按状态切动画帧
logic.mjs        # 状态机：轮询 /state，决定显示什么</code></pre>

      <h3>什么时候需要学 Vue / TypeScript？</h3>
      <table>
        <thead><tr><th>你想做的事</th><th>需要学什么</th><th>程度</th></tr></thead>
        <tbody>
          <tr><td>写纯 Node 插件（如 error-logger）</td><td>只 JS/ESM</td><td>阶段二够用</td></tr>
          <tr><td>写网页插件（宠物、面板）</td><td>JS + DOM，可选 Vue</td><td>官方网页壳是 Vue 3 写的，<b>想深度定制界面才需要</b></td></tr>
          <tr><td>给官方仓库（deepseek-harness）提 PR</td><td><b>TypeScript</b> + pnpm 工作区</td><td>官方源码是 TS，这一关绕不开</td></tr>
          <tr><td>给社区插件仓库提 PR</td><td>看对方用什么（whale-girl 就是纯 JS）</td><td>JS 即可</td></tr>
        </tbody>
      </table>

      <h3>官方仓库长什么样</h3>
      <p>仓库：<code>github.com/deepseek-ai/deepseek-harness</code>，典型 monorepo（一个仓库装多个包）结构：</p>
      <pre><code>deepseek-harness/
├── apps/
│   ├── cli/        # dsh 命令行
│   └── web/        # 网页应用壳（Vue + Vite）
└── packages/       # 各 dsh-* 插件包（工具、命令、服务……）</code></pre>

      <h3>提 PR 的标准流程</h3>
      <ol class="steps">
        <li>fork 仓库（GitHub 网页点一下）；</li>
        <li>clone 你的 fork，<code>pnpm install</code> 装依赖；</li>
        <li>新建分支，改代码；</li>
        <li>跑仓库的校验脚本（官方/whale-girl 都有类似 <code>gates</code> 的检查）；</li>
        <li>commit + push + 在 GitHub 发起 Pull Request；</li>
        <li>等维护者 review，按意见修改。</li>
      </ol>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：从用户变成工程师</div>
        <p>前三阶段你是「用设备的人」；本阶段你开始读原厂图纸（TS 源码）、给原厂提改进建议（PR）。身份的转变比技术更重要——从「我会用」到「我能改」。</p>
      </div>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 给你的第一条 PR 建议</div>
        <p>别一上来就改核心代码。先挑小的：修 README 错别字、补一个注释、修一个文档链接。第一次 PR 的目的不是炫技，是<b>走通流程</b>。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（选做，1 小时起）</div>
        <p>fork 一份 whale-girl（github.com/vlln/whale-girl），加一个你自己的小改动——比如给它加一条自定义回复语、或改一个动画参数。不需要真的合并进原仓库，本地跑通 + 自己仓库提交成功即可。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>写 Node 插件只要 JS；写网页插件可选学 Vue；给官方仓库贡献才需要 TypeScript + pnpm。第一条 PR 从小的开始。</p></div>
      </div>

      <div class="course-finish">
        <i class="fa-solid fa-trophy"></i>
        <div><b>🎉 恭喜你学完全部 18 课</b>
        <p>你从「Harness 是什么」走到了「能写、能装、能改、能贡献」。接下来最有效的学习方式是：<b>给 whale-girl 加功能、写一个自己的小插件、或给官方修一个 bug</b>。做中学，永远比看教程快。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "写一个纯 Node 插件（如 error-logger），需要学 Vue 吗？",
        options: ["必须学", "不需要，JS/ESM 就够", "要学一点", "要学 Vue 和 React 两种"],
        answer: 1,
        explain: "Vue 只在写网页端（client half）/深度定制界面时才需要。",
      },
      {
        q: "给官方 deepseek-harness 仓库提 PR，绕不开哪项技术？",
        options: ["TypeScript + pnpm 工作区", "Vue 3", "Photoshop", "C++"],
        answer: 0,
        explain: "官方源码是 TypeScript 写的 monorepo；但给社区 JS 插件提 PR 不需要。",
      },
      {
        q: "第一条 PR 最好的选题是？",
        options: ["重写核心调度器", "修 README 错别字或文档链接（先走通流程）", "新增 10 个插件", "删掉别人的代码"],
        answer: 1,
        explain: "第一次 PR 的目的是走通流程：从小改动开始，建立和维护者的信任。",
      },
    ],
  },
]
