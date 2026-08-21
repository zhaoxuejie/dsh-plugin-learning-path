# 实战项目模板说明（js/content/practice/）

本目录存放「实战项目库」：每个实战项目 = 一个插件开发的完整四步闭环演示。
侧栏、首页、进度、搜索、术语表出处全部自动适配——**新增项目只需改一个文件**。

## 如何新增一个实战项目

1. 打开 `js/content/practice/projects.js`
2. 在 `window.PROJECTS = [ ... ]` 数组里按希望展示的顺序**追加一个项目对象**（放在数组越前面，侧栏显示越靠前）
3. 保存文件，刷新浏览器即可看到（无需修改任何其他文件）

## 项目对象字段

```js
{
  id: "my-plugin",            // 唯一 ID（小写+连字符），路由 /practice/<id>/<stepId> 用它
  name: "中文名 plugin-name",  // 侧栏/标题显示名（建议中文在前：窄屏截断时意思仍在）
  icon: "fa-bell",            // Font Awesome 图标名（侧栏和标题用）
  desc: "一句话描述",          // 首页项目行的副标题
  difficulty: "入门",         // 入门 / 进阶
  minutes: "约 2 小时",       // 预计时长
  steps: [ /* 5 个步骤，见下 */ ],
  quiz:  [ /* 项目测验 4~5 题，见下 */ ],
}
```

## step 字段

```js
{ id: "design", title: "设计", html: "…HTML 内容…" }
```

- 步骤 id 建议按四步闭环命名：`design` / `skeleton` / `logic` / `verify` / `config`
- `html` 里可用教程已有样式类：
  - `.lesson-goal` 本步目标横幅
  - `.box.metaphor` / `.box.note` / `.box.warn` 信息框
  - `.practice` 小练习、`.expected` 预期输出块、`.file-box` 折叠的完整文件
  - `<pre><code>` 代码块（自动带「复制」按钮）；表格、步骤列表 `<ol class="steps">` 等
- 代码块里的示例代码要能直接运行，预期输出放 `<div class="expected"><pre><code>…</code></pre></div>`

## quiz 字段

```js
{ q: "题目文字", options: ["选项A", "选项B", "选项C", "选项D"], answer: 1, explain: "答完展示的解析" }
```

- `answer` 是正确选项的**下标**（从 0 开始）
- `explain` 必填

## 注意事项

- `id` 必须全局唯一（不与其他项目、课程 id 重复）
- 插件路由路径建议带插件名前缀（如 `/my-plugin/xxx`），避免与其他插件撞车
- 术语表（js/glossary.js）如要指向本项目的某个步骤，`src` 写 `practice/<项目id>/<步骤id>`
- 步骤完成进度自动生成（localStorage key 为 `p:<项目id>:<步骤id>`），无需额外代码
- 写完 `git add -A && git commit -m "..." && git push`，GitHub Pages 自动更新

## 完整骨架示例

```js
{
  id: "my-plugin",
  name: "我的插件 my-plugin",
  icon: "fa-bell",
  desc: "一句话说明这个插件解决什么问题",
  difficulty: "入门",
  minutes: "约 2 小时",
  steps: [
    { id: "design", title: "设计", html: `…` },
    { id: "skeleton", title: "搭骨架", html: `…` },
    { id: "logic", title: "写逻辑", html: `…` },
    { id: "verify", title: "安装验证", html: `…` },
    { id: "config", title: "进阶配置", html: `…` },
  ],
  quiz: [
    { q: "题目1", options: ["A", "B", "C", "D"], answer: 0, explain: "解析1" },
    { q: "题目2", options: ["A", "B", "C", "D"], answer: 1, explain: "解析2" },
    { q: "题目3", options: ["A", "B", "C", "D"], answer: 2, explain: "解析3" },
    { q: "题目4", options: ["A", "B", "C", "D"], answer: 3, explain: "解析4" },
  ],
}
```
