/* ============================================================
   实战项目库（顺序即侧栏/首页展示顺序）
   结构：{ id, name, icon, desc, difficulty, minutes, steps[], quiz[] }
   每个 step：{ id, title, html }
   新增项目：按 _TEMPLATE.md 说明在数组里追加即可（无需改其他文件）
   ============================================================ */
window.PROJECTS = [
  /* ==================================================
     ① Hello World 插件 —— 最小可运行插件，入门仪式
     ================================================== */
  {
    id: "hello-world",
    name: "Hello World 插件",
    icon: "fa-hand-sparkles",
    desc: "最小可运行插件：启动打招呼 + 一个问候接口，验证整个开发闭环",
    difficulty: "入门",
    minutes: "约 1.5 小时",
    steps: [
      {
        id: "design",
        title: "设计",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>完成设计三问 + 接口设计，画出目录规划。（通用三问套路见 <a href="#/s3-0">3.0 方法论</a>）</p>
            </div>
          </div>

          <h3>需求：Hello World 插件</h3>
          <p>在计算机世界的传统里，每学一门新技术都从 <b>Hello World</b> 开始：写一个最小的程序跑起来，证明「工具链、流程、环境」整条链路是通的。我们的第一个 DSH 插件也这么做——<b>小到不能再小，但五脏俱全</b>。</p>
          <p>它只干两件事：① 插件启动时在日志里打一声招呼；② 提供一个接口，访问就返回一句问候 JSON。</p>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：新房入住仪式</div>
            <p>装修队进场前，先在新房里点一盏灯（最小程序）。灯亮了，说明水电、门禁、许可证全都通了——之后再装什么大家具都有底气。Hello World 就是那盏灯。</p>
          </div>

          <h3>设计三问</h3>
          <table>
            <thead><tr><th>问题</th><th>我们的答案</th><th>为什么</th></tr></thead>
            <tbody>
              <tr><td>① 提供什么能力？</td><td>启动打招呼 + 一个问候接口</td><td>最小、可验证</td></tr>
              <tr><td>② 挂在 Node 端还是 client 端？</td><td>Node 端（服务端）</td><td>要打印日志 + 开 HTTP 路由</td></tr>
              <tr><td>③ 需要哪些配置？</td><td>第一版一个都不要</td><td>保持最简，第 5 步再加</td></tr>
            </tbody>
          </table>

          <h3>接口设计</h3>
          <pre><code>GET /hello-world    # 返回一句问候</code></pre>
          <div class="expected"><pre><code>{"message":"你好，DSH！","ts":1753057800000}</code></pre></div>

          <h3>目录规划</h3>
          <pre><code>hello-world-plugin/
├── package.json        # 身份证 + dsh.bundle.patch 声明
├── cordis.patch.yml    # 补丁：insert 插件
└── lib/
    └── index.mjs       # 插件本体（Node half）</code></pre>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
            <p>创建 <code>hello-world-plugin/</code> 文件夹，画出「输入 → 处理 → 输出」图：输入 = 浏览器访问 /hello-world；处理 = 读取问候语；输出 = JSON。</p>
          </div>
        `,
      },
      {
        id: "skeleton",
        title: "搭骨架",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>写出 bundle 插件的 package.json 和 cordis.patch.yml；了解 index.mjs 的占位写法。验收标准：空壳装上能启动。</p>
            </div>
          </div>

          <h3>① 写 package.json（身份证）</h3>
          <p>在 <code>hello-world-plugin/package.json</code> 写入：</p>
          <pre><code>{
  "name": "hello-world",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.mjs",
  "exports": {
    ".": "./lib/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  }
}</code></pre>
          <ul>
            <li><code>type: "module"</code>：整个包按 ESM 处理；</li>
            <li><code>main</code> / <code>exports</code>：告诉 Node「入口在 lib/index.mjs」；</li>
            <li><code>dsh.bundle.patch</code>：★ <b>身份证明</b>——DSH 靠它知道这是个 bundle 插件；</li>
            <li>没有 <code>dsh.client</code> 字段：纯 Node 插件，没有网页端。</li>
          </ul>

          <h3>② 写 cordis.patch.yml（报名）</h3>
          <p>在 <code>hello-world-plugin/cordis.patch.yml</code> 写入：</p>
          <pre><code># hello-world bundle patch：向 web 组合挂载本插件
- insert:
    - id: hello-world
      name: hello-world</code></pre>

          <h3>③ 写 index.mjs 占位版</h3>
          <p>在 <code>hello-world-plugin/lib/index.mjs</code> 写入最小占位：</p>
          <pre><code>export const name = "hello-world"

export function apply(ctx) {
  // 下一步在这里挂路由
  console.log("hello-world 已加载：你好，DSH！")
}</code></pre>
          <div class="expected"><pre><code>// 重启 dsh web 后，启动日志里会多一行：
hello-world 已加载：你好，DSH！</code></pre></div>

          <div class="box warn">
            <div class="box-title"><i class="fa-solid fa-triangle-exclamation"></i> 占位版的坑</div>
            <p>① <code>apply</code> 里不能完全空着（留一行 console.log）；② 占位版也要 export name，否则 patch 里 insert 的 id 找不到对应插件，启动会报错。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>创建三个文件并逐字敲入上面内容（<b>别复制粘贴</b>——亲手敲一遍，你会记住字段名）。敲完后检查三个文件的相对路径和目录规划是否一致。</p>
          </div>
        `,
      },
      {
        id: "logic",
        title: "写逻辑",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>写出完整插件本体：用 webServer 服务挂上 GET /hello-world 路由。整段代码只有 20 行，是全教程最小的完整插件。</p>
            </div>
          </div>

          <h3>完整代码（约 20 行）</h3>
          <p>把 <code>lib/index.mjs</code> 替换成：</p>
          <pre><code>export const name = "hello-world"
// 声明依赖：需要网页服务器（web 档案里有；headless 档案可能没有）
export const inject = ["webServer"]

export function apply(ctx) {
  // 1. 拿服务。拿不到（如 headless 档案）就安全退出
  const webServer = ctx.get("webServer")
  if (!webServer) return

  // 2. 启动日志打招呼
  console.log("hello-world 已加载：你好，DSH！")

  // 3. ctx.effect 注册「要长期活着的事」，并返回清理函数
  ctx.effect(() => {
    const dispose = webServer.register({
      kind: "exact",        // exact = 精确匹配 /hello-world
      path: "/hello-world",
      handler: async (req, res) => {
        res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
        res.end(JSON.stringify({
          message: "你好，DSH！",
          ts: Date.now(),
        }))
      },
    })
    return () => dispose?.()   // 插件被停用时，撤销这个路由
  }, "hello-world: 问候路由")
}</code></pre>
          <div class="expected"><pre><code>// 浏览器访问 http://127.0.0.1:3080/hello-world 会得到：
{"message":"你好，DSH！","ts":1753057800000}</code></pre></div>

          <h3>最简四件套</h3>
          <table>
            <thead><tr><th>代码</th><th>含义</th></tr></thead>
            <tbody>
              <tr><td><code>export const inject = ["webServer"]</code></td><td>声明依赖：DSH 会先把 webServer 准备好再启动我</td></tr>
              <tr><td><code>ctx.get("webServer")</code></td><td>拿服务；拿不到返回 undefined，判空退出保证不崩</td></tr>
              <tr><td><code>ctx.effect(fn, 标签)</code></td><td>注册副作用，fn 返回的清理函数在插件停用时执行</td></tr>
              <tr><td><code>webServer.register({...})</code></td><td>挂路由：kind 匹配方式、path 路径、handler 处理函数</td></tr>
            </tbody>
          </table>

          <div class="box note">
            <div class="box-title"><i class="fa-solid fa-circle-info"></i> kind 的两种匹配方式</div>
            <p><code>exact</code> = 整段路径完全相等（如 /hello-world）；<code>prefix</code> = 前缀匹配（如 /assets 会命中 /assets/characters/idle.png）。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>亲手敲入上面代码。然后做一次「预言」：如果我把 <code>path: "/hello-world"</code> 改成 <code>path: "/hi"</code>，会发生什么？先写答案，下一步验证。</p>
          </div>
        `,
      },
      {
        id: "verify",
        title: "安装验证",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>把本地插件装进 web 档案，重启后访问接口拿到问候 JSON——点亮你的第一盏灯。</p>
            </div>
          </div>

          <h3>① 安装（file: 本地路径）</h3>
          <p>在终端里，cd 到 <code>hello-world-plugin</code> 的<b>上一级目录</b>，运行：</p>
          <pre><code>dsh plugin --profile web add file:./hello-world-plugin</code></pre>
          <p>装完可以去 <code>~/.dsh/profiles/web/package.json</code> 检查是否多了一项 <code>hello-world</code>。</p>

          <h3>② 重启 web</h3>
          <pre><code># 停掉旧实例（Ctrl+C，或按 2.5 课的方法清理端口占用）
dsh web</code></pre>
          <p>启动日志里应该能看到 <code>hello-world 已加载：你好，DSH！</code>。</p>

          <h3>③ 验证两连</h3>
          <p><b>验证一：确认进树</b></p>
          <pre><code>dsh --profile web --dump-config | Select-String hello</code></pre>
          <div class="expected"><pre><code># == hello-world
- id: hello-world
  name: hello-world</code></pre></div>

          <p><b>验证二：访问接口</b>——浏览器打开：</p>
          <pre><code>http://127.0.0.1:3080/hello-world</code></pre>
          <div class="expected"><pre><code>{"message":"你好，DSH！","ts":1753057800000}</code></pre></div>

          <p><b>预言题答案</b>：上一步把 path 改成 <code>/hi</code> 的话，访问 /hello-world 会 404、访问 /hi 才会出问候。路径就是按钮的位置，装错了位置按不着。</p>

          <h3>排错表</h3>
          <table>
            <thead><tr><th>症状</th><th>原因</th><th>处理</th></tr></thead>
            <tbody>
              <tr><td>启动报 <code>plugin tree failed to load</code></td><td>patch 里 id 和 export 的 name 对不上</td><td>核对两处拼写（hello-world）</td></tr>
              <tr><td>访问接口返回网页壳（HTML）</td><td>路由没注册上</td><td>看 dump-config 进树没有；看日志报错</td></tr>
              <tr><td>访问接口 500 错误</td><td>handler 代码报错</td><td>看启动终端日志堆栈，多数是变量名写错</td></tr>
              <tr><td>改完代码没生效</td><td>Node 端改动要重启</td><td>重启 web</td></tr>
            </tbody>
          </table>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：灯亮了</div>
            <p>看到那行问候 JSON 的瞬间，工具链、文件结构、组装流程全部验证通过。往后所有插件都是在这个骨架上长肉。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
            <p>把问候语改成你自己的话（比如「你好，未来的插件大师！」），重启验证。然后再故意拼错一次（比如 <code>JSON.strigify</code>），看 500 错误和日志长什么样，再修回来。</p>
          </div>
        `,
      },
      {
        id: "config",
        title: "进阶配置",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>给问候语加一个配置项 greeting，放进 settings.yaml，体验「改配置不用重启」的热更新。</p>
            </div>
          </div>

          <h3>新需求</h3>
          <p>问候语现在写死在代码里。把它变成配置 <code>greeting</code>（字符串，默认「你好，DSH！」）——改 settings.yaml 就能换问候语，不用改代码。</p>

          <h3>① 用 schemastery 声明配置</h3>
          <p>whale-girl 用的就是 schemastery。修改 <code>lib/index.mjs</code>：</p>
          <pre><code>import { Schema } from "schemastery"

export const name = "hello-world"
export const inject = ["webServer", "settings"]

// 配置声明：greeting 字符串（默认「你好，DSH！」）
const CONFIG_SCHEMA = Schema.object({
  greeting: Schema.string().default("你好，DSH！"),
})

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return

  // 拿 settings 服务（缺失时回退默认值，保证插件照常跑）
  const settings = ctx.get("settings")
  let config = { greeting: "你好，DSH！" }
  if (settings && typeof settings.register === "function") {
    const scope = settings.register("hello-world", CONFIG_SCHEMA, {
      applies: "live",   // ★ 关键：允许热更新
    })
    config = scope.get()
    scope.watch((next) => {
      config = next      // 配置一变，立刻生效，无需重启
    })
  }

  ctx.effect(() => {
    const dispose = webServer.register({
      kind: "exact",
      path: "/hello-world",
      handler: async (req, res) => {
        res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
        res.end(JSON.stringify({
          message: config.greeting,   // 读配置
          ts: Date.now(),
        }))
      },
    })
    return () => dispose?.()
  }, "hello-world: 问候路由")
}</code></pre>

          <h3>② 在 settings.yaml 里写配置</h3>
          <p>编辑 <code>~/.dsh/settings.yaml</code>，加一段：</p>
          <pre><code>hello-world:
  greeting: 早上好，又是元气满满的一天！</code></pre>

          <h3>③ 体验热更新</h3>
          <ol class="steps">
            <li>重启一次 web（让新代码和新配置加载）；</li>
            <li>访问 <code>/hello-world</code>，看到新问候语；</li>
            <li><b>不重启</b>，直接把 settings.yaml 里 greeting 改成别的并保存；</li>
            <li>刷新浏览器，问候语变了——这就是 <code>applies: "live"</code> + <code>scope.watch</code> 的威力。</li>
          </ol>
          <div class="expected"><pre><code>// greeting: 早上好，又是元气满满的一天！时访问：
{"message":"早上好，又是元气满满的一天！","ts":1753057800000}</code></pre></div>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：给台灯装旋钮</div>
            <p>Schema 是「说明书：本灯有亮度旋钮」；settings.yaml 是「你把旋钮拧到哪」；<code>applies: live</code> 是「带电调光」——不用断电换灯泡。</p>
          </div>

          <h3>📦 附：最终版完整三文件（做完本步的状态，点开可复制）</h3>
          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：hello-world-plugin/package.json</summary>
            <pre><code>{
  "name": "hello-world",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.mjs",
  "exports": {
    ".": "./lib/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  },
  "dependencies": {
    "schemastery": "^3.18.0"
  }
}</code></pre>
          </details>
          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：hello-world-plugin/cordis.patch.yml</summary>
            <pre><code># hello-world bundle patch：向 web 组合挂载本插件
- insert:
    - id: hello-world
      name: hello-world</code></pre>
          </details>
          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：hello-world-plugin/lib/index.mjs</summary>
            <pre><code>import { Schema } from "schemastery"

export const name = "hello-world"
export const inject = ["webServer", "settings"]

const CONFIG_SCHEMA = Schema.object({
  greeting: Schema.string().default("你好，DSH！"),
})

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return

  const settings = ctx.get("settings")
  let config = { greeting: "你好，DSH！" }
  if (settings && typeof settings.register === "function") {
    const scope = settings.register("hello-world", CONFIG_SCHEMA, {
      applies: "live",
    })
    config = scope.get()
    scope.watch((next) => {
      config = next
    })
  }

  ctx.effect(() => {
    const dispose = webServer.register({
      kind: "exact",
      path: "/hello-world",
      handler: async (req, res) => {
        res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
        res.end(JSON.stringify({
          message: config.greeting,
          ts: Date.now(),
        }))
      },
    })
    return () => dispose?.()
  }, "hello-world: 问候路由")
}</code></pre>
          </details>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>再加一个配置 <code>repeats: number</code>（默认 1）：让返回的 message 重复 N 遍（提示：字符串的 <code>.repeat(n)</code> 方法）。走通「改 settings.yaml → 不用重启 → 结果变化」全流程。</p>
          </div>
        `,
      },
    ],
    quiz: [
      {
        q: "在计算机世界的传统里，Hello World 的意义是什么？",
        options: ["程序写得很长", "用最小程序验证整条链路（工具链/流程/环境）都通了", "测试电脑性能", "是一种编程语言"],
        answer: 1,
        explain: "最小程序跑起来 = 环境、流程、工具链全部验证通过，之后才能放心搭大工程。",
      },
      {
        q: "package.json 里哪个字段证明「我是 DSH bundle 插件」？",
        options: ["\"version\"", "\"dsh\": {\"bundle\": {\"patch\": ...}}", "\"main\"", "\"license\""],
        answer: 1,
        explain: "dsh.bundle.patch 指向 cordis.patch.yml；没有它，DSH 只当你是普通 npm 包。",
      },
      {
        q: "export const inject = [\"webServer\"] 的作用是？",
        options: ["导入网页服务器代码", "声明依赖：DSH 会先准备好 webServer 再启动本插件", "启动一个网页服务器", "设置端口号"],
        answer: 1,
        explain: "inject 数组声明依赖，DSH 按依赖顺序启动插件。",
      },
      {
        q: "浏览器访问 /hello-world 返回了问候 JSON，说明什么？",
        options: ["代码有 bug", "路由注册成功、服务运行正常", "网络断了", "需要重启"],
        answer: 1,
        explain: "接口通了 = 插件加载、路由挂载、处理函数执行全部正常。",
      },
      {
        q: "想让改 settings.yaml 不用重启就生效，注册配置时要写？",
        options: ["applies: \"live\"", "hot: true", "watch: yes", "自动生效，不用写"],
        answer: 0,
        explain: "applies: \"live\" 开启热更新，配合 scope.watch 即时拿到新配置。",
      },
    ],
  },

  /* ==================================================
     ② 状态面板 status-panel —— 一键查看 DSH 运行状态
     ================================================== */
  {
    id: "status-panel",
    name: "状态面板 status-panel",
    icon: "fa-gauge-high",
    desc: "一键查看 DSH 运行状态：运行时长、任务统计、会话数",
    difficulty: "入门",
    minutes: "约 2 小时",
    steps: [
      {
        id: "design",
        title: "设计",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>完成设计三问 + 接口设计，画出目录规划。（通用三问套路见 <a href="#/s3-0">3.0 方法论</a>）</p>
            </div>
          </div>

          <h3>需求：状态面板（status-panel）</h3>
          <p>DSH 运行的时候，你想不想知道：它已经跑了多久？当前有几个任务在跑、成功/失败了多少？现在有几个会话？——这些信息散落在各个服务里，我们做一个「仪表盘」插件，一个接口全部汇总。</p>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：汽车仪表盘</div>
            <p>里程表、油表、水温表分散在发动机各处，仪表盘把它们汇总到驾驶员眼前。status-panel 就是 DSH 的仪表盘。</p>
          </div>

          <h3>设计三问</h3>
          <table>
            <thead><tr><th>问题</th><th>我们的答案</th><th>为什么</th></tr></thead>
            <tbody>
              <tr><td>① 提供什么能力？</td><td>一个状态查询接口（JSON 仪表盘）</td><td>实用、可验证</td></tr>
              <tr><td>② 挂在 Node 端还是 client 端？</td><td>Node 端</td><td>任务/会话数据都在服务端（jobs / sessions 服务）</td></tr>
              <tr><td>③ 需要哪些配置？</td><td>第一版一个都不要</td><td>保持最简，第 5 步再加</td></tr>
            </tbody>
          </table>

          <h3>数据从哪来？</h3>
          <p>这个插件要消费两个服务：</p>
          <ol class="steps">
            <li><b>jobs 服务</b>：<code>jobs.list()</code> 返回所有任务的快照数组（每个快照有 <code>status</code>：running / completed / failed）。whale-girl 源码里就用它统计任务（对照它的 <code>collectTasks</code> 函数）；</li>
            <li><b>sessions 服务</b>：<code>sessions.list()</code> 返回会话列表，取长度就是会话数。</li>
          </ol>

          <h3>接口设计</h3>
          <pre><code>GET /status-panel/status   # 返回运行状态汇总</code></pre>
          <div class="expected"><pre><code>{
  "uptimeMs": 123456,          // 已运行毫秒数
  "jobs": {
    "running": 1,              // 进行中的任务
    "completed": 8,            // 已完成
    "failed": 1,               // 已失败
    "total": 10
  },
  "sessions": 3,               // 会话数
  "ts": 1753057800000
}</code></pre></div>

          <h3>目录规划</h3>
          <pre><code>status-panel-plugin/
├── package.json        # 身份证 + dsh.bundle.patch 声明
├── cordis.patch.yml    # 补丁：insert 插件
└── lib/
    └── index.mjs       # 插件本体（Node half）</code></pre>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
            <p>创建 <code>status-panel-plugin/</code> 文件夹，画出「输入 → 处理 → 输出」图：输入 = 浏览器访问 /status-panel/status；处理 = 读 jobs/sessions 服务 + 统计；输出 = JSON 仪表盘。</p>
          </div>
        `,
      },
      {
        id: "skeleton",
        title: "搭骨架",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>写出 status-panel 的 package.json、cordis.patch.yml 和占位 index.mjs。验收标准：空壳装上能启动。</p>
            </div>
          </div>

          <h3>① 写 package.json（身份证）</h3>
          <p>在 <code>status-panel-plugin/package.json</code> 写入（结构同 hello-world，只换名字）：</p>
          <pre><code>{
  "name": "status-panel",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.mjs",
  "exports": {
    ".": "./lib/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  }
}</code></pre>

          <h3>② 写 cordis.patch.yml（报名）</h3>
          <pre><code># status-panel bundle patch：向 web 组合挂载本插件
- insert:
    - id: status-panel
      name: status-panel</code></pre>

          <h3>③ 写 index.mjs 占位版</h3>
          <pre><code>export const name = "status-panel"

export function apply(ctx) {
  // 下一步在这里读服务、挂路由
  console.log("status-panel 已加载")
}</code></pre>
          <div class="expected"><pre><code>// 重启 dsh web 后，启动日志里会多一行：
status-panel 已加载</code></pre></div>

          <div class="box note">
            <div class="box-title"><i class="fa-solid fa-circle-info"></i> 骨架为什么三件套都一样？</div>
            <p>因为骨架就是「身份证 + 报名 + 空壳」的通用流程（3.0 方法论步骤②）。每次实战都从这里开始——写得越熟，越能把注意力留给插件特有的逻辑。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>这次试着<b>不往回翻</b>，凭记忆敲出三个文件（可以对照 hello-world 项目检查）。记不住的部分就是下一轮要复习的点。</p>
          </div>
        `,
      },
      {
        id: "logic",
        title: "写逻辑",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>消费 jobs / sessions 两个服务，统计任务状态，挂上 /status-panel/status 路由。</p>
            </div>
          </div>

          <h3>完整代码（约 45 行）</h3>
          <p>把 <code>lib/index.mjs</code> 替换成：</p>
          <pre><code>export const name = "status-panel"
// 依赖：网页服务器（挂接口）+ 任务服务 + 会话服务
export const inject = ["webServer", "jobs", "sessions"]

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return
  const jobs = ctx.get("jobs")
  const sessions = ctx.get("sessions")

  ctx.effect(() => {
    const dispose = webServer.register({
      kind: "exact",
      path: "/status-panel/status",
      handler: async (req, res) => {
        // 1. 读任务快照（jobs 服务缺失时给空数组）
        const jobList = []
        if (jobs && typeof jobs.list === "function") {
          try {
            jobList.push(...jobs.list())
          } catch {
            // 读取失败不崩溃，保持空列表
          }
        }

        // 2. 按状态计数
        const counts = { running: 0, completed: 0, failed: 0 }
        for (const j of jobList) {
          if (j && j.status === "running") counts.running += 1
          else if (j && j.status === "completed") counts.completed += 1
          else if (j && j.status === "failed") counts.failed += 1
        }

        // 3. 会话数（sessions 服务缺失时给 0）
        let sessionCount = 0
        if (sessions && typeof sessions.list === "function") {
          try {
            sessionCount = sessions.list().length
          } catch {
            sessionCount = 0
          }
        }

        // 4. 汇总输出
        res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
        res.end(JSON.stringify({
          uptimeMs: Math.round(process.uptime() * 1000),
          jobs: { ...counts, total: jobList.length },
          sessions: sessionCount,
          ts: Date.now(),
        }))
      },
    })
    return () => dispose?.()
  }, "status-panel: 状态路由")
}</code></pre>
          <div class="expected"><pre><code>// 浏览器访问 http://127.0.0.1:3080/status-panel/status：
{"uptimeMs":123456,"jobs":{"running":1,"completed":8,"failed":1,"total":10},"sessions":3,"ts":1753057800000}</code></pre></div>

          <h3>逐段拆解</h3>
          <table>
            <thead><tr><th>代码</th><th>含义</th></tr></thead>
            <tbody>
              <tr><td><code>inject = ["webServer", "jobs", "sessions"]</code></td><td>一次声明三个依赖服务，DSH 按序注入</td></tr>
              <tr><td><code>jobs.list()</code></td><td>返回任务快照数组——whale-girl 的 collectTasks 用的就是它</td></tr>
              <tr><td><code>typeof jobs.list === "function"</code></td><td>先确认方法存在再调用：服务在 headless 档案里可能缺失，防御式编程保命</td></tr>
              <tr><td><code>try / catch</code></td><td>读失败就保持空数据，绝不让查询接口把整个服务带崩</td></tr>
              <tr><td><code>for...of + if/else if</code></td><td>按 status 计数——阶段二 2.1 课学的循环和条件判断，实战登场</td></tr>
              <tr><td><code>{ ...counts, total }</code></td><td>展开运算符合并对象：把计数对象加一个 total 字段</td></tr>
            </tbody>
          </table>

          <h3>三个补充知识点</h3>
          <p><b>① 消费服务永远「先判空」</b>：你的插件可能被装进任何档案（web / headless / 自定义），别人可能没配齐服务。<code>if (svc && typeof svc.method === "function")</code> 是插件开发的护身符。</p>
          <p><b>② 服务名是字符串协议</b>：<code>ctx.get("jobs")</code> 里的 <code>"jobs"</code> 是 DSH 约定的服务名。想知道有哪些服务名，翻官方插件源码里的 <code>ctx.get("...")</code> 和 <code>ctx.provide("...")</code>。</p>
          <p><b>③ 展开运算符 ...</b>：<code>{ ...counts, total: n }</code> 意思是「把 counts 的所有字段复制过来，再加一个 total」。JS 里拼接对象的最常用写法。</p>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：仪表盘接线</div>
            <p>jobs 服务是「发动机传感器」，sessions 服务是「车厢传感器」，我们的 handler 是把数据汇总到仪表盘的「仪表电路」。传感器坏了（服务缺失），仪表盘依然能转。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（20 分钟）</div>
            <p>亲手敲入代码，然后做一次「预言」：如果把这个插件装进 headless 档案（没有 webServer），访问接口会怎样？如果 web 档案里 sessions 服务缺失，返回的 JSON 会怎样？先写答案，下一步验证。</p>
          </div>
        `,
      },
      {
        id: "verify",
        title: "安装验证",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>把插件装进 web 档案，重启后访问接口看到真实的 DSH 运行数据。</p>
            </div>
          </div>

          <h3>① 安装</h3>
          <pre><code>dsh plugin --profile web add file:./status-panel-plugin</code></pre>

          <h3>② 重启 web</h3>
          <pre><code>dsh web</code></pre>
          <p>日志里应看到 <code>status-panel 已加载</code>。</p>

          <h3>③ 验证三连</h3>
          <p><b>验证一：确认进树</b></p>
          <pre><code>dsh --profile web --dump-config | Select-String status</code></pre>
          <div class="expected"><pre><code># == status-panel
- id: status-panel
  name: status-panel</code></pre></div>

          <p><b>验证二：访问接口</b>——浏览器打开：</p>
          <pre><code>http://127.0.0.1:3080/status-panel/status</code></pre>
          <div class="expected"><pre><code>{"uptimeMs":123456,"jobs":{"running":0,"completed":0,"failed":0,"total":0},"sessions":1,"ts":1753057800000}</code></pre></div>
          <p><code>uptimeMs &gt; 0</code>（服务在跑）且 <code>sessions ≥ 1</code>（至少当前这个会话）就说明读到真实数据了。</p>

          <p><b>验证三：让数据动起来</b>——在 web 里让 AI 启动一个后台任务（比如「帮我后台运行 node -e "setTimeout(()=>{}, 30000)"」），任务进行中再刷新 /status-panel/status，观察 <code>jobs.running</code> 从 0 变 1。</p>

          <p><b>预言题答案</b>：① headless 档案没有 webServer，插件 <code>if (!webServer) return</code> 直接退出——不报错、不开接口；② sessions 缺失时，<code>sessions</code> 字段输出 0，其余字段正常。这就是「安全降级」。</p>

          <h3>排错表</h3>
          <table>
            <thead><tr><th>症状</th><th>原因</th><th>处理</th></tr></thead>
            <tbody>
              <tr><td>启动报 <code>plugin tree failed to load</code></td><td>patch id 和 export name 对不上</td><td>核对两处拼写（status-panel）</td></tr>
              <tr><td>jobs 数字全是 0 且不变化</td><td>jobs 服务缺失 / 没在跑任务</td><td>先跑一个后台任务再刷新对比</td></tr>
              <tr><td>访问接口 500</td><td>handler 报错</td><td>看启动日志堆栈；检查服务名拼写</td></tr>
              <tr><td>接口返回网页壳（HTML）</td><td>路由没注册上</td><td>dump-config 确认进树；看日志</td></tr>
            </tbody>
          </table>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>让 AI 连续跑三个任务：一个很快完成、一个故意失败、一个慢慢跑。在第三个还在跑时刷新状态接口，试试能不能截到 <code>running:1, completed:1, failed:1</code> 的「全家福」画面。</p>
          </div>
        `,
      },
      {
        id: "config",
        title: "进阶配置",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>给状态面板加两个开关：includeJobs / includeSessions，控制返回哪些统计，体验热更新。</p>
            </div>
          </div>

          <h3>新需求</h3>
          <p>有时候你只关心任务统计、不想看会话数（或反过来）。加两个布尔配置：<code>includeJobs</code>（默认 true）、<code>includeSessions</code>（默认 true），控制返回哪些统计。</p>

          <h3>① 完整代码</h3>
          <p>修改 <code>lib/index.mjs</code>（在上一版基础上加配置）：</p>
          <pre><code>import { Schema } from "schemastery"

export const name = "status-panel"
export const inject = ["webServer", "jobs", "sessions", "settings"]

const CONFIG_SCHEMA = Schema.object({
  includeJobs: Schema.boolean().default(true),
  includeSessions: Schema.boolean().default(true),
})

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return
  const jobs = ctx.get("jobs")
  const sessions = ctx.get("sessions")

  const settings = ctx.get("settings")
  let config = { includeJobs: true, includeSessions: true }
  if (settings && typeof settings.register === "function") {
    try {
      const scope = settings.register("status-panel", CONFIG_SCHEMA, {
        applies: "live",   // ★ 热更新
      })
      config = scope.get()
      scope.watch((next) => {
        config = next
      })
    } catch {
      // register 失败 → 保持默认值
    }
  }

  ctx.effect(() => {
    const dispose = webServer.register({
      kind: "exact",
      path: "/status-panel/status",
      handler: async (req, res) => {
        const out = {
          uptimeMs: Math.round(process.uptime() * 1000),
          ts: Date.now(),
        }

        if (config.includeJobs) {                 // 开关：任务统计
          const jobList = []
          if (jobs && typeof jobs.list === "function") {
            try { jobList.push(...jobs.list()) } catch { /* 保持空 */ }
          }
          const counts = { running: 0, completed: 0, failed: 0 }
          for (const j of jobList) {
            if (j && j.status === "running") counts.running += 1
            else if (j && j.status === "completed") counts.completed += 1
            else if (j && j.status === "failed") counts.failed += 1
          }
          out.jobs = { ...counts, total: jobList.length }
        }

        if (config.includeSessions) {             // 开关：会话统计
          let sessionCount = 0
          if (sessions && typeof sessions.list === "function") {
            try { sessionCount = sessions.list().length } catch { sessionCount = 0 }
          }
          out.sessions = sessionCount
        }

        res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
        res.end(JSON.stringify(out))
      },
    })
    return () => dispose?.()
  }, "status-panel: 状态路由")
}</code></pre>

          <h3>② 在 settings.yaml 里写配置</h3>
          <pre><code>status-panel:
  includeJobs: true
  includeSessions: false</code></pre>

          <h3>③ 体验热更新</h3>
          <ol class="steps">
            <li>重启一次 web；访问 <code>/status-panel/status</code>，看到 <code>sessions</code> 字段已消失（被关掉了）；</li>
            <li><b>不重启</b>，把 <code>includeSessions: false</code> 改回 <code>true</code> 并保存；</li>
            <li>刷新浏览器，<code>sessions</code> 字段回来了——热更新生效。</li>
          </ol>
          <div class="expected"><pre><code>// includeSessions: false 时访问：
{"uptimeMs":123456,"jobs":{"running":1,"completed":8,"failed":1,"total":10},"ts":1753057800000}

// 改回 true 后（不重启），刷新：
{"uptimeMs":123456,"jobs":{...},"sessions":3,"ts":1753057800000}</code></pre></div>

          <div class="box note">
            <div class="box-title"><i class="fa-solid fa-circle-info"></i> 仪表盘进阶方向</div>
            <p>这个插件很自然地可以长大：加 /status-panel/plugins 列出插件树、加 /status-panel/errors 复用 error-logger 的思路、甚至给 client half 画一个可视化仪表盘页面。完成三个项目后，选一个方向自己试试。</p>
          </div>

          <h3>📦 附：最终版完整三文件（做完本步的状态，点开可复制）</h3>
          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：status-panel-plugin/package.json</summary>
            <pre><code>{
  "name": "status-panel",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.mjs",
  "exports": {
    ".": "./lib/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  },
  "dependencies": {
    "schemastery": "^3.18.0"
  }
}</code></pre>
          </details>
          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：status-panel-plugin/cordis.patch.yml</summary>
            <pre><code># status-panel bundle patch：向 web 组合挂载本插件
- insert:
    - id: status-panel
      name: status-panel</code></pre>
          </details>
          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：status-panel-plugin/lib/index.mjs</summary>
            <pre><code>import { Schema } from "schemastery"

export const name = "status-panel"
export const inject = ["webServer", "jobs", "sessions", "settings"]

const CONFIG_SCHEMA = Schema.object({
  includeJobs: Schema.boolean().default(true),
  includeSessions: Schema.boolean().default(true),
})

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return
  const jobs = ctx.get("jobs")
  const sessions = ctx.get("sessions")

  const settings = ctx.get("settings")
  let config = { includeJobs: true, includeSessions: true }
  if (settings && typeof settings.register === "function") {
    try {
      const scope = settings.register("status-panel", CONFIG_SCHEMA, {
        applies: "live",
      })
      config = scope.get()
      scope.watch((next) => {
        config = next
      })
    } catch {
      // register 失败 → 保持默认值
    }
  }

  ctx.effect(() => {
    const dispose = webServer.register({
      kind: "exact",
      path: "/status-panel/status",
      handler: async (req, res) => {
        const out = {
          uptimeMs: Math.round(process.uptime() * 1000),
          ts: Date.now(),
        }

        if (config.includeJobs) {
          const jobList = []
          if (jobs && typeof jobs.list === "function") {
            try { jobList.push(...jobs.list()) } catch { /* 保持空 */ }
          }
          const counts = { running: 0, completed: 0, failed: 0 }
          for (const j of jobList) {
            if (j && j.status === "running") counts.running += 1
            else if (j && j.status === "completed") counts.completed += 1
            else if (j && j.status === "failed") counts.failed += 1
          }
          out.jobs = { ...counts, total: jobList.length }
        }

        if (config.includeSessions) {
          let sessionCount = 0
          if (sessions && typeof sessions.list === "function") {
            try { sessionCount = sessions.list().length } catch { sessionCount = 0 }
          }
          out.sessions = sessionCount
        }

        res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
        res.end(JSON.stringify(out))
      },
    })
    return () => dispose?.()
  }, "status-panel: 状态路由")
}</code></pre>
          </details>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（20 分钟）</div>
            <p>给状态面板加一个 <code>label: string</code> 配置（默认 "dsh"），让返回的 JSON 多一个 <code>label</code> 字段。走通「改 settings.yaml → 不用重启 → 结果变化」全流程。</p>
          </div>
        `,
      },
    ],
    quiz: [
      {
        q: "状态面板的数据来源是哪两个服务？",
        options: ["jobs 和 sessions", "webServer 和 settings", "bash 和 fs", "agent 和 model"],
        answer: 0,
        explain: "jobs.list() 给任务快照，sessions.list() 给会话列表。",
      },
      {
        q: "jobs.list() 返回的是什么？",
        options: ["一个数字", "任务快照数组（每个含 status 字段）", "一段 HTML", "一个文件路径"],
        answer: 1,
        explain: "返回快照数组；whale-girl 的 collectTasks 就是用它统计任务。",
      },
      {
        q: "如果装在 headless 档案里，sessions 服务缺失，接口会怎样？",
        options: ["整个插件崩溃", "sessions 字段输出 0，其余正常（安全降级）", "接口 500", "插件拒绝启动"],
        answer: 1,
        explain: "判空 + try/catch 保证服务缺失时插件照常跑——防御式编程。",
      },
      {
        q: "includeSessions: false 后，返回 JSON 里 sessions 字段消失了，为什么？",
        options: ["服务坏了", "handler 读配置，跳过该统计", "浏览器缓存", "需要重启"],
        answer: 1,
        explain: "handler 里 if (config.includeSessions) 决定要不要算——配置是开关。",
      },
      {
        q: "读服务端状态（任务/会话）的插件为什么必须挂 Node 端？",
        options: ["浏览器跑得快", "jobs/sessions 服务只在服务端存在", "Node 端代码更短", "为了省电"],
        answer: 1,
        explain: "client 端（浏览器）拿不到这些服务，只能 fetch 服务端开好的接口。",
      },
    ],
  },

  /* ==================================================
     ③ 错误记录器 error-logger —— 飞行记录仪
     ================================================== */
  {
    id: "error-logger",
    name: "错误记录器 error-logger",
    icon: "fa-box-archive",
    desc: "记录 LLM 请求错误与任务失败的「飞行记录仪」",
    difficulty: "入门",
    minutes: "约 2 小时",
    steps: [
      {
        id: "design",
        title: "设计",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>完成设计三问 + 接口设计 + 数据设计，画出目录规划。（通用三问套路见 <a href="#/s3-0">3.0 方法论</a>）</p>
            </div>
          </div>

          <h3>需求：错误记录器（error-logger）</h3>
          <p>用 DSH 的人都有这种经历：模型请求偶尔失败（网络抖动、限流、超时），<b>错误信息在日志里一闪而过</b>；后台任务失败了也没有地方回看。我们做一个「飞行记录仪」插件 <code>error-logger</code>：<b>自动记录本次运行中发生的错误，随时可以查询</b>。装完当天你自己就在用它。</p>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：行车记录仪 / 飞机黑匣子</div>
            <p>平时安静地记录，不打扰任何人；出事之后可以「回放」——刚才发生了什么、几次、多久之前。</p>
          </div>

          <h3>设计三问</h3>
          <table>
            <thead><tr><th>问题</th><th>我们的答案</th><th>为什么</th></tr></thead>
            <tbody>
              <tr><td>① 提供什么能力？</td><td>自动记录错误 + 两个查询接口</td><td>实用、可验证</td></tr>
              <tr><td>② 挂在 Node 端还是 client 端？</td><td>Node 端（服务端）</td><td>要监听服务端事件 + 开 HTTP 路由</td></tr>
              <tr><td>③ 需要哪些配置？</td><td>第一版一个都不要</td><td>保持最简，第 5 步再加</td></tr>
            </tbody>
          </table>

          <h3>它要听哪两类「失败」？</h3>
          <ol class="steps">
            <li><b>请求错误</b>：模型 API 请求出错时，DSH 会广播 <code>agent/request-error</code> 事件——用 <code>ctx.on</code> 订阅它（<b>2.3 课学的事件概念，本实战第一次真正用到</b>）；</li>
            <li><b>任务失败</b>：后台任务失败时，<code>jobs</code> 服务的 <code>onJobDone</code> 会回调，<code>snapshot.status === "failed"</code> 就是失败。</li>
          </ol>
          <p>好消息：这两个 API 都是 whale-girl 源码里真实使用过的（它的 <code>lib/index.mjs</code> 订阅了同一个事件），写的时候可以随时对照参考。</p>

          <h3>接口设计</h3>
          <pre><code># ① 最近错误列表（最新的排最前）
GET /error-logger/errors

# ② 健康摘要：运行时长 + 最近 5 分钟错误数 + 累计
GET /error-logger/health</code></pre>
          <div class="expected"><pre><code>// GET /error-logger/errors 预期返回：
{
  "total": 2,
  "kept": 20,
  "errors": [
    { "ts": 1753057800000, "type": "task", "message": "任务失败：整理文件" },
    { "ts": 1753057200000, "type": "request", "message": "请求超时" }
  ]
}</code></pre></div>
          <p>路径直接带插件名前缀（<code>/error-logger/...</code>）——所有插件共享同一个 webServer，带前缀是插件间的「让路」礼仪。</p>

          <h3>数据设计：内存环形缓冲</h3>
          <p>v1 版把错误记在<b>内存数组</b>里：新错误 <code>push</code> 进队尾，超过 20 条就从队头 <code>shift</code> 掉最旧的（所以叫「环形缓冲」）。重启会清零——黑匣子记的是「本次航班」，这是特性不是 bug（持久化留作以后的作品）。</p>

          <h3>目录规划</h3>
          <pre><code>error-logger-plugin/
├── package.json        # 身份证 + dsh.bundle.patch 声明
├── cordis.patch.yml    # 补丁：insert 插件
└── lib/
    └── index.mjs       # 插件本体（Node half）</code></pre>

          <div class="box note">
            <div class="box-title"><i class="fa-solid fa-circle-info"></i> 为什么不写 client half？</div>
            <p>我们的「界面」就是两个 JSON 接口，浏览器直接访问即可，不需要网页渲染。不写 client half 就少了 dsh.client 字段和整个 lib/client 目录——最小即最好。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
            <p>创建 <code>error-logger-plugin/</code> 文件夹，并画出「输入 → 处理 → 输出」图：<br>输入 = 错误事件（request-error 事件 + 任务失败回调）；<br>处理 = 记入环形缓冲 + 计数；<br>输出 = 两个查询接口。</p>
          </div>
        `,
      },
      {
        id: "skeleton",
        title: "搭骨架",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>写出 bundle 插件的 package.json 和 cordis.patch.yml；了解 index.mjs 的占位写法。验收标准：空壳装上能启动。</p>
            </div>
          </div>

          <h3>① 写 package.json（身份证）</h3>
          <p>在 <code>error-logger-plugin/package.json</code> 写入：</p>
          <pre><code>{
  "name": "error-logger",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.mjs",
  "exports": {
    ".": "./lib/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  }
}</code></pre>
          <ul>
            <li><code>type: "module"</code>：整个包按 ESM 处理，index.mjs 里才能写 import/export；</li>
            <li><code>main</code> / <code>exports</code>：告诉 Node「入口在 lib/index.mjs」；</li>
            <li><code>dsh.bundle.patch</code>：★ <b>身份证明</b>——DSH 靠它知道这是个 bundle 插件；</li>
            <li>没有 <code>dsh.client</code> 字段：我们不写网页端，纯 Node 插件。</li>
          </ul>

          <h3>② 写 cordis.patch.yml（报名）</h3>
          <p>在 <code>error-logger-plugin/cordis.patch.yml</code> 写入：</p>
          <pre><code># error-logger bundle patch：向 web 组合挂载本插件
- insert:
    - id: error-logger
      name: error-logger</code></pre>
          <p>和 whale-girl 的一模一样，只是换了名字。语法含义：「往最终插件树插入一个 id/name 为 error-logger 的插件实例」。</p>

          <h3>③ 写 index.mjs 占位版（先空着，能启动就行）</h3>
          <p>在 <code>error-logger-plugin/lib/index.mjs</code> 写入最小占位：</p>
          <pre><code>export const name = "error-logger"

export function apply(ctx) {
  // 下一步在这里监听事件、挂路由
  console.log("error-logger 已加载")
}</code></pre>
          <div class="expected"><pre><code>// 重启 dsh web 后，启动日志里会多一行：
error-logger 已加载</code></pre></div>
          <p>这个「空壳」阶段很重要：先确保<b>DSH 认识这个包、能装上、能启动</b>，再加功能。如果空壳都起不来，后面加代码只会更乱。</p>

          <div class="box warn">
            <div class="box-title"><i class="fa-solid fa-triangle-exclamation"></i> 占位版的坑</div>
            <p>① <code>apply</code> 里不能完全空着（留一行 console.log）；② 占位版也要 export name，否则 patch 里 insert 的 id 找不到对应插件，启动会报错。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>创建三个文件并逐字敲入上面内容（<b>别复制粘贴</b>——亲手敲一遍，你会记住字段名）。敲完后检查：三个文件的相对路径是不是和「目录规划」完全一致。</p>
          </div>
        `,
      },
      {
        id: "logic",
        title: "写逻辑",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>写出完整插件本体：订阅事件、监听任务失败、挂两个查询路由。这是全教程代码量最大的一步，值得逐行读懂。</p>
            </div>
          </div>

          <h3>完整代码（约 60 行）</h3>
          <p>把 <code>lib/index.mjs</code> 替换成：</p>
          <pre><code>export const name = "error-logger"
// 依赖：网页服务器（挂查询接口）+ 任务服务（听任务失败）
export const inject = ["webServer", "jobs"]

// ---- 内存错误记录（v1 不落盘，重启即清零——黑匣子记「本次航班」）----
const MAX_KEEP = 20
const errors = []      // 环形缓冲：最新在队尾，满了从队头丢最旧的
let totalCount = 0     // 本次运行累计错误数

function recordError(type, message) {
  errors.push({ ts: Date.now(), type, message })
  if (errors.length > MAX_KEEP) errors.shift()   // 超了就丢掉最旧的一条
  totalCount += 1
}

// 小助手：统一回 JSON
function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" })
  res.end(JSON.stringify(body))
}

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return
  const jobs = ctx.get("jobs")

  ctx.effect(() => {
    // DSH 的 Cordis 里，ctx.on / onJobDone / register 都返回「撤销函数」，
    // 收进 disposers 数组统一清理——whale-girl 源码同款模式，可对照它的 lib/index.mjs
    const disposers = [
      // 1. 事件：模型请求出错（whale-girl 也订阅这个事件）
      ctx.on("agent/request-error", (payload) => {
        const message = payload && typeof payload.message === "string"
          ? payload.message
          : "模型请求出错（无详情）"
        recordError("request", message)
      }),

      // 2. 任务失败（jobs 服务缺失时跳过，保证插件照常跑）
      jobs && typeof jobs.onJobDone === "function"
        ? jobs.onJobDone((snapshot) => {
            if (snapshot && snapshot.status === "failed") {
              recordError("task", snapshot.label ? "任务失败：" + snapshot.label : "任务失败")
            }
          })
        : null,

      // 3. 查询接口：最近错误（最新的排最前）
      webServer.register({
        kind: "exact",
        path: "/error-logger/errors",
        handler: async (req, res) => {
          json(res, 200, {
            total: totalCount,
            kept: MAX_KEEP,
            errors: errors.slice().reverse(),
          })
        },
      }),

      // 4. 健康摘要：运行时长 + 最近 5 分钟错误数 + 累计
      webServer.register({
        kind: "exact",
        path: "/error-logger/health",
        handler: async (req, res) => {
          const recent5m = errors.filter((e) => Date.now() - e.ts < 5 * 60 * 1000).length
          json(res, 200, {
            uptimeMs: Math.round(process.uptime() * 1000),
            total: totalCount,
            recent5m,
          })
        },
      }),
    ]

    return () => disposers.forEach((d) => d && d())
  }, "error-logger: 事件监听 + 查询路由")
}</code></pre>
          <div class="expected"><pre><code>// 访问 http://127.0.0.1:3080/error-logger/health：
{ "uptimeMs": 123456, "total": 0, "recent5m": 0 }

// 发生两次错误后访问 /error-logger/errors：
{
  "total": 2,
  "kept": 20,
  "errors": [
    { "ts": 1753057800000, "type": "task", "message": "任务失败：整理文件" },
    { "ts": 1753057200000, "type": "request", "message": "请求超时" }
  ]
}</code></pre></div>

          <h3>逐段拆解</h3>
          <table>
            <thead><tr><th>代码</th><th>含义</th></tr></thead>
            <tbody>
              <tr><td><code>export const inject = [...]</code></td><td>声明依赖的服务，DSH 会按依赖顺序启动插件</td></tr>
              <tr><td><code>ctx.get("webServer") / ctx.get("jobs")</code></td><td>拿服务。拿不到返回 undefined——判空后安全降级，插件照常跑</td></tr>
              <tr><td><code>errors.push(...) + shift()</code></td><td>环形缓冲：队尾进新、队头出旧。数组是最简单的数据结构，天然适合</td></tr>
              <tr><td><code>ctx.on("agent/request-error", 回调)</code></td><td>订阅全局广播。事件名是<b>字符串协议</b>——拼错不会报错，只会永远收不到</td></tr>
              <tr><td><code>payload.message</code> 判空</td><td>事件的 payload（附带数据）形状可能变：拿得到 message 就记，拿不到记时间戳。防御性思维是真实插件开发的日常</td></tr>
              <tr><td><code>jobs.onJobDone(回调)</code></td><td>任务结束（成功或失败）都会回调，我们只关心 <code>status === "failed"</code></td></tr>
              <tr><td><code>webServer.register({...})</code></td><td>挂路由：exact 精确匹配路径，handler 处理请求</td></tr>
              <tr><td><code>disposers 数组</code></td><td>ctx.on / onJobDone / register 的返回值都是「撤销函数」，统一收好，插件停用时逐个调用</td></tr>
              <tr><td><code>process.uptime()</code></td><td>Node 自带：进程已运行秒数。顺手用上标准库，不用自己写计时器</td></tr>
            </tbody>
          </table>

          <h3>三个补充知识点</h3>
          <p><b>① 事件名是字符串协议（重点）</b>：<code>"agent/request-error"</code> 不是代码里的变量名，而是 Harness 广播时用的「频道名」。想知道有哪些频道，去翻官方插件源码里所有 <code>ctx.on("...")</code> 和 <code>ctx.emit("...")</code> 的字符串。</p>
          <p><b>② DSH 的 ctx.on 返回撤销函数</b>：和标准 Cordis 略有不同——DSH 版本里 <code>ctx.on</code> 返回的是「退订函数」。whale-girl 源码正是把它们的返回值收进 <code>disposers</code> 数组、停用时逐个调用。跟着真实代码的写法走最稳。</p>
          <p><b>③ 环形缓冲的取舍</b>：<code>shift()</code> 在大数组上有点慢（要整体前移），但 20 条的量级完全无所谓。等以后要存一万条，再换「循环数组 + 头指针」——好插件先跑起来，再优化。</p>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：装主机核心 + 两只耳朵 + 两个窗口</div>
            <p>ctx.effect 接上「水电」（生命周期）；两个订阅是「耳朵」——办公室广播一响就记录；两个路由是「窗口」——随时可以查账本。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（20 分钟）</div>
            <p>亲手敲入上面代码。然后做一次「预言」：把 <code>"agent/request-error"</code> 多拼一个字母（比如 <code>"agent/request-errorr"</code>），会发生什么？<br>提示：回想本课的「事件名是字符串协议」。先写答案，下一步验证。</p>
          </div>
        `,
      },
      {
        id: "verify",
        title: "安装验证",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>把本地插件装进 web 档案，重启后接口可用；学会「测试记录法」验证错误记录逻辑——见证自己写的插件真正跑起来。</p>
            </div>
          </div>

          <h3>① 安装（file: 本地路径）</h3>
          <p>在终端里，cd 到 <code>error-logger-plugin</code> 的<b>上一级目录</b>，运行：</p>
          <pre><code>dsh plugin --profile web add file:./error-logger-plugin</code></pre>
          <ul>
            <li><code>file:</code> 前缀告诉 pnpm「这是本地目录」；</li>
            <li>命令会把包加进 web 档案的 dependencies 和 bundles 清单；</li>
            <li>装完可以去 <code>~/.dsh/profiles/web/package.json</code> 检查是否多了一项 <code>error-logger</code>。</li>
          </ul>

          <h3>② 重启 web</h3>
          <pre><code># 停掉旧实例（Ctrl+C，或按 2.5 课的方法清理端口占用）
dsh web</code></pre>
          <p>启动日志里应该能看到 <code>error-logger 已加载</code>（我们写的 console.log）。</p>

          <h3>③ 验证三连</h3>
          <p><b>验证一：确认进树</b></p>
          <pre><code>dsh --profile web --dump-config | Select-String error</code></pre>
          <div class="expected"><pre><code># == error-logger
- id: error-logger
  name: error-logger</code></pre></div>

          <p><b>验证二：访问接口</b>——浏览器打开：</p>
          <pre><code>http://127.0.0.1:3080/error-logger/health</code></pre>
          <div class="expected"><pre><code>{"uptimeMs":123456,"total":0,"recent5m":0}</code></pre></div>
          <p><code>total: 0</code> 很正常——我们还没触发过任何错误。接口通了就成功了一半。</p>

          <p><b>验证三：测试记录法（验证「耳朵」真的在听）</b></p>
          <p>错误事件只在真的出错时才广播，不方便现场制造。插件开发者的标准做法是<b>注入一条测试记录</b>：在 <code>apply</code> 里临时加一行，重启后访问 /errors 验证，再删掉：</p>
          <pre><code>export function apply(ctx) {
  recordError("demo", "这是一条测试记录")   // ← 临时加这行
  // ... 其余不动
}</code></pre>
          <div class="expected"><pre><code>// 重启后访问 /error-logger/errors：
{
  "total": 1,
  "kept": 20,
  "errors": [
    { "ts": 1753057800000, "type": "demo", "message": "这是一条测试记录" }
  ]
}</code></pre></div>
          <p>看到它，说明记录、缓冲、查询整条链路都是通的。验证完删掉这行再重启，恢复干净状态。</p>

          <p><b>验证四（预言题答案）</b>：上一步你把事件名拼错成 <code>agent/request-errorr</code> 的话，插件<b>不会报错</b>，一切正常——但真实请求出错时它一句也听不见。字符串协议没有编译器帮你检查，这就是为什么「对照源码抄事件名」如此重要。</p>

          <p><b>可选·真实触发</b>：想看到真错误入账，可以临时断开网络后向 AI 提问（触发 request-error），或跑一个注定失败的任务（触发 task）。注意事件是「本次运行」内的记录，重启会清零。</p>

          <h3>排错表</h3>
          <table>
            <thead><tr><th>症状</th><th>原因</th><th>处理</th></tr></thead>
            <tbody>
              <tr><td>启动报 <code>plugin tree failed to load</code></td><td>patch 里 id 和代码 export 的 name 对不上</td><td>核对两处拼写是否完全一致（error-logger）</td></tr>
              <tr><td>访问接口返回网页壳（HTML）</td><td>路由没注册上</td><td>看 dump-config 有没有进树；看日志有没有报错</td></tr>
              <tr><td>访问接口 500 错误</td><td>handler 代码报错</td><td>看启动终端日志里堆栈，多数是变量名写错</td></tr>
              <tr><td>改完代码没生效</td><td>Node 端改动要重启</td><td>重启 web</td></tr>
              <tr><td>接口正常但永远 total: 0</td><td>事件名拼错 / 没触发过错误</td><td>对照源码核对事件名；用「测试记录法」排查链路</td></tr>
            </tbody>
          </table>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：黑匣子开张</div>
            <p>装车（add）、通电（重启）、拉开窗口（访问接口）、往记录本里写一笔测试数据再查出来——整条链路跑通的那一刻，你就是它的制造者。这个瞬间值得截图留念。</p>
          </div>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
            <p>跑通后，故意把插件「改坏」一次——比如把 <code>recordError</code> 里的 <code>errors.push</code> 拼成 <code>errors.pus</code>——重启，观察触发错误时日志长什么样，再修回来。体验一次完整排错，比看十次教程有用。</p>
          </div>
        `,
      },
      {
        id: "config",
        title: "进阶配置",
        html: `
          <div class="lesson-goal">
            <i class="fa-solid fa-bullseye"></i>
            <div><b>本步目标</b>
              <p>用 Schema 声明配置，放进 settings.yaml，并体验「改配置不用重启」的热更新。</p>
            </div>
          </div>

          <h3>新需求</h3>
          <p>给错误记录器加两个配置：<code>keepLast</code>（最多保留多少条，默认 20）和 <code>watchWindowMs</code>（健康窗口：统计「最近多少毫秒内」的错误数，默认 5 分钟）。</p>

          <h3>① 用 schemastery 声明配置</h3>
          <p>whale-girl 用的就是 schemastery（记得它 package.json 里的依赖吗）。修改 <code>lib/index.mjs</code>：</p>
          <pre><code>import { Schema } from "schemastery"

export const name = "error-logger"
export const inject = ["webServer", "jobs", "settings"]

// 配置声明：keepLast 保留条数（1~200，默认 20）；watchWindowMs 健康窗口（默认 5 分钟）
const CONFIG_SCHEMA = Schema.object({
  keepLast: Schema.number().min(1).max(200).default(20),
  watchWindowMs: Schema.number().min(1000).default(5 * 60 * 1000),
})

// 内存错误记录（v1 不落盘，重启即清零）
const errors = []
let totalCount = 0
let config = { keepLast: 20, watchWindowMs: 5 * 60 * 1000 }

function recordError(type, message) {
  errors.push({ ts: Date.now(), type, message })
  if (errors.length > config.keepLast) errors.shift()   // 上限来自配置
  totalCount += 1
}

function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" })
  res.end(JSON.stringify(body))
}

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return
  const jobs = ctx.get("jobs")

  // 拿 settings 服务（web 档案有；缺失时回退默认值，保证插件照常跑）
  const settings = ctx.get("settings")
  if (settings && typeof settings.register === "function") {
    try {
      const scope = settings.register("error-logger", CONFIG_SCHEMA, {
        applies: "live",   // ★ 关键：允许热更新
      })
      config = scope.get()
      scope.watch((next) => {
        config = next      // 配置一变，立刻生效，无需重启
      })
    } catch {
      // register 失败（如重复注册）→ 保持默认值
    }
  }

  ctx.effect(() => {
    const disposers = [
      ctx.on("agent/request-error", (payload) => {
        const message = payload && typeof payload.message === "string"
          ? payload.message
          : "模型请求出错（无详情）"
        recordError("request", message)
      }),
      jobs && typeof jobs.onJobDone === "function"
        ? jobs.onJobDone((snapshot) => {
            if (snapshot && snapshot.status === "failed") {
              recordError("task", snapshot.label ? "任务失败：" + snapshot.label : "任务失败")
            }
          })
        : null,
      webServer.register({
        kind: "exact",
        path: "/error-logger/errors",
        handler: async (req, res) => {
          json(res, 200, {
            total: totalCount,
            kept: config.keepLast,                 // 读配置
            errors: errors.slice().reverse(),
          })
        },
      }),
      webServer.register({
        kind: "exact",
        path: "/error-logger/health",
        handler: async (req, res) => {
          const recent = errors.filter((e) => Date.now() - e.ts < config.watchWindowMs).length
          json(res, 200, {
            uptimeMs: Math.round(process.uptime() * 1000),
            total: totalCount,
            recent5m: recent,                      // 窗口来自配置
          })
        },
      }),
    ]
    return () => disposers.forEach((d) => d && d())
  }, "error-logger: 事件监听 + 查询路由")
}</code></pre>
          <p>改动要点：inject 增加 <code>settings</code>；声明 Schema；用 <code>register</code> 注册配置；<code>recordError</code> 和两个 handler 都改读 <code>config</code>。</p>

          <h3>② 在 settings.yaml 里写配置</h3>
          <p>编辑 <code>~/.dsh/settings.yaml</code>，加一段：</p>
          <pre><code>error-logger:
  keepLast: 50
  watchWindowMs: 300000   # 5 分钟 = 5 * 60 * 1000 毫秒</code></pre>

          <h3>③ 体验热更新</h3>
          <ol class="steps">
            <li>重启一次 web（让新代码和新配置加载）；</li>
            <li>访问 <code>/error-logger/errors</code>，看到 <code>"kept": 50</code>（来自配置）；</li>
            <li><b>不重启</b>，直接把 settings.yaml 里 <code>keepLast: 50</code> 改成 <code>keepLast: 5</code> 并保存；</li>
            <li>刷新浏览器，<code>"kept": 5</code>——这就是 <code>applies: "live"</code> + <code>scope.watch</code> 的威力；</li>
            <li>再注入几条测试记录，超过 5 条后观察最旧的被自动丢弃。</li>
          </ol>
          <div class="expected"><pre><code>// keepLast: 50 时访问 /error-logger/errors：
{ "total": 3, "kept": 50, "errors": [...] }

// 改成 keepLast: 5 并保存 settings.yaml，不用重启，刷新后：
{ "total": 3, "kept": 5, "errors": [...] }</code></pre></div>

          <div class="box metaphor">
            <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：给设备加旋钮</div>
            <p>Schema 是「说明书：本设备有保留条数和窗口两个旋钮」；settings.yaml 是「你把旋钮拧到哪」；<code>applies: live</code> 是「这台设备支持带电调」——拧旋钮不用拆机。</p>
          </div>

          <div class="box note">
            <div class="box-title"><i class="fa-solid fa-circle-info"></i> 热更新 vs 冷更新</div>
            <p><code>applies: "live"</code> = 热更新（改配置即时生效）；不写或写别的值，可能变成「重启后生效」。还有 <code>validate</code> 回调可以做类型/范围校验——whale-girl 的 <code>buildSchema</code> 就是这么干的，你可以去翻它的 <code>src/config.mjs</code> 对照。</p>
          </div>

          <h3>📦 附：最终版完整三文件（做完本步的状态，点开可复制）</h3>
          <p>做完本步的最终状态。逐段对照你的文件，不一致的地方往往就是 bug 所在。</p>

          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：error-logger-plugin/package.json</summary>
            <pre><code>{
  "name": "error-logger",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.mjs",
  "exports": {
    ".": "./lib/index.mjs",
    "./cordis.patch.yml": "./cordis.patch.yml",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  },
  "dependencies": {
    "schemastery": "^3.18.0"
  }
}</code></pre>
          </details>

          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：error-logger-plugin/cordis.patch.yml</summary>
            <pre><code># error-logger bundle patch：向 web 组合挂载本插件
- insert:
    - id: error-logger
      name: error-logger</code></pre>
          </details>

          <details class="file-box">
            <summary><i class="fa-solid fa-file-code"></i> 完整文件：error-logger-plugin/lib/index.mjs</summary>
            <pre><code>import { Schema } from "schemastery"

export const name = "error-logger"
export const inject = ["webServer", "jobs", "settings"]

const CONFIG_SCHEMA = Schema.object({
  keepLast: Schema.number().min(1).max(200).default(20),
  watchWindowMs: Schema.number().min(1000).default(5 * 60 * 1000),
})

const errors = []
let totalCount = 0
let config = { keepLast: 20, watchWindowMs: 5 * 60 * 1000 }

function recordError(type, message) {
  errors.push({ ts: Date.now(), type, message })
  if (errors.length > config.keepLast) errors.shift()
  totalCount += 1
}

function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" })
  res.end(JSON.stringify(body))
}

export function apply(ctx) {
  const webServer = ctx.get("webServer")
  if (!webServer) return
  const jobs = ctx.get("jobs")

  const settings = ctx.get("settings")
  if (settings && typeof settings.register === "function") {
    try {
      const scope = settings.register("error-logger", CONFIG_SCHEMA, {
        applies: "live",
      })
      config = scope.get()
      scope.watch((next) => {
        config = next
      })
    } catch {
      // register 失败 → 保持默认值
    }
  }

  ctx.effect(() => {
    const disposers = [
      ctx.on("agent/request-error", (payload) => {
        const message = payload && typeof payload.message === "string"
          ? payload.message
          : "模型请求出错（无详情）"
        recordError("request", message)
      }),
      jobs && typeof jobs.onJobDone === "function"
        ? jobs.onJobDone((snapshot) => {
            if (snapshot && snapshot.status === "failed") {
              recordError("task", snapshot.label ? "任务失败：" + snapshot.label : "任务失败")
            }
          })
        : null,
      webServer.register({
        kind: "exact",
        path: "/error-logger/errors",
        handler: async (req, res) => {
          json(res, 200, {
            total: totalCount,
            kept: config.keepLast,
            errors: errors.slice().reverse(),
          })
        },
      }),
      webServer.register({
        kind: "exact",
        path: "/error-logger/health",
        handler: async (req, res) => {
          const recent = errors.filter((e) => Date.now() - e.ts < config.watchWindowMs).length
          json(res, 200, {
            uptimeMs: Math.round(process.uptime() * 1000),
            total: totalCount,
            recent5m: recent,
          })
        },
      }),
    ]
    return () => disposers.forEach((d) => d && d())
  }, "error-logger: 事件监听 + 查询路由")
}</code></pre>
          </details>

          <div class="practice">
            <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（20 分钟）</div>
            <p>给插件再加一个配置 <code>maxMessageLen: number</code>（默认 200）：<code>recordError</code> 时把超长的 message 截断（提示：字符串的 <code>.slice(0, n)</code>）。走通「改 settings.yaml → 不用重启 → 结果变化」全流程。</p>
          </div>
        `,
      },
    ],
    quiz: [
      {
        q: "error-logger 挂在 Node 端而不是 client 端，根本原因是？",
        options: ["浏览器不能解析 JSON", "要监听服务端事件 + 开 HTTP 路由", "client 端代码更长", "随意选的"],
        answer: 1,
        explain: "事件（agent/request-error）和路由都是服务端能力，client 端只能 fetch 别人开好的接口。",
      },
      {
        q: "把事件名拼错（如 agent/request-errorr）会怎样？",
        options: ["启动直接报错", "不报错，但永远收不到事件（静默失效）", "自动纠正", "服务器崩溃"],
        answer: 1,
        explain: "事件名是字符串协议，没有编译检查——拼错只会在你需要时「听不见」。",
      },
      {
        q: "disposers 数组的作用是？",
        options: ["存放配置项", "收集各订阅/路由的撤销函数，插件停用时统一清理", "缓存错误记录", "按顺序启动插件"],
        answer: 1,
        explain: "ctx.on / onJobDone / register 都返回撤销函数，收进数组、停用时逐个调用——whale-girl 同款模式。",
      },
      {
        q: "想验证「事件订阅」真的在工作，但错误又不好现场制造，标准做法是？",
        options: ["等一个月看运气", "临时加一行 recordError 测试记录，验证后删掉", "改事件名", "放弃验证"],
        answer: 1,
        explain: "「测试记录法」：注入一条假记录验证整条链路，验证完恢复干净。",
      },
      {
        q: "想让 keepLast 改了 settings.yaml 不用重启就生效，关键配置是？",
        options: ["applies: \"live\" + scope.watch", "写进 package.json", "手动 reload 页面", "重启电脑"],
        answer: 0,
        explain: "applies: \"live\" 开启热更新，scope.watch 在配置变化时拿到新值。",
      },
    ],
  },
]
