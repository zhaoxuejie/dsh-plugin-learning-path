/* ============================================================
   阶段一 · 认识基础 —— 课程内容（4 课）
   用生活比喻搞懂 DeepSeek Harness 的核心概念
   ============================================================ */
window.COURSE_S1 = [
  {
    id: "s1-1",
    no: "1.1",
    title: "DeepSeek Harness 是什么",
    minutes: "约 20 分钟",
    stage: "阶段一 · 认识基础",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能用一句话说清 Harness 是什么；知道它和普通聊天工具的区别；能说出 DeepSeek Harness 的三块组成。</p>
        </div>
      </div>

      <h3>先认识一个词：AI 智能体（Agent）</h3>
      <p>你平时用的 ChatGPT、DeepSeek 网页版，本质是<b>聊天工具</b>——你问一句，它答一句。它不会真的去翻你电脑里的文件、执行命令、替你写文件。它只有「脑子」，没有「手」。</p>
      <p><b>智能体（Agent）</b>就不一样了：它不仅能思考，还能<b>自己决定下一步做什么</b>——去查文件、执行命令、运行代码、调用工具，一步步把事情真正做完。</p>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：餐厅厨房</div>
        <p>厨房里有很多厨师（大模型们：deepseek-chat、deepseek-reasoner……），每个厨师都很会做菜，但<b>没人知道该做哪桌的菜、先做哪道、谁来上菜</b>。于是需要一个<b>总台（Harness）</b>：接单、拆任务、派给厨师、盯着每道菜按顺序出锅、管理后厨所有设备。</p>
      </div>

      <h3>那 Harness 到底管了什么？</h3>
      <p>DeepSeek Harness 就是 DeepSeek 官方的「智能体总台」。它把散落的零件用「线束」接在一起（Harness 英文原意就是马具/线束）：</p>
      <table>
        <thead><tr><th>零件</th><th>它是什么</th><th>举例</th></tr></thead>
        <tbody>
          <tr><td>模型（大脑）</td><td>负责思考的语言模型</td><td>deepseek-chat / deepseek-reasoner</td></tr>
          <tr><td>工具（手）</td><td>让 AI 真正动手做事的能力</td><td>执行终端命令、读写文件、网页搜索</td></tr>
          <tr><td>记忆（工作台）</td><td>保存会话、任务、上下文</td><td>聊天记录、后台任务、子代理</td></tr>
          <tr><td>插件（外设）</td><td>按需加装的能力包</td><td>whale-girl 桌面宠物、MCP 连接器</td></tr>
          <tr><td>权限（门卫）</td><td>控制 AI 能做什么</td><td>命令审批、沙箱隔离</td></tr>
        </tbody>
      </table>

      <h3>DeepSeek Harness 的三块组成</h3>
      <ol class="steps">
        <li><b>命令行 <code>dsh</code></b>：在终端里启动、管理档案、装插件——所有操作的「总控台」。</li>
        <li><b>Web 界面</b>：浏览器里（就是你现在看到的 127.0.0.1:3080 这个页面）与 AI 协作的图形界面。</li>
        <li><b>插件体系</b>：通过 <code>dsh plugin</code> 命令按需安装/卸载的插件，是它能力的来源。</li>
      </ol>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 直观感受一下区别</div>
        <p>你让 AI「帮我把当前项目里文件数量统计一下」：<br>
        · 没有 Harness：它只能给你一段「建议你怎么做」的文字。<br>
        · 有 Harness：它真的会执行 <code>dir</code> / <code>ls</code>，读文件，然后告诉你结果。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（5 分钟）</div>
        <p>打开你的 DSH Web 界面，发一句话：「请用终端工具执行 <code>node -v</code> 并告诉我结果」。观察 AI 是不是真的执行了命令——这就是「有手」的感觉。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>Harness = 给 AI 大脑接上「手、记忆、外设、门卫」的总装台。DeepSeek Harness 由 <b>dsh 命令 + Web 界面 + 插件体系</b> 三块组成。学完标志：你能用「餐厅总台」这个比喻向朋友解释它。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "在「餐厅厨房」的比喻里，Harness 扮演什么角色？",
        options: ["厨师（负责做菜）", "总台（接单、派活、协调）", "食材（被加工的对象）", "菜单（用户的输入）"],
        answer: 1,
        explain: "Harness 是总台：它不亲自做菜，但负责协调厨师（模型）、设备（工具）和上菜顺序（执行流程）。",
      },
      {
        q: "普通聊天工具里的模型最缺「手」，这里的「手」在 Harness 里指什么？",
        options: ["漂亮的图形界面", "工具（执行命令、读写文件等能力）", "更长的回复字数", "更快的响应速度"],
        answer: 1,
        explain: "模型本身只会思考输出文字；工具（bash、fs、web_search 等）才是让它真正动手做事的「手」。",
      },
      {
        q: "DeepSeek Harness 由哪三块组成？",
        options: ["dsh 命令、Web 界面、插件体系", "模型、数据库、网页", "npm、pnpm、node", "档案、日志、端口"],
        answer: 0,
        explain: "三块：dsh 命令行（总控台）、Web 界面（图形协作）、插件体系（能力来源）。",
      },
    ],
  },

  {
    id: "s1-2",
    no: "1.2",
    title: "插件是什么",
    minutes: "约 20 分钟",
    stage: "阶段一 · 认识基础",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>知道插件 = 按需安装的能力包；能说出插件与 bundle 的关系；会装/卸一个插件。</p>
        </div>
      </div>

      <h3>插件（Plugin）＝ 能力包</h3>
      <p>插件是一段<b>按需安装的程序包</b>，装进 Harness 后给它增加一种新能力。默认的 Harness 只会「基本对话 + 官方基础能力」；装了哪个插件，它就多会哪个技能。</p>
      <p>你之前亲手装过的 <b>whale-girl</b>（网页右下角的鲸鱼娘桌面宠物）就是一个典型的社区插件。</p>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：办公室的设备</div>
        <p>打印机（文件读写）、电话（联网搜索）、桌上宠物（whale-girl）——<b>装什么设备，办公室就能干什么活</b>。设备是独立买来的、插上就能用、不用就拆掉。插件就是这样的「设备」。</p>
      </div>

      <h3>为什么要做成插件，而不是塞进主程序？</h3>
      <ul>
        <li><b>主程序小而稳</b>：核心代码不膨胀，基础功能不容易被带崩。</li>
        <li><b>按需安装</b>：不用的插件不占资源、不占界面。</li>
        <li><b>生态开放</b>：任何人都能写插件发布，Harness 能力无限扩展。</li>
      </ul>

      <h3>插件、包（package）、bundle 三个词的关系</h3>
      <p>在 DSH 里你会发现文档混用这几个词，其实层次是这样的：</p>
      <table>
        <thead><tr><th>词</th><th>含义</th><th>通俗说</th></tr></thead>
        <tbody>
          <tr><td>package（包）</td><td>npm 世界里分发代码的单位</td><td>一台「装着代码的快递箱」</td></tr>
          <tr><td>plugin（插件）</td><td>装进 Harness 后提供能力的一段程序</td><td>箱子里那台「设备」</td></tr>
          <tr><td>bundle（捆绑包）</td><td>一组插件组成的「安装清单/入口」</td><td>一份「采购清单」，一次买回多台设备</td></tr>
        </tbody>
      </table>
      <p>一个包通常就是一个 bundle：它可能只包含 1 个插件（如 whale-girl），也可能通过 patch 声明多个插件。下一课会看到 bundle 清单长什么样。</p>

      <h3>实战：安装一个插件</h3>
      <p>安装命令的格式（<code>web</code> 是你想装进的档案名，后面会讲）：</p>
      <pre><code>dsh plugin --profile web add whale-girl</code></pre>
      <p>也可以从 GitHub 仓库地址装：</p>
      <pre><code>dsh plugin --profile web add github:vlln/whale-girl#main</code></pre>
      <p>这条命令实际是把 pnpm 的「添加依赖」转发到 <code>web</code> 档案里执行，所以也支持 pnpm 的各种包地址写法。</p>
      <p>查看已经装了什么：</p>
      <pre><code>dsh plugin --profile web list</code></pre>
      <div class="expected"><pre><code>@deepseek-ai/dsh-base  0.1.0-rc.7
@deepseek-ai/dsh-web-app  0.1.0-rc.7
whale-girl  github:vlln/whale-girl#main</code></pre></div>

      <div class="box warn">
        <div class="box-title"><i class="fa-solid fa-triangle-exclamation"></i> 注意</div>
        <p>装完插件<b>不会立刻生效</b>——要等 Harness <b>重启</b>后才会把新插件「组装」进系统。为什么，第 1.4 课会专门讲。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（5 分钟）</div>
        <p>在终端运行 <code>dsh plugin --profile web list</code>，看看你的 web 档案里已经装了哪些包，找找 whale-girl 在哪一行。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>插件 = 能力包，按需安装、用完可拆。装的单位是 package，提供能力的是 plugin，bundle 是一组插件的清单入口。安装命令是 <code>dsh plugin --profile web add &lt;包&gt;</code>。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "「插件」最准确的理解是？",
        options: ["Harness 的主程序", "按需安装的能力包", "一段聊天记录", "一个配置文件"],
        answer: 1,
        explain: "插件 = 按需安装的能力包：装什么，Harness 就多会什么，不用就拆。",
      },
      {
        q: "往 web 档案里安装插件的命令是？",
        options: ["npm install whale-girl", "dsh plugin --profile web add whale-girl", "dsh web whale-girl", "pnpm run whale-girl"],
        answer: 1,
        explain: "dsh plugin --profile web add <包>，它内部转发给 pnpm 在 web 档案里执行。",
      },
      {
        q: "装完插件后，下面哪个说法正确？",
        options: ["立刻生效，马上能用", "重启 Harness 后才生效", "刷新浏览器即可生效", "装完就自动删掉了"],
        answer: 1,
        explain: "插件要等 Harness 重启后才会被「组装」进系统——原因在第 1.4 课。",
      },
    ],
  },

  {
    id: "s1-3",
    no: "1.3",
    title: "Profile 与 Bundle 是什么",
    minutes: "约 25 分钟",
    stage: "阶段一 · 认识基础",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能说出 profile 是什么；认识 DSH 数据目录的结构；能看懂 bundle 清单文件。</p>
        </div>
      </div>

      <h3>Profile（档案）＝ 一套独立的运行配置</h3>
      <p>一台电脑上的 DSH 可以同时管<b>多套互不干扰</b>的 Harness 实例，每一套就是一个 <b>profile（档案）</b>。它拥有一份完整的配置：装什么插件、开什么服务、用户设置长什么样。</p>
      <p>DSH 默认提供两种档案：</p>
      <table>
        <thead><tr><th>档案名</th><th>是什么</th><th>怎么启动</th></tr></thead>
        <tbody>
          <tr><td><code>web</code></td><td>网页版 Harness（带浏览器界面）</td><td><code>dsh web</code>（= <code>dsh --profile web</code>）</td></tr>
          <tr><td><code>headless</code></td><td>无界面命令行版（适合脚本/服务器）</td><td><code>dsh --profile headless</code></td></tr>
        </tbody>
      </table>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：员工工位的配置单</div>
        <p>web 档案是「网页版工位」的全套配置单：工位配了哪些设备（bundle 清单）、设备怎么摆（cordis.yml）、你个人怎么调（settings.yaml）。换一个档案 = 换一套配置单，互不影响。</p>
      </div>

      <h3>档案目录长什么样</h3>
      <p>所有档案都在你主目录下的 <code>~/.dsh/profiles/</code> 里。以 <code>web</code> 档案为例：</p>
      <pre><code>~/.dsh/profiles/web/
├── package.json        # ★ 核心：记录装了哪些包 + bundle 清单
├── cordis.yml          # 组装结果：启动时按 bundle 生成（一般不用手改）
├── settings.yaml       # 用户设置（插件的配置也写这里，可热更新）
├── pnpm-workspace.yaml # pnpm 工作区配置
├── node_modules/       # 装进来的包们
└── data/               # 插件自己存的数据</code></pre>

      <h3>看懂 bundle 清单（关键技能）</h3>
      <p>打开 <code>~/.dsh/profiles/web/package.json</code>，你会看到类似这样的字段：</p>
      <pre><code>{
  "dependencies": {
    "whale-girl": "github:vlln/whale-girl#main"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",     // 官方基础能力包
        "@deepseek-ai/dsh-web-app",  // 官方网页应用包
        "whale-girl"                 // 你装的社区插件
      ]
    }
  }
}</code></pre>
      <p>这里有两个信息：</p>
      <ul>
        <li><code>dependencies</code>：装了哪些包（pnpm 在这里记录）。</li>
        <li><code>dsh.profile.bundles</code>：<b>启动时要组装哪些 bundle</b>——这就是「工位配置单」本体。你 <code>add</code> 一个插件时，DSH 会自动把新包加进 dependencies 和 bundles 两处。</li>
      </ul>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 为什么叫 bundle 而不叫 plugin？</div>
        <p>因为一个「包」装进 Harness 时，可能往里塞<b>好几个插件</b>（通过它的 cordis.patch.yml 声明）。所以 Harness 组合的单位是「bundle 清单」，而不是单个插件。第 2.4 课解剖 whale-girl 时会看到 patch 文件长什么样。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（5 分钟）</div>
        <p>用记事本打开你自己的 <code>~/.dsh/profiles/web/package.json</code>，找出：① 装了几个依赖；② bundles 列表里有哪几项；③ whale-girl 用的是哪种地址写法。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>Profile = 一套独立配置（web / headless…）。档案目录在 <code>~/.dsh/profiles/&lt;名字&gt;/</code>，核心是 <code>package.json</code> 里的 <code>dsh.profile.bundles</code> 清单。装插件 = 往 dependencies 和 bundles 里各加一项。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "profile（档案）是什么？",
        options: ["一个网页书签", "一套独立的 Harness 运行配置", "一个 npm 包", "一段日志文件"],
        answer: 1,
        explain: "profile = 一套独立配置（如 web、headless），每个档案有自己的插件清单和设置。",
      },
      {
        q: "「工位配置单」（bundle 清单）写在哪里？",
        options: ["cordis.yml", "settings.yaml", "package.json 的 dsh.profile.bundles 字段", "node_modules 里"],
        answer: 2,
        explain: "bundle 清单在档案目录的 package.json 里，dsh.profile.bundles 字段。",
      },
      {
        q: "启动网页版 Harness 的命令是？",
        options: ["dsh web", "dsh --profile headless", "npm start web", "node web"],
        answer: 0,
        explain: "dsh web 就是 dsh --profile web 的简写。",
      },
    ],
  },

  {
    id: "s1-4",
    no: "1.4",
    title: "启动即组装（为什么要重启）",
    minutes: "约 20 分钟",
    stage: "阶段一 · 认识基础",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能讲清 DSH 的启动流程；会用 dump-config 验证插件有没有进组合；知道日志在哪看、常见启动报错怎么认。</p>
        </div>
      </div>

      <h3>启动 = 按清单「摆台」</h3>
      <p>DSH 每次启动时都做一遍同样的事（简化版）：</p>
      <ol class="steps">
        <li>读取档案 <code>package.json</code> 里的 <code>bundles</code> 清单；</li>
        <li>逐个加载 bundle，应用每个 bundle 的 <code>cordis.patch.yml</code>（补丁），拼出最终的<b>插件树</b>（存成 <code>cordis.yml</code>）；</li>
        <li>按插件树逐个启动插件（Node 端逻辑 + 网页端逻辑）；</li>
        <li>启动 <code>webServer</code> 服务，网页上线（默认 <code>127.0.0.1:3080</code>）。</li>
      </ol>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：餐厅每天早上摆台</div>
        <p>开门营业前，按清单把各岗位设备摆好、通电。营业中买来的新烤箱，也只能等<b>打烊后重新摆台</b>，第二天才用得上——这就是「装完插件要重启」的原因：<b>组装动作发生在启动时</b>。</p>
      </div>

      <h3>验证插件有没有进组合：dump-config</h3>
      <p>重启前，可以先看看「组装结果会长什么样」——不启动服务、只打印配置：</p>
      <pre><code>dsh --profile web --dump-config</code></pre>
      <p>输出很长，可以配合搜索（Windows PowerShell 下）：</p>
      <pre><code>dsh --profile web --dump-config | Select-String whale</code></pre>
      <div class="expected"><pre><code># == whale-girl
- id: whale-girl
  name: whale-girl</code></pre></div>
      <p>看到上面的片段，说明 whale-girl 已经在插件树里了。</p>

      <h3>日志去哪看</h3>
      <p>启动时终端里滚动输出的就是日志。插件加载出错、路由注册失败都会在这里现身。常见两种报错：</p>
      <table>
        <thead><tr><th>报错</th><th>意思</th><th>怎么办</th></tr></thead>
        <tbody>
          <tr><td><code>EADDRINUSE: 127.0.0.1:3080</code></td><td>端口被占用——上一个实例没关干净</td><td>找到旧进程结束掉（<code>netstat -ano | findstr 3080</code> 看 PID，再结束该 PID），再重启</td></tr>
          <tr><td><code>plugin tree failed to load</code></td><td>插件树加载失败，某插件代码/补丁有问题</td><td>看它上面几行报的是哪个插件，检查它的 package.json 和 patch</td></tr>
        </tbody>
      </table>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 补充：Node 端改代码也要重启</div>
        <p>插件分「Node 端（服务端）」和「client 端（浏览器）」两半。改 Node 端代码后，因为 Node 的模块缓存机制，<b>同样要重启才生效</b>；改 client 端则通常刷新浏览器即可。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（5 分钟）</div>
        <p>运行 <code>dsh --profile web --dump-config | Select-String whale</code>，把输出截图存下来。之后第 3.4 课装自己的插件时，你会用同一个命令验证「它进树了」。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>启动 = 读 bundle 清单 → 打 patch → 组装插件树 → 起服务。装完插件必须重启；用 <code>--dump-config</code> 验证进树；启动日志在终端，端口占用（EADDRINUSE）是最常见的新手坑。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "为什么装完插件必须重启才生效？",
        options: ["因为网络延迟", "因为组装（读清单+打补丁）发生在启动时", "因为浏览器要刷新", "因为插件要重新下载"],
        answer: 1,
        explain: "bundle 清单是启动时读的，组装（摆台）动作在启动那一刻完成。",
      },
      {
        q: "验证插件有没有进「组装清单」，用什么命令？",
        options: ["dsh web", "dsh --profile web --dump-config", "npm list", "dsh plugin --profile web add"],
        answer: 1,
        explain: "--dump-config 只打印组装配置、不启动服务，适合重启前验证。",
      },
      {
        q: "启动时报 EADDRINUSE，最可能的原因是？",
        options: ["插件代码写错了", "端口被占用：上一个实例没关干净", "配置文件格式错误", "浏览器缓存没清"],
        answer: 1,
        explain: "EADDRINUSE = 地址已被使用：netstat 找 PID 后 taskkill 即可。",
      },
    ],
  },
]
