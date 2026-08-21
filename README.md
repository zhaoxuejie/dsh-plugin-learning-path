# DeepSeek Harness 插件开发 · 学习教程

> 零基础学会开发 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件。
> 4 个阶段 · 18 节完整教程 · 纯 HTML/CSS/JS，双击 `index.html` 即用。

## 这是什么

一份**可交互的学习路线 + 教程**：从「Harness 是什么」讲到「给官方仓库提 PR」，全部概念用生活比喻解释，代码示例对照真实插件（whale-girl）源码编写。

## 功能

- 📚 **18 节完整教程**：概念讲解 + 代码示例（含预期输出）+ 排错表 + 小练习 + 随堂小测（54 题）
- 🧭 **课程总览首页**：进度条、继续学习定位、四阶段导航
- 🔍 **全文搜索**：输入关键词（如 `EADDRINUSE`）直达相关课程并高亮
- 📖 **术语表**：40 个黑话速查，可跳回出处课程
- 📝 **学习进度**：勾选学完自动存 localStorage，刷新不丢
- 📱 **响应式**：桌面 3 区布局 / 手机顶部横滑目录

## 课程结构

| 阶段 | 内容 | 学完能 |
|---|---|---|
| 一 · 认识基础（4 课） | Harness / 插件 / Profile / 启动即组装 | 用大白话讲清概念 |
| 二 · 核心入门（5 课） | JS/ESM / YAML / Cordis 四概念 / 解剖 whale-girl / 安装验证闭环 | 看懂真实插件源码 |
| 三 · 实战演练（5 课） | 从零写「error-logger 错误记录器」：骨架 → 事件监听 → 本地安装 → 配置热更新 | 写出并跑通自己的插件 |
| 四 · 进阶探索（4 课） | 工具系统 / 子代理·Goal·Plan / MCP 与 Skills / Web 插件与源码贡献 | 选定方向深耕 |

## 本地使用

双击 `index.html` 即可（无需构建、无外部依赖；图标使用 Font Awesome CDN）。

或克隆到本地：

```bash
git clone https://github.com/zhaoxuejie/dsh-plugin-learning-path.git
cd dsh-plugin-learning-path
start index.html   # Windows；macOS 用 open index.html
```

## 文件结构

```
learning-path/
├── index.html        # 页面骨架（顶栏 + 目录侧栏 + 内容区）
├── styles.css        # 全部样式（渐变/毛玻璃/响应式/动画）
├── app.js            # 交互逻辑（路由/搜索/测验/进度）
├── content-s1.js     # 阶段一课程内容
├── content-s2.js     # 阶段二课程内容
├── content-s3.js     # 阶段三课程内容（error-logger 实战）
├── content-s4.js     # 阶段四课程内容
└── glossary.js       # 术语速查表（40 条）
```

## 说明

- 教程内容以真实环境为基准：代码示例对照 `whale-girl` 插件源码编写；如与最新版 DSH 官方文档有出入，以官方文档为准。
- 仅用于学习交流；DeepSeek Harness 为 DeepSeek 官方项目，商标归其所有。
