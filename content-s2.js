/* ============================================================
   阶段二 · 核心入门 —— 课程内容（5 课）
   走进插件内部：看懂它由哪些部分组成
   ============================================================ */
window.COURSE_S2 = [
  {
    id: "s2-1",
    no: "2.1",
    title: "JavaScript / ESM 基础（够用版）",
    minutes: "约 60 分钟",
    stage: "阶段二 · 核心入门",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>这是全教程唯一的「语言基础课」：能读懂插件里的变量、函数、条件、循环、回调、async/await 和 import/export，并写出能运行的小程序。<b>不需要学 TypeScript</b>——那是阶段四的事。</p>
        </div>
      </div>

      <h3>JavaScript 和 Node.js 是什么关系</h3>
      <p><b>JavaScript（JS）</b>是网页和服务器通用的编程语言。<b>Node.js</b>是一个「能在电脑上直接运行 JS 的程序」——DSH 整个就是建在 Node.js 之上的，插件用的就是 JS。</p>
      <p>运行 JS 的方法：把代码存进文件，用 <code>node 文件名</code> 执行。</p>

      <h3>一、变量与基本类型</h3>
      <pre><code>const name = "鲸鱼娘"     // 字符串：文字
const size = 110          // 数字
const enabled = true      // 布尔：真/假
let count = 0             // let = 以后可以改；const = 不能改

count = count + 1         // let 变量可以重新赋值
console.log(name, size, count)</code></pre>
      <div class="expected"><pre><code>鲸鱼娘 110 1</code></pre></div>
      <p><code>console.log(...)</code> 是「打印到终端」——调试全靠它，就像探险时的标记笔。</p>

      <h3>二、条件判断：if / else</h3>
      <pre><code>const score = 85

if (score >= 60) {
  console.log("及格")
} else {
  console.log("不及格")
}</code></pre>
      <div class="expected"><pre><code>及格</code></pre></div>
      <p>注意 <code>===</code>（严格相等）和 <code>&gt;=</code>（大于等于）这类比较符——插件里到处是 <code>if (webServer !== undefined)</code> 这样的判断。</p>

      <h3>三、循环：for...of</h3>
      <pre><code>const states = ["idle", "eat", "sleep"]

for (const s of states) {
  console.log("状态：" + s)
}</code></pre>
      <div class="expected"><pre><code>状态：idle
状态：eat
状态：sleep</code></pre></div>
      <p>读插件代码时，看到 for...of 就知道它在「把列表里的东西逐个处理一遍」。</p>

      <h3>四、函数：加工机器</h3>
      <pre><code>function add(a, b) {
  return a + b        // return = 把结果交出去
}

console.log(add(1, 2))

// 箭头函数：更短写法，插件里最常见
const double = (x) => x * 2
console.log(double(21))</code></pre>
      <div class="expected"><pre><code>3
42</code></pre></div>

      <h3>五、对象与数组：装东西的盒子</h3>
      <pre><code>const config = {
  enabled: true,
  size: 110,
}
console.log(config.enabled)      // 用「点」取对象里的值
console.log(config["size"])      // 也可以这样取

const states = ["idle", "eat"]   // 数组用下标取，从 0 开始
console.log(states[0])</code></pre>
      <div class="expected"><pre><code>true
110
idle</code></pre></div>
      <p>插件天天在干这件事：从配置对象里取值、遍历任务列表。</p>

      <h3>六、回调与异步：等一个慢动作</h3>
      <p>读文件、发网络请求都要「等一会儿」才有结果。JS 的老办法是<b>回调函数</b>（把「拿到结果后要干什么」包成函数传进去）：</p>
      <pre><code>setTimeout(() => {
  console.log("3 秒后执行我")
}, 3000)
console.log("先执行我")</code></pre>
      <div class="expected"><pre><code>先执行我
（3 秒后）3 秒后执行我</code></pre></div>
      <p>新办法更清爽：<code>async</code> 声明「这是会等待的函数」，<code>await</code> 表示「停下来等结果」：</p>
      <pre><code>async function fetchErrors() {
  const res = await fetch("http://127.0.0.1:3080/error-logger/health")
  const data = await res.json()   // 等 JSON 解析完
  return data.total
}</code></pre>
      <p>插件代码里几乎到处是 async/await——因为插件天天在等「文件读完了」「请求回来了」。看懂这两行，插件代码就能看懂一半。</p>

      <h3>七、错误处理：try / catch</h3>
      <pre><code>try {
  JSON.parse("这不是合法 JSON")
} catch (err) {
  console.log("出错了，但不崩溃：" + err.message)
}</code></pre>
      <div class="expected"><pre><code>出错了，但不崩溃：Unexpected token ...（具体信息因环境而异）</code></pre></div>
      <p>whale-girl 里到处是 try/catch——写插件要学它：<b>出了问题别让整个服务崩掉</b>，接住错误、记录日志、继续服务。</p>

      <h3>八、模块（ESM）：把代码拆成文件再拼起来</h3>
      <p>一个大程序拆成很多小文件，每个文件是「一个模块」。模块之间用两个词交流：</p>
      <pre><code>// 文件 A：math.mjs —— 负责「交出去」
export function add(a, b) {
  return a + b
}

// 文件 B：main.mjs —— 负责「拿进来用」
import { add } from "./math.mjs"

console.log(add(1, 2))</code></pre>
      <div class="expected"><pre><code>3</code></pre></div>
      <p>这种「import / export」的官方标准写法就叫 <b>ESM（ECMAScript Modules）</b>。</p>
      <ul>
        <li>文件后缀 <code>.mjs</code> = 明确告诉 Node「这是 ESM 文件」；</li>
        <li>或者在整个包的 <code>package.json</code> 里写 <code>"type": "module"</code>，那所有 .js 都按 ESM 处理（whale-girl 就是这么干的）。</li>
      </ul>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：积木的接口标准</div>
        <p>只有接口统一（export 的形状、import 的写法和别人一致），不同人写的积木（模块）才能互相拼。ESM 就是全世界的积木厂商都遵守的接口标准。</p>
      </div>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 学到什么程度算够？</div>
        <p>不用学框架、不用学 TypeScript、不用背 API。能<b>看懂</b>插件里的 import/export/async/await、能<b>改</b>小例子即可。写不出来的部分查文档就行，没人要求你背下来。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
        <p>写一个 <code>greet.mjs</code>：<br>
        ① 定义数组 <code>names = ["小明", "小红"]</code>；<br>
        ② 用 for...of 循环，对每个人输出「你好，&lt;名字&gt;」；<br>
        ③ 把输出逻辑抽成一个 <code>greet(name)</code> 函数并用 export 导出；<br>
        ④ 再写 <code>main.mjs</code> import 它、调用两次；<br>
        ⑤ 用 <code>node main.mjs</code> 跑通。哪一步报错就在哪一步学会排错——这正是写插件的日常。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>插件 = 一堆 ESM 模块。八件套：变量、if/else、for...of、函数（含箭头函数）、对象/数组取值、回调、async/await、try/catch。加上 import/export，就是写插件的全部语言底子。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "ESM 模块之间交流靠哪两个关键词？",
        options: ["import / export", "get / set", "open / close", "save / load"],
        answer: 0,
        explain: "import 拿进来、export 交出去——ESM 模块的全部交流方式。",
      },
      {
        q: "文件后缀 .mjs（或 package.json 写 \"type\": \"module\"）表示什么？",
        options: ["这是压缩过的文件", "这是按 ESM 模块标准处理的文件", "这是图片文件", "这是加密文件"],
        answer: 1,
        explain: "两者都是「按 ESM 处理」的声明方式，二选一即可。",
      },
      {
        q: "async 函数里的 await 是什么意思？",
        options: ["停止程序", "等待异步操作的结果再继续", "报错", "跳过后面的代码"],
        answer: 1,
        explain: "await = 在这里等一下，等那个「慢动作」（请求/读文件）出结果再继续。",
      },
    ],
  },

  {
    id: "s2-2",
    no: "2.2",
    title: "YAML 配置基础",
    minutes: "约 25 分钟",
    stage: "阶段二 · 核心入门",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能读懂并写出 cordis.yml / settings.yaml 这类配置文件；知道缩进的意义和常见陷阱。</p>
        </div>
      </div>

      <h3>YAML 是给人看的配置格式</h3>
      <p>YAML（读作「呀么哦」，全称 YAML Ain't Markup Language）是一种<b>给人类看的配置格式</b>：用缩进表示层级，几乎不用括号。DSH 里到处是它：<code>cordis.yml</code>（组装结果）、<code>settings.yaml</code>（用户设置）、插件的 <code>cordis.patch.yml</code>（补丁）。</p>

      <h3>三种基本结构</h3>
      <pre><code># 1. 键值对： 键: 值（注意冒号后必须有一个空格）
name: 鲸鱼娘

# 2. 嵌套：缩进表示父子关系（用两个空格，别用 Tab）
pet:
  enabled: true
  size: 110

# 3. 列表：以 - 开头
states:
  - idle
  - eat
  - sleep</code></pre>
      <div class="expected"><pre><code>// 上面这段 YAML 解析后等于这个 JS 对象：
{
  name: "鲸鱼娘",
  pet: { enabled: true, size: 110 },
  states: ["idle", "eat", "sleep"],
}</code></pre></div>

      <h3>和 JSON 对照着看</h3>
      <table>
        <thead><tr><th>JSON</th><th>YAML（等价）</th></tr></thead>
        <tbody>
          <tr><td><code>{"name": "鲸鱼娘"}</code></td><td><code>name: 鲸鱼娘</code></td></tr>
          <tr><td><code>{"pet": {"size": 110}}</code></td><td><pre>pet:<br>  size: 110</pre></td></tr>
          <tr><td><code>["idle","eat"]</code></td><td><pre>- idle<br>- eat</pre></td></tr>
        </tbody>
      </table>

      <h3>什么时候要给值加引号</h3>
      <ul>
        <li>值里含 <code>: </code>（冒号加空格）时，例如 <code>time: "12:30"</code>；</li>
        <li>值以 <code>#</code> 开头会被当成注释，想要字面量就加引号：<code>tag: "#hot"</code>；</li>
        <li>想让「0123」这种保持字符串而不是数字时。</li>
      </ul>

      <h3>真实例子：whale-girl 的设置</h3>
      <p>whale-girl 的配置写在 <code>~/.dsh/settings.yaml</code>（全局设置文件）里，长这样：</p>
      <pre><code># 全局用户设置（DSH 主目录下）
whale-girl:
  enabled: true
  size: 110          # 64 ~ 160
  opacity: 1.0
  walk:
    enabled: true
  sleepAfterMs: 120000</code></pre>
      <p>这段配置会被 whale-girl 的 Node 端读取（通过 settings 服务），并且<b>改完不用重启</b>——热更新（第 3.5 课会自己实现一次）。</p>

      <div class="box warn">
        <div class="box-title"><i class="fa-solid fa-triangle-exclamation"></i> 两大新手陷阱</div>
        <p>① 缩进必须一致，<b>不能用 Tab</b>（很多编辑器会把 Tab 显示成 8 个空格，解析器直接报错）；<br>② 冒号后面<b>必须有空格</b>，否则整行会被当成一个普通字符串。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
        <p>手写一个 <code>error-logger.yaml</code>（给第 3.5 课的插件预演）：包含 <code>keepLast: 20</code> 和 <code>watchWindowMs: 300000</code> 两个字段，用缩进表达层级。写完后试着把冒号后空格去掉，观察报错——把坑踩一遍就不会再踩。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>YAML = 缩进表示层级、<code>-</code> 表示列表、<code>#</code> 表示注释。记住两条铁律：不用 Tab、冒号后留空格。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "YAML 用什么表示「父子层级」？",
        options: ["大括号", "缩进（空格）", "分号", "逗号"],
        answer: 1,
        explain: "YAML 用缩进表示层级——这就是为什么「不能用 Tab、空格要一致」。",
      },
      {
        q: "YAML 的列表（数组）用什么符号开头？",
        options: ["*", "#", "-", "="],
        answer: 2,
        explain: "列表项以「- 」开头，如 - idle、- eat。",
      },
      {
        q: "下面哪条是 YAML 的硬性规则？",
        options: ["缩进必须用 Tab", "冒号后必须有一个空格", "键必须加双引号", "文件必须叫 .json"],
        answer: 1,
        explain: "冒号后必须有空格，否则「name:鲸鱼娘」会被当成一个字符串。",
      },
    ],
  },

  {
    id: "s2-3",
    no: "2.3",
    title: "Cordis 插件框架核心概念（重点）",
    minutes: "约 45 分钟",
    stage: "阶段二 · 核心入门",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能说出 Context / Service / Schema / 事件 各管什么；能读懂一个最小插件的代码骨架。这是全课程最重要的一课，值得反复看。</p>
        </div>
      </div>

      <h3>Cordis 是什么</h3>
      <p><b>Cordis</b> 是一个开源插件框架（和 Koishi 机器人框架同源），DSH 用它组织<b>所有</b>功能。装进 DSH 的每个插件，本质上都是「一个 Cordis 插件」。想开发 DSH 插件，核心就是学会 Cordis 的四个词。</p>

      <h3>四个词，一个比喻搞定</h3>
      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：一个工位</div>
        <ul>
          <li><b>Context（上下文）</b>＝工位本身：水电、使用期限、拆装规则。插件的一切都发生在这个上下文里。</li>
          <li><b>Service（服务）</b>＝共享工具间：打印机（文件）、电话（网络）、总闸（webServer）……谁都能登记使用。</li>
          <li><b>Schema（配置声明）</b>＝设备说明书：声明「我支持哪些旋钮、默认值多少」。</li>
          <li><b>事件（Event）</b>＝办公室广播：「午餐到了！」——想听的部门各自行动。</li>
        </ul>
      </div>

      <h3>① Context（上下文）</h3>
      <p>每个插件导出一个 <code>apply(ctx)</code> 函数，DSH 启动时调用它，把 <code>ctx</code>（这个插件的「上下文」）交给插件。插件用 <code>ctx.effect(fn, 标签)</code> 注册「要长期活着的事」，并返回一个清理函数（插件被停用时执行）：</p>
      <pre><code>export const name = "my-plugin"

export function apply(ctx) {
  ctx.effect(() => {
    console.log("插件启动了")
    return () => console.log("插件被停用了")
  }, "my-plugin: 生命周期演示")
}</code></pre>
      <div class="expected"><pre><code>插件启动了
（之后卸载/停用插件时）插件被停用了</code></pre></div>

      <h3>② Service（服务）—— 插件间借用的设施</h3>
      <p>插件之间不直接认识，而是通过「服务名」互相借用。whale-girl 里真实出现的例子：</p>
      <pre><code>// 拿（消费）别人提供的服务
const webServer = ctx.get("webServer")   // 网页服务器
const jobs = ctx.get("jobs")             // 后台任务服务
const settings = ctx.get("settings")     // 用户设置服务

// 给（提供）别人用的服务
ctx.provide("whale-girl.pet", {
  snapshot: () => ({ pet: state }),
  onSignal: (fn) => signals.subscribe(fn),
})</code></pre>
      <p>插件声明自己需要哪些服务：用 <code>export const inject = ["webServer", "jobs", "sessions", "settings"]</code>（whale-girl 第一行就这么写的）。服务缺失时插件要学会「安全降级」——whale-girl 里所有 <code>ctx.get</code> 都判了空。</p>

      <h3>③ Schema（配置声明）</h3>
      <p>用 schemastery（DSH 的配置库）声明插件接受的配置：</p>
      <pre><code>import { Schema } from "schemastery"

export const config = Schema.object({
  enabled: Schema.boolean().default(true),
  size: Schema.number().min(64).max(160).default(110),
})</code></pre>
      <p>声明后，用户就可以在 <code>settings.yaml</code> 里写值，DSH 会校验类型、套默认值，再交给插件（第 3.5 课亲手实现一次）。</p>

      <h3>④ 事件（Event）—— 全局广播</h3>
      <p>Harness 运行时不断发出事件，插件用 <code>ctx.on</code> 订阅。whale-girl 里真实的订阅：</p>
      <pre><code>ctx.on("agent/session-start", (payload) => {
  // 新会话开始 → 宠物欢迎
})
ctx.on("session/event", (session, event) => {
  // 会话里发生了一步 → 宠物思考/庆祝
})
ctx.jobs.onJobDone((snapshot) => {
  // 任务完成/失败 → 记 XP、开庆祝动画
})</code></pre>
      <p>事件名是字符串协议——想知道有哪些事件可以发，去翻官方插件源码（<code>ctx.on</code> 后面的名字）和文档。</p>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 学这课的正确姿势</div>
        <p>别背 API。打开 whale-girl 的 <code>lib/index.mjs</code>（在你的 <code>~/.dsh/profiles/web/node_modules/whale-girl/lib/</code> 下），对照上面的代码找「原型」：<code>ctx.effect</code>、<code>ctx.get</code>、<code>ctx.provide</code>、<code>ctx.on</code> 各在哪一行、怎么用的。跟着真实代码学，比看文档快十倍。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
        <p>打开 whale-girl 的 <code>lib/index.mjs</code>，用搜索（Ctrl+F）分别找出：<br>① <code>export const name</code> 的值；② <code>export const inject</code> 列了哪几个服务；③ 至少一处 <code>ctx.effect</code>、<code>ctx.get</code>、<code>ctx.provide</code>、<code>ctx.on</code>。把这 5 行复制进你的笔记。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>Cordis 四词：Context（上下文，apply 入口）、Service（服务，ctx.get/ctx.provide + inject 声明）、Schema（配置声明）、事件（ctx.on 订阅广播）。DSH 插件 = 一个 Cordis 插件。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "每个 Cordis 插件的入口函数叫什么？",
        options: ["main()", "start()", "apply(ctx)", "init()"],
        answer: 2,
        explain: "export function apply(ctx)：DSH 启动时调用它，ctx 是插件获得的上下文。",
      },
      {
        q: "插件想用「网页服务器」这个公用设施，应该怎么写？",
        options: ["import webServer from \"ds\"", "ctx.get(\"webServer\")", "new WebServer()", "require(\"webServer\")"],
        answer: 1,
        explain: "ctx.get(\"服务名\") 是消费服务的标准姿势；拿不到时返回 undefined，要判空降级。",
      },
      {
        q: "ctx.provide(\"whale-girl.pet\", {...}) 是在做什么？",
        options: ["消费一个服务", "把自己的能力开放成服务给别人用", "删除一个服务", "启动一个进程"],
        answer: 1,
        explain: "provide = 提供/注册服务。get 是拿来用，provide 是给出去。",
      },
    ],
  },

  {
    id: "s2-4",
    no: "2.4",
    title: "解剖一个真实插件（whale-girl）",
    minutes: "约 40 分钟",
    stage: "阶段二 · 核心入门",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能对着 whale-girl 讲出「bundle 插件」的五件套：package.json、cordis.patch.yml、Node half、client half、数据目录。</p>
        </div>
      </div>

      <h3>先看目录结构</h3>
      <p>whale-girl 装在你的 <code>~/.dsh/profiles/web/node_modules/whale-girl/</code> 下，结构如下（这是「bundle 插件」的标准形态）：</p>
      <pre><code>whale-girl/
├── package.json          # 1️⃣ 身份证 + 安装说明
├── cordis.patch.yml      # 2️⃣ 补丁：往组合里插插件
└── lib/
    ├── index.mjs         # 3️⃣ Node half：服务端逻辑（Cordis 插件本体）
    ├── client.js         # 4️⃣ client half 入口（浏览器侧）
    ├── client/           #    client 代码：渲染、状态机
    │   ├── index.mjs
    │   ├── character.mjs
    │   └── logic.mjs
    ├── src/              # Node half 拆出来的子模块
    └── assets/           # 图片素材：15 个状态的精灵图</code></pre>

      <h3>① package.json —— 身份证 + 安装说明</h3>
      <p>关键字段逐行看（whale-girl 真实内容简化）：</p>
      <pre><code>{
  "name": "whale-girl",            // 包名（npm 用）
  "version": "0.1.0",
  "type": "module",                // 整个包按 ESM 处理
  "main": "lib/index.mjs",         // Node 端入口
  "exports": {
    ".": "./lib/index.mjs",        // 别人 import 这个包 → Node 端
    "./client": "./lib/client.js"  // 网页端入口（给 client half 用）
  },
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },  // ★ bundle 插件身份证明
    "client": { "platform": "web" }               // ★ 声明有网页端
  },
  "dependencies": { "schemastery": "^3.18.0" }    // 配置库
}</code></pre>
      <p><code>dsh.bundle.patch</code> 和 <code>dsh.client.platform</code> 这两个字段，就是「我是一个 DSH bundle 插件」的<b>身份证明</b>——没有它们，DSH 只会把你当成普通 npm 包，不会组装。</p>

      <h3>② cordis.patch.yml —— 往组合里插插件</h3>
      <p>整个文件只有这几行：</p>
      <pre><code># whale-girl bundle patch：向 web 组合挂载 whale-girl
