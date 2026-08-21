/* ============================================================
   阶段三 · 实战演练 —— 方法论总览课（1 课）
   实战项目库见 js/content/practice/ 目录
   ============================================================ */
window.COURSE_S3 = [
  {
    id: "s3-0",
    no: "3.0",
    title: "实战方法论：四步闭环",
    minutes: "约 30 分钟",
    stage: "阶段三 · 实战演练",
    html: `
      <div class="lesson-goal">
        <i class="fa-solid fa-bullseye"></i>
        <div><b>本节目标</b>
          <p>掌握开发任何 DSH 插件的统一「四步闭环」：设计 → 骨架 → 逻辑 → 验证 → 配置。本课讲通用套路（以 error-logger 为例贯穿），具体的每个插件实战在左侧「实战项目」里。</p>
        </div>
      </div>

      <h3>为什么是这四步（+1）？</h3>
      <p>回想你学过的所有内容，其实都在为同一个流程服务。任何插件开发都可以拆成下面几步，每步都有明确的<b>验收标准</b>：</p>
      <table>
        <thead><tr><th>步骤</th><th>干什么</th><th>验收标准（做到什么程度算过）</th></tr></thead>
        <tbody>
          <tr><td>① 设计</td><td>回答三个问题：提供什么？挂哪端？要什么配置？再画出接口和目录</td><td>能说清「输入 → 处理 → 输出」</td></tr>
          <tr><td>② 骨架</td><td>写 package.json + cordis.patch.yml + 占位 index.mjs</td><td>空壳装上能启动、日志出现插件名</td></tr>
          <tr><td>③ 逻辑</td><td>inject 声明依赖 → ctx.get 拿服务 → ctx.effect 里订阅事件、挂路由</td><td>代码写完，逻辑自洽，注释清楚</td></tr>
          <tr><td>④ 验证</td><td>file: 安装 → 重启 → dump-config → 访问接口 → 测试记录法</td><td>接口返回预期数据；排错表能定位问题</td></tr>
          <tr><td>⑤ 配置</td><td>schemastery 声明 Schema → settings.register（applies: live）→ settings.yaml</td><td>改 settings.yaml 不用重启即生效</td></tr>
        </tbody>
      </table>

      <div class="box metaphor">
        <div class="box-title"><i class="fa-solid fa-lightbulb"></i> 比喻：装修一套房子</div>
        <p>设计 = 画图纸；骨架 = 打地基立承重墙（空壳先能住人）；逻辑 = 水电布线装设备；验证 = 逐间验收试住；配置 = 装旋钮开关，入住后随时可调。每步没验收就急着下一步，返工成本翻倍。</p>
      </div>

      <h3>① 设计三问（永远先问这三句）</h3>
      <ul>
        <li><b>提供什么能力？</b>一句话说清。能力小一点、明确一点，好过"万能插件"。</li>
        <li><b>挂在 Node 端还是 client 端？</b>要开路由 / 听事件 / 动文件 → Node 端；要画界面 → 双端（Node 提供接口 + client 渲染）。</li>
        <li><b>需要哪些配置？</b>第一版一律零配置，跑通后再加（见步骤 ⑤）。</li>
      </ul>

      <h3>② 骨架通用模板</h3>
      <p>所有 bundle 插件共享同一个骨架，只有名字不同：</p>
      <pre><code># 目录（三件套）
my-plugin/
├── package.json        # type:module + main/exports + dsh.bundle.patch
├── cordis.patch.yml    # - insert: - id: &lt;名字&gt; / name: &lt;名字&gt;
└── lib/index.mjs       # export const name + 占位 apply

# 占位 index.mjs 必须 export name，且要和 patch 里的 id 完全一致</code></pre>

      <h3>③ 逻辑通用骨架</h3>
      <pre><code>export const name = "插件名"
export const inject = ["用到的服务们"]

export function apply(ctx) {
  const svc = ctx.get("服务名")       // 拿服务，判空降级
  if (!svc) return

  ctx.effect(() => {
    const disposers = [
      ctx.on("事件名", 回调),          // 听事件
      svc.xxx(...),                    // 订阅回调（如 jobs.onJobDone）
      webServer.register({...}),       // 挂路由
    ]
    return () => disposers.forEach((d) => d && d())   // 停用时统一撤销
  }, "插件名: 标签")
}</code></pre>

      <h3>④ 验证通用闭环</h3>
      <pre><code>dsh plugin --profile web add file:./插件目录   # 装
dsh web                                          # 重启
dsh --profile web --dump-config | Select-String 名字   # 确认进树
# 浏览器访问接口 → 若事件不好现场触发，用「测试记录法」注入假数据验证链路</code></pre>

      <h3>⑤ 配置通用套路</h3>
      <pre><code>import { Schema } from "schemastery"

const CONFIG_SCHEMA = Schema.object({ ... })   // 声明旋钮
const scope = settings.register("插件名", CONFIG_SCHEMA, { applies: "live" })
config = scope.get()
scope.watch((next) => { config = next })        // 拧旋钮即时生效</code></pre>

      <div class="box note">
        <div class="box-title"><i class="fa-solid fa-circle-info"></i> 怎么使用「实战项目」？</div>
        <p>左侧「实战项目」下的每个插件 = 一次完整四步闭环的具体演示，页面顶部有<b>步骤条</b>，每步结尾有「本步完成」按钮，全部完成后自动点亮项目。通用部分这里讲过了，项目页只写<b>该插件特有的东西</b>（具体代码、配置项、验证数据），遇到重复概念会链接回本课。</p>
      </div>

      <div class="practice">
        <div class="practice-title"><i class="fa-solid fa-pen"></i> 小练习（10 分钟）</div>
        <p>为你的「下一个插件」做一次设计三问（比如：一个「快捷笔记」插件，把常用提示词存起来）。<b>只做设计、不写代码</b>：① 提供什么能力；② 挂哪端；③ 第一版需要配置吗。写完和 error-logger 的设计对照，看看思路是否一致。</p>
      </div>

      <div class="takeaway">
        <i class="fa-solid fa-flag-checkered"></i>
        <div><b>本节小结</b><p>四步闭环：设计（三问）→ 骨架（空壳先跑通）→ 逻辑（inject/get/effect/disposers）→ 验证（装、启、查、测）→ 配置（Schema + live + settings.yaml）。每步有验收标准，逐步行军不跳步。</p></div>
      </div>
    `,
    quiz: [
      {
        q: "四步闭环的正确顺序是？",
        options: ["骨架 → 设计 → 逻辑 → 验证 → 配置", "设计 → 骨架 → 逻辑 → 验证 → 配置", "逻辑 → 设计 → 验证 → 骨架 → 配置", "配置 → 设计 → 逻辑 → 骨架 → 验证"],
        answer: 1,
        explain: "先想清楚（设计），再搭空壳（骨架），加功能（逻辑），装上跑通（验证），最后加旋钮（配置）。",
      },
      {
        q: "「设计三问」不包括下面哪一问？",
        options: ["提供什么能力？", "挂在 Node 端还是 client 端？", "用什么颜色做界面？", "需要哪些配置？"],
        answer: 2,
        explain: "三问：能力、端侧、配置。界面颜色是 client 端设计阶段才考虑的事。",
      },
      {
        q: "事件不好现场触发时，验证事件监听链路的标准做法是？",
        options: ["等它自然发生", "注入一条测试记录，验证后删除", "改事件名试试", "跳过验证"],
        answer: 1,
        explain: "「测试记录法」：临时注入假数据验证整条链路，验证完恢复干净——插件开发者的日常操作。",
      },
    ],
  },
]
