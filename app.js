/* ============================================================
   DeepSeek Harness 插件开发 · 学习教程
   app.js — 目录 / 总览首页 / 术语表 / 全文搜索 / 测验 / 进度
   ============================================================ */
(() => {
  "use strict";

  const STORAGE_KEY = "dsh-course-progress-v2";
  const LEGACY_KEYS = ["dsh-learning-progress-v1"];

  /* ---------- 阶段元信息 ---------- */
  const STAGES = [
    { id: "s1", label: "阶段一 · 认识基础", icon: "fa-compass", desc: "用生活比喻搞懂核心概念" },
    { id: "s2", label: "阶段二 · 核心入门", icon: "fa-puzzle-piece", desc: "JS/YAML/Cordis + 解剖真实插件" },
    { id: "s3", label: "阶段三 · 实战演练", icon: "fa-hammer", desc: "从零写出「错误记录器」并装进 Harness" },
    { id: "s4", label: "阶段四 · 进阶探索", icon: "fa-rocket", desc: "工具 / 子代理 / MCP / 源码贡献" },
  ];

  /* ---------- 汇总全部课程 ---------- */
  const ALL = [
    ...(window.COURSE_S1 || []),
    ...(window.COURSE_S2 || []),
    ...(window.COURSE_S3 || []),
    ...(window.COURSE_S4 || []),
  ];
  const TOTAL = ALL.length;
  const BY_ID = new Map(ALL.map((c) => [c.id, c]));
  const GLOSSARY = window.GLOSSARY || [];

  /* ---------- 工具函数 ---------- */
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function stripTags(s) {
    return String(s).replace(/<[^>]*>/g, " ");
  }

  /* ---------- 进度状态 ---------- */
  let done = {};
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object") done = saved;
    for (const key of LEGACY_KEYS) {
      const legacy = JSON.parse(localStorage.getItem(key) || "null");
      if (legacy && typeof legacy === "object") {
        for (const [k, v] of Object.entries(legacy)) if (v) done[k] = true;
      }
    }
  } catch {
    done = {};
  }
  function saveDone() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      /* 不可用时本次会话内有效 */
    }
  }

  /* ---------- DOM ---------- */
  const sidebar = document.getElementById("sidebar");
  const view = document.getElementById("course-view");
  const fill = document.getElementById("progress-fill");
  const num = document.getElementById("progress-num");
  const bar = document.getElementById("progress-bar");
  const resetBtn = document.getElementById("reset-progress");
  const topSearch = document.getElementById("top-search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchClear = document.getElementById("search-clear");

  let activeQuery = ""; // 当前搜索词（用于渲染后高亮）

  /* ============================================================
     目录侧栏
     ============================================================ */
  function buildNav() {
    sidebar.innerHTML = "";

    const tools = document.createElement("div");
    tools.className = "sidebar-tools";
    [
      ["home", "fa-house", "课程总览"],
      ["glossary", "fa-book", "术语表"],
    ].forEach(([nav, icon, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sidebar-link";
      b.dataset.nav = nav;
      b.innerHTML = '<i class="fa-solid ' + icon + '"></i><span>' + label + "</span>";
      tools.appendChild(b);
    });
    sidebar.appendChild(tools);

    for (const stage of STAGES) {
      const courses = ALL.filter((c) => c.id.startsWith(stage.id));
      if (courses.length === 0) continue;
      const stageEl = document.createElement("div");
      stageEl.className = "nav-stage";
      stageEl.dataset.stage = stage.id;
      const title = document.createElement("div");
      title.className = "nav-stage-title";
      title.innerHTML =
        '<i class="fa-solid ' + stage.icon + '"></i><span>' + stage.label + "</span>";
      stageEl.appendChild(title);
      for (const course of courses) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-lesson";
        btn.dataset.course = course.id;
        btn.title = course.no + " " + course.title;
        btn.innerHTML =
          '<span class="nav-lesson-no">' + course.no + "</span>" +
          '<span class="nav-lesson-name">' + course.title + "</span>" +
          '<span class="nav-lesson-check"><i class="fa-solid fa-check"></i></span>';
        stageEl.appendChild(btn);
      }
      sidebar.appendChild(stageEl);
    }

    sidebar.addEventListener("click", (e) => {
      const link = e.target.closest(".sidebar-link");
      if (link) {
        location.hash = "#/" + link.dataset.nav;
        return;
      }
      const btn = e.target.closest(".nav-lesson");
      if (btn) location.hash = "#/" + btn.dataset.course;
    });
  }

  function updateSidebarActive(mode, id) {
    sidebar.querySelectorAll(".nav-lesson").forEach((btn) => {
      const active = mode === "course" && btn.dataset.course === id;
      btn.classList.toggle("active", active);
      if (active) btn.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
    sidebar.querySelectorAll(".sidebar-link").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.nav === mode);
    });
  }

  /* ============================================================
     路由
     ============================================================ */
  function route() {
    const hash = location.hash || "";
    if (hash === "" || hash === "#/" || hash === "#/home") {
      renderHome();
      updateSidebarActive("home", null);
    } else if (hash === "#/glossary") {
      renderGlossary();
      updateSidebarActive("glossary", null);
    } else {
      const id = hash.replace(/^#\//, "");
      const course = BY_ID.get(id) || ALL[0];
      if (!course) return;
      renderCourse(course);
      updateSidebarActive("course", course.id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     首页（课程总览）
     ============================================================ */
  function renderHome() {
    view.dataset.stage = "";
    const doneCount = Object.values(done).filter(Boolean).length;
    const pct = TOTAL ? Math.round((doneCount / TOTAL) * 100) : 0;
    const next = ALL.find((c) => !done[c.id]) || ALL[0];

    const stageSections = STAGES.map((stage) => {
      const courses = ALL.filter((c) => c.id.startsWith(stage.id));
      const stageDone = courses.filter((c) => done[c.id]).length;
      return (
        '<section class="home-stage glass" data-stage="' + stage.id + '">' +
        '<h3 class="home-stage-title"><i class="fa-solid ' + stage.icon + '"></i> ' +
        stage.label +
        '<span class="home-stage-count">' + stageDone + "/" + courses.length + " 完成</span></h3>" +
        '<p class="home-stage-desc">' + stage.desc + "</p>" +
        '<div class="home-course-list">' +
        courses
          .map(
            (c) =>
              '<button class="home-course' + (done[c.id] ? " done" : "") + '" data-go="' + c.id + '">' +
              '<span class="home-course-no">' + c.no + "</span>" +
              '<span class="home-course-name">' + esc(c.title) + "</span>" +
              '<span class="home-course-min">' + c.minutes.replace("约 ", "").replace(" 分钟", "") + "′</span>" +
              '<span class="home-course-check"><i class="fa-solid fa-check"></i></span>' +
              "</button>"
          )
          .join("") +
        "</div></section>"
      );
    }).join("");

    view.innerHTML =
      '<header class="course-head">' +
      '<span class="course-crumb"><i class="fa-solid fa-house"></i> 课程总览</span>' +
      "<h1>你好，同学 👋</h1>" +
      '<div class="course-meta"><i class="fa-solid fa-route"></i> DeepSeek Harness 插件开发 · 4 阶段 · 18 节课 · 由浅入深</div>' +
      "</header>" +
      '<section class="home-hero glass">' +
      '<div class="home-hero-left">' +
      '<div class="home-hero-label"><i class="fa-solid fa-seedling"></i> 学习进度</div>' +
      '<div class="home-hero-num">' + doneCount + '<span>/ ' + TOTAL + " 课</span></div>" +
      '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      "</div>" +
      '<button class="nav-btn continue-btn" data-go="' + next.id + '">' +
      '<i class="fa-solid fa-play"></i> ' +
      (doneCount === 0 ? "开始学习 · " + next.no + " " + esc(next.title) : "继续学习 · " + next.no + " " + esc(next.title)) +
      "</button>" +
      "</section>" +
      '<section class="home-tips glass">' +
      "<h3><i class=\"fa-solid fa-lightbulb\"></i> 怎么用这份教程？</h3>" +
      "<ul>" +
      "<li><b>每课四步走：</b>看「本节目标」→ 敲一遍代码示例 → 做完「小练习」→ 答「随堂小测」再勾选学完。</li>" +
      "<li><b>报错是朋友：</b>排错表里全是前人踩过的坑，遇到问题先查表再查日志。</li>" +
      "<li><b>术语忘了？</b>左侧「术语表」随时速查，每个词都能跳回出处课程。</li>" +
      "<li><b>想找内容？</b>顶部搜索框支持全文搜索，如输入 EADDRINUSE 直接定位到相关课程并高亮。</li>" +
      "</ul>" +
      "</section>" +
      stageSections;
  }

  /* ============================================================
     术语表
     ============================================================ */
  function renderGlossary() {
    view.dataset.stage = "";
    view.innerHTML =
      '<header class="course-head">' +
      '<span class="course-crumb"><i class="fa-solid fa-book"></i> 术语表</span>' +
      "<h1>黑话速查</h1>" +
      '<div class="course-meta"><i class="fa-solid fa-lightbulb"></i> ' + GLOSSARY.length + " 个术语 · 一句话解释 · 点「去学习」跳回课程</div>" +
      "</header>" +
      '<div class="glossary-search glass">' +
      '<i class="fa-solid fa-magnifying-glass"></i>' +
      '<input type="search" id="glossary-filter" placeholder="筛选术语…（如 Schema / 热更新 / ESM）" aria-label="筛选术语" />' +
      "</div>" +
      '<div class="glossary-grid" id="glossary-grid"></div>';

    const grid = view.querySelector("#glossary-grid");
    const filter = view.querySelector("#glossary-filter");
    const render = (q) => {
      const list = GLOSSARY.filter(
        (t) => !q || (t.term + " " + t.en + " " + t.explain).toLowerCase().includes(q)
      );
      grid.innerHTML = list.length
        ? list
            .map(
              (t) =>
                '<div class="glossary-card glass">' +
                '<div class="glossary-term">' + esc(t.term) +
                (t.en && t.en.toLowerCase() !== t.term.toLowerCase()
                  ? ' <span class="glossary-en">' + esc(t.en) + "</span>"
                  : "") +
                "</div>" +
                '<p class="glossary-explain">' + esc(t.explain) + "</p>" +
                '<button class="glossary-src" data-go="' + t.src + '"><i class="fa-solid fa-arrow-right"></i> 去学习（' + t.src + "）</button>" +
                "</div>"
            )
            .join("")
        : '<p class="glossary-empty">没有匹配的术语，换个词试试。</p>';
    };
    filter.addEventListener("input", () => render(filter.value.trim().toLowerCase()));
    render("");
  }

  /* ============================================================
     课程页
     ============================================================ */
  function renderCourse(course) {
    view.dataset.stage = course.id.slice(0, 2);
    view.innerHTML = "";

    const head = document.createElement("header");
    head.className = "course-head";
    head.innerHTML =
      '<span class="course-crumb"><i class="fa-solid fa-book-open"></i> ' + course.stage + "</span>" +
      "<h1>" + course.no + " " + esc(course.title) + "</h1>" +
      '<div class="course-meta"><i class="fa-regular fa-clock"></i> 预计学习时间：' + course.minutes + "</div>";

    const body = document.createElement("div");
    body.className = "course-body glass";
    body.innerHTML = course.html;

    // 代码块加复制按钮（预期输出块除外）
    addCopyButtons(body);

    const nav = document.createElement("nav");
    nav.className = "course-nav";

    const idx = ALL.findIndex((c) => c.id === course.id);
    const isDone = !!done[course.id];

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "nav-btn glass";
    prevBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> 上一课';
    prevBtn.disabled = idx <= 0;

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.className = "nav-btn done-btn" + (isDone ? " marked" : "");
    doneBtn.innerHTML = isDone
      ? '<i class="fa-solid fa-circle-check"></i> 已学完（点击取消）'
      : '<i class="fa-regular fa-circle"></i> 标记学完';

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "nav-btn glass";
    nextBtn.innerHTML = '下一课 <i class="fa-solid fa-arrow-right"></i>';
    nextBtn.disabled = idx >= TOTAL - 1;

    nav.appendChild(prevBtn);
    nav.appendChild(doneBtn);
    nav.appendChild(nextBtn);

    view.appendChild(head);
    view.appendChild(body);

    // 随堂小测
    const quiz = buildQuiz(course);
    if (quiz) view.appendChild(quiz);

    view.appendChild(nav);

    prevBtn.addEventListener("click", () => {
      if (idx > 0) location.hash = "#/" + ALL[idx - 1].id;
    });
    nextBtn.addEventListener("click", () => {
      if (idx < TOTAL - 1) location.hash = "#/" + ALL[idx + 1].id;
    });
    doneBtn.addEventListener("click", () => {
      if (done[course.id]) delete done[course.id];
      else done[course.id] = true;
      saveDone();
      updateProgress();
      renderCourse(course);
      updateSidebarActive("course", course.id);
    });

    // 搜索高亮
    if (activeQuery) highlightIn(body, activeQuery);
  }

  /* ---------- 复制按钮 ---------- */
  function addCopyButtons(root) {
    root.querySelectorAll("pre").forEach((pre) => {
      if (pre.closest(".expected") || pre.parentElement?.classList.contains("code-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.title = "复制代码";
      btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      btn.addEventListener("click", async () => {
        const text = pre.innerText;
        let ok = false;
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch {
          try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            ok = document.execCommand("copy");
            ta.remove();
          } catch {
            ok = false;
          }
        }
        btn.classList.toggle("copied", ok);
        btn.innerHTML = ok ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>';
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 1500);
      });
      wrap.appendChild(btn);
    });
  }

  /* ---------- 随堂小测 ---------- */
  function buildQuiz(course) {
    const qs = course.quiz || [];
    if (!qs.length) return null;

    const sec = document.createElement("section");
    sec.className = "quiz glass";
    sec.innerHTML =
      '<div class="quiz-head"><i class="fa-solid fa-circle-question"></i> 随堂小测' +
      '<span class="quiz-score" data-total="' + qs.length + '">已答 0/' + qs.length + "</span></div>";

    let answered = 0;
    let correct = 0;
    const scoreEl = sec.querySelector(".quiz-score");

    qs.forEach((item, i) => {
      const q = document.createElement("div");
      q.className = "quiz-item";
      q.innerHTML =
        '<p class="quiz-q">' + (i + 1) + ". " + esc(item.q) + "</p>" +
        '<div class="quiz-options"></div>' +
        '<p class="quiz-explain" hidden><i class="fa-solid fa-circle-info"></i> ' + esc(item.explain) + "</p>";
      const opts = q.querySelector(".quiz-options");
      item.options.forEach((opt, oi) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "quiz-option";
        b.textContent = opt;
        b.addEventListener("click", () => {
          if (q.dataset.done) return;
          q.dataset.done = "1";
          answered += 1;
          const isCorrect = oi === item.answer;
          if (isCorrect) correct += 1;
          b.classList.add(isCorrect ? "correct" : "wrong");
          opts.children[item.answer].classList.add("correct");
          const exp = q.querySelector(".quiz-explain");
          exp.hidden = false;
          exp.classList.add(isCorrect ? "ok" : "bad");
          Array.from(opts.children).forEach((x) => (x.disabled = true));
          scoreEl.textContent = "已答 " + answered + "/" + qs.length + " · 答对 " + correct;
        });
        opts.appendChild(b);
      });
      sec.appendChild(q);
    });
    return sec;
  }

  /* ============================================================
     全文搜索
     ============================================================ */
  const searchIndex = ALL.map((c) => ({
    id: c.id,
    no: c.no,
    title: c.title,
    stage: c.stage,
    text: stripTags(c.html + " " + c.title),
    lower: stripTags(c.html + " " + c.title).toLowerCase(),
  }));

  function showResults() {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) {
      searchResults.hidden = true;
      searchClear.hidden = q.length === 0;
      return;
    }
    searchClear.hidden = false;
    const hits = [];
    for (const item of searchIndex) {
      const pos = item.lower.indexOf(q);
      if (pos === -1) continue;
      const start = Math.max(0, pos - 24);
      hits.push({
        id: item.id,
        no: item.no,
        title: item.title,
        stage: item.stage,
        snippet: (start > 0 ? "…" : "") + item.text.slice(start, pos + q.length + 48).replace(/\s+/g, " ").trim(),
      });
      if (hits.length >= 8) break;
    }
    if (hits.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">没有找到「' + esc(searchInput.value.trim()) + "」相关内容</div>";
    } else {
      searchResults.innerHTML = hits
        .map(
          (h) =>
            '<button type="button" class="search-item" data-id="' + h.id + '">' +
            '<span class="search-item-title"><b>' + h.no + "</b> " + esc(h.title) + "</span>" +
            '<span class="search-item-snippet">' + esc(h.snippet) + "</span>" +
            "</button>"
        )
        .join("");
    }
    searchResults.hidden = false;
  }

  function hideResults() {
    searchResults.hidden = true;
  }

  searchInput.addEventListener("input", showResults);
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length >= 2) showResults();
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideResults();
      searchInput.blur();
    }
  });
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    activeQuery = "";
    searchClear.hidden = true;
    hideResults();
    route(); // 重新渲染，去掉高亮
  });
  searchResults.addEventListener("click", (e) => {
    const item = e.target.closest(".search-item");
    if (!item) return;
    const id = item.dataset.id;
    activeQuery = searchInput.value.trim();
    hideResults();
    const target = "#/" + id;
    if (location.hash === target) route();
    else location.hash = target;
  });
  document.addEventListener("click", (e) => {
    if (!topSearch.contains(e.target)) hideResults();
  });

  /* ---------- 高亮 ---------- */
  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlightIn(root, query) {
    const q = query.trim();
    if (q.length < 2) return;
    const re = new RegExp(escapeRegExp(q), "gi");
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) {
      const n = walker.currentNode;
      const p = n.parentElement;
      if (!p) continue;
      if (p.closest("pre, code, mark, .quiz-option, button")) continue;
      if (n.nodeValue && re.test(n.nodeValue)) nodes.push(n);
    }
    nodes.forEach((n) => {
      const text = n.nodeValue;
      const re2 = new RegExp(escapeRegExp(q), "gi");
      const frag = document.createDocumentFragment();
      let last = 0;
      let m;
      while ((m = re2.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const mark = document.createElement("mark");
        mark.className = "hl";
        mark.textContent = m[0];
        frag.appendChild(mark);
        last = m.index + m[0].length;
        if (m.index === re2.lastIndex) re2.lastIndex++;
      }
      frag.appendChild(document.createTextNode(text.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }

  /* ============================================================
     进度
     ============================================================ */
  function updateProgress() {
    const doneCount = Object.values(done).filter(Boolean).length;
    if (fill) fill.style.width = TOTAL ? (doneCount / TOTAL) * 100 + "%" : "0%";
    if (num) num.textContent = doneCount + "/" + TOTAL;
    if (bar) bar.setAttribute("aria-valuenow", String(doneCount));
    sidebar.querySelectorAll(".nav-lesson").forEach((btn) => {
      btn.classList.toggle("done", !!done[btn.dataset.course]);
    });
  }

  /* ============================================================
     全局事件
     ============================================================ */
  window.addEventListener("hashchange", route);

  // 首页/术语表里的「去学习」按钮（事件委托）
  view.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (!t) return;
    const id = t.dataset.go;
    const target = "#/" + id;
    if (location.hash === target) route();
    else location.hash = target;
  });

  window.addEventListener("keydown", (e) => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const hash = location.hash || "";
    if (hash.startsWith("#/") && hash !== "#/home" && hash !== "#/glossary") {
      const id = hash.replace(/^#\//, "") || ALL[0].id;
      const idx = ALL.findIndex((c) => c.id === id);
      if (e.key === "ArrowRight" && idx < TOTAL - 1) {
        location.hash = "#/" + ALL[idx + 1].id;
      } else if (e.key === "ArrowLeft" && idx > 0) {
        location.hash = "#/" + ALL[idx - 1].id;
      }
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (!window.confirm("确定要清空所有学习进度吗？")) return;
      done = {};
      saveDone();
      updateProgress();
      route();
    });
  }

  /* ============================================================
     启动
     ============================================================ */
  buildNav();
  updateProgress();
  route();
})();