- insert:
    - id: whale-girl
      name: whale-girl</code></pre>
      <p>意思是：「在最终插件树里 <code>insert</code> 一个插件实例，id 和 name 都是 whale-girl」。DSH 启动时会把这个补丁应用到组合配置上。想加第二个插件实例？就在 <code>insert</code> 下再列一项。</p>

      <h3>③ Node half —— 服务端逻辑（重点）</h3>
      <p><code>lib/index.mjs</code> 是插件的大脑，整体就是第 2.3 课学的结构：</p>
      <pre><code>export const name = "whale-girl"
export const inject = ["jobs", "agents", "sessions", "settings", "webServer"]

export function apply(ctx) {
  // 1. 读配置（settings 服务，缺失回退默认值）
  // 2. ctx.effect(() => { ... }, "标签") 注册全部副作用：
  //    - ctx.provide("whale-girl.pet", ...)   对外提供服务
  //    - ctx.jobs.onJobDone(...)              任务完成记账
  //    - ctx.on("agent/request-error", ...)   请求出错→惊吓动画
  //    - ctx.on("agent/session-start", ...)   新会话→欢迎
  //    - ctx.on("session/event", ...)         会话事件→思考/庆祝
  //    - webServer.register(...)              挂 HTTP 路由（/state /config /interact /events /assets）
  // 3. 返回清理函数（停用时保存状态、清定时器）
}</code></pre>
      <p>其中挂路由是最实用的一招（第 3.3 课你要亲手写）：</p>
      <pre><code>webServer.register({
  kind: "exact",            // exact = 精确匹配路径；prefix = 前缀匹配
  path: "/state",
  handler: async (req, res) => {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" })
    res.end(JSON.stringify({ pet: state }))
  },
})</code></pre>
      <div class="expected"><pre><code>// 浏览器访问 http://127.0.0.1:3080/state 会得到：
{ "pet": { "xp": 12, "level": 1, "memories": [...] } }</code></pre></div>

      <h3>④ client half —— 浏览器里的遥控器</h3>
      <p><code>lib/client.js</code> 是网页端入口，通过 DSH 的 <code>__ModuleLoader__</code> 挂载到网页里。client 里没有服务器权限，只能通过 <code>fetch</code> 调用 Node half 暴露的接口（/state、/interact……）。它干的事：拉状态 → 渲染对应的宠物动画 → 把用户的投喂/玩耍动作 POST 回服务器。</p>

      <h3>⑤ 数据目录 —— 插件存自己的东西</h3>
      <p>whale-girl 把 XP、称号、回忆存在 <code>~/.dsh/data/whale-girl/state.json</code>——<b>不放在插件目录里</b>，因为插件目录可能随卸载被删掉。养成好习惯：插件数据放 <code>data/</code> 下。</p>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 一句话总结五件套</div>
        <p>package.json 亮身份 → patch.yml 报个名 → Node half 干活 → client half 露脸 → data/ 记笔记。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
        <p>打开 whale-girl 目录，对照本课内容做一件事：在 <code>lib/index.mjs</code> 里用搜索找出 <code>webServer.register</code> 出现了几次，分别是哪些路由路径（path）。把你找到的路径列表写下来。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>bundle 插件五件套：package.json（含 dsh.bundle.patch + dsh.client.platform 身份字段）、cordis.patch.yml（insert 插件）、Node half（apply + 服务 + 路由 + 事件）、client half（网页渲染）、data/（持久化）。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "package.json 里哪个字段证明「我是一个 DSH bundle 插件」？",
        options: ["\"main\"", "\"dsh\": {\"bundle\": {\"patch\": ...}}", "\"scripts\"", "\"license\""],
        answer: 1,
        explain: "dsh.bundle.patch 指向 cordis.patch.yml；没有它，DSH 只当你是普通 npm 包。",
      },
      {
        q: "cordis.patch.yml 里的 insert 是在做什么？",
        options: ["删除别的插件", "往最终组合里插入一个插件实例", "下载依赖", "修改网页样式"],
        answer: 1,
        explain: "patch = 对组合配置打的补丁；insert 一项 = 注册一个插件实例（id + name）。",
      },
      {
        q: "插件自己的持久化数据（如 XP、回忆）建议存在哪？",
        options: ["插件目录里（lib/ 下）", "DSH 的 data/ 目录里", "node_modules 里", "浏览器 Cookie 里"],
        answer: 1,
        explain: "放 data/（如 ~/.dsh/data/whale-girl/），因为插件目录可能随卸载被删除。",
      },
    ],
  },

  {
    id: "s2-5",
    no: "2.5",
    title: "安装-启用-验证闭环",
    minutes: "约 30 分钟",
    stage: "阶段二 · 核心入门",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>能独立完成「装插件 → 重启 → 验证 → 排错 → 卸载」全流程。这套闭环以后每个插件都要走一遍，练成肌肉记忆。</p>
        </div>
      </div>

      <h3>闭环全景图</h3>
      <ol class="steps">
        <li><b>装</b>：<code>dsh plugin --profile web add &lt;包&gt;</code>（等 pnpm 装完依赖）；</li>
        <li><b>重启</b>：停掉旧实例 → 重新 <code>dsh web</code>（组装发生在启动时，第 1.4 课）；</li>
        <li><b>验证</b>：<code>dsh --profile web --dump-config</code> 确认进树 + 看启动日志无报错 + 插件特征出现（如宠物出现在右下角）；</li>
        <li><b>排错</b>：有问题对照下面的排错表；</li>
        <li><b>卸载</b>：<code>dsh plugin --profile web remove &lt;包&gt;</code>，再重启。</li>
      </ol>

      <h3>每一步的细节</h3>
      <p><b>① 安装</b>——支持三种地址写法：</p>
      <pre><code>dsh plugin --profile web add whale-girl          # npm 包名
dsh plugin --profile web add github:vlln/whale-girl#main   # GitHub 仓库
dsh plugin --profile web add file:../my-plugin   # 本地目录（阶段三用这个）</code></pre>
      <p><b>② 重启</b>——旧实例关不干净会导致端口占用（见排错表）。Windows 下确认端口占用者：</p>
      <pre><code>netstat -ano | findstr 3080</code></pre>
      <div class="expected"><pre><code>TCP    127.0.0.1:3080    0.0.0.0:0    LISTENING    12616
# 最右一列 12616 就是占用 3080 端口的进程 PID</code></pre></div>

      <h3>排错速查表</h3>
      <table>
        <thead><tr><th>症状</th><th>原因</th><th>处理</th></tr></thead>
        <tbody>
          <tr><td>启动报 <code>EADDRINUSE ... 3080</code></td><td>端口被占用，旧实例没关干净</td><td><code>netstat -ano | findstr 3080</code> 找到 PID → <code>taskkill /PID &lt;PID&gt; /F</code>，再重启</td></tr>
          <tr><td><code>plugin tree failed to load</code></td><td>某插件加载失败</td><td>看报错上方是哪个插件；多半是 patch 语法错或代码报错</td></tr>
          <tr><td><code>--dump-config</code> 里搜不到插件</td><td>插件没进 bundle 清单</td><td>确认 add 成功、检查 profile 的 package.json bundles 里有没有它</td></tr>
          <tr><td>网页没变化</td><td>浏览器缓存</td><td>硬刷新：Ctrl + F5</td></tr>
          <tr><td>插件的接口访问 404</td><td>路径不对 / 插件没加载</td><td>先确认 dump-config 进树，再核对插件文档里的路径</td></tr>
        </tbody>
      </table>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：开店流程</div>
        <p>下单进货（add）→ 打烊摆台（重启）→ 核对采购单（dump-config）→ 看开张日报（日志）→ 退货（remove）。这套流程和「进货」一样普通，但每走一遍你都会更熟。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（15 分钟）</div>
        <p>完整走一遍闭环：安装一个测试插件（比如 <code>whale-girl</code> 的姐妹包或任意小包，或重新装一遍 whale-girl）→ 重启 → dump-config 验证 → 卸载 → 重启。全程记下你用了哪些命令。以后装自己的插件就是把这套命令复制一遍。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>闭环五步：add → 重启 → dump-config 验证 → 看日志 → remove。最常踩的坑是端口占用（EADDRINUSE）和浏览器缓存。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "Windows 下查 3080 端口被哪个进程占用，用什么命令？",
        options: ["dir 3080", "netstat -ano | findstr 3080", "ping 3080", "node --port 3080"],
        answer: 1,
        explain: "netstat -ano 列出所有网络连接，findstr 过滤出 3080；最右列就是 PID。",
      },
      {
        q: "插件装好了、重启了，但网页界面没变化，第一步先试什么？",
        options: ["重装系统", "硬刷新浏览器（Ctrl+F5）", "换电脑", "改端口"],
        answer: 1,
        explain: "浏览器缓存是最常见原因，先 Ctrl+F5 硬刷新；没解决再看日志和 dump-config。",
      },
      {
        q: "卸载插件的命令是？",
        options: ["dsh plugin --profile web delete whale-girl", "dsh plugin --profile web remove whale-girl", "dsh uninstall whale-girl", "npm remove whale-girl"],
        answer: 1,
        explain: "remove 之后同样要重启才完成「拆台」。",
      },
    ],
  },
]
