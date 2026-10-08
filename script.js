/* ==========================================================================
   Diego Conterno — portfolio
   Edit PROJECTS below to change cards + case studies.
   ========================================================================== */

document.documentElement.classList.add("js");

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PROJECTS = [
  {
    id: "hydra",
    name: "HYDRA",
    tagline: "Real-time wireless data collection",
    summary: "Real-time wireless data collection for embedded devices.",
    tags: ["EMBEDDED", "WIRELESS", "LINUX", "BLUETOOTH"],
    visual: "pcb",
    featured: true,
    github: "https://github.com/diegoconterno",
    overview: [
      "Hydra is a real-time wireless data collection system designed for resource-constrained embedded devices. It captures sensor data, streams it over Bluetooth, and provides developer tooling for visualization and analysis.",
    ],
    background: [
      "Collecting high-rate sensor data from battery-powered devices usually means choosing between throughput and battery life. Existing tools either required a wired debug connection or dropped samples once the radio got busy.",
      "The goal was a drop-in pipeline that any firmware team could adopt without redesigning their product.",
    ],
    approach: [
      "A small C library on the device batches samples into ring buffers and ships them over BLE notifications with connection parameters tuned per platform.",
      "A Linux gateway reassembles packets, timestamps them, and exposes a stream that desktop tools can subscribe to. Everything is built around a shared, versioned packet schema.",
    ],
    outcomes: [
      "Reliable real-time data streaming over BLE",
      "Low power operation for extended battery life",
      "Cross-platform tools for data visualization",
      "Used in multiple research and personal projects",
    ],
    metrics: [["0", "dropped packets in 24h soak"], ["~1 kHz", "sustained sample rate"], ["3", "platforms supported"]],
    stack: [["LANGUAGE", "C, Python"], ["RADIO", "Bluetooth LE"], ["RTOS", "Zephyr"], ["HOST", "Embedded Linux"], ["TOOLS", "Matplotlib, Qt"]],
  },
  {
    id: "katamari",
    name: "KATAMARI",
    tagline: "Keyword spotting for edge devices",
    summary: "On-device wake word and keyword spotting on microcontrollers.",
    tags: ["AUDIO", "ML", "EMBEDDED"],
    visual: "wave",
    featured: true,
    github: "https://github.com/diegoconterno",
    overview: [
      "Katamari runs keyword spotting entirely on-device. A compact neural network listens continuously on a microcontroller and wakes the rest of the system only when it hears a known command.",
    ],
    background: [
      "Cloud-based speech recognition adds latency, cost, and privacy concerns, and it fails offline. Small devices needed a way to respond to a handful of commands with no network at all.",
    ],
    approach: [
      "Audio is captured over I2S, converted to MFCC features in fixed-point, and fed into a quantized CNN. The audio front-end and inference run in a double-buffered pipeline so no frames are missed.",
      "A Python training pipeline produces the model and generates the C headers consumed by the firmware build.",
    ],
    outcomes: [
      "Always-on listening within a tight power budget",
      "Fully offline — no audio leaves the device",
      "Reproducible training-to-firmware pipeline",
    ],
    metrics: [["<50 ms", "detection latency"], ["int8", "quantized model"], ["100%", "on-device"]],
    stack: [["LANGUAGE", "C, Python"], ["ML", "TensorFlow Lite Micro"], ["AUDIO", "I2S, MFCC"], ["MCU", "Cortex-M4F"]],
  },
  {
    id: "void",
    name: "VOID",
    tagline: "Low-latency audio effects processor",
    summary: "A hardware audio effects unit built for low latency.",
    tags: ["AUDIO", "DSP", "HARDWARE", "EXPERIMENTAL"],
    visual: "knobs",
    github: "https://github.com/diegoconterno",
    overview: [
      "VOID is a low-latency audio effects processor: reverb, delay, and modulation running on dedicated hardware with physical controls.",
    ],
    background: [
      "Most software effects chains on general-purpose computers introduce noticeable latency for live players. VOID started as a question: how low can the round trip go on cheap hardware?",
    ],
    approach: [
      "Processing runs per-sample in a tight DSP loop with small block sizes. Control inputs are read on a separate low-priority task and smoothed to avoid zipper noise.",
    ],
    outcomes: [
      "Round-trip latency low enough for live guitar",
      "Modular effect graph that can be re-patched",
      "Physical controls with smooth parameter changes",
    ],
    metrics: [["<3 ms", "round-trip latency"], ["48 kHz", "sample rate"], ["6", "effect modules"]],
    stack: [["LANGUAGE", "C++"], ["DSP", "Fixed + float"], ["HARDWARE", "Custom codec board"], ["I/O", "ADC knobs, MIDI"]],
  },
  {
    id: "flux",
    name: "FLUX",
    tagline: "Developer tooling for embedded systems",
    summary: "A CLI and CI toolkit for building, flashing, and testing firmware.",
    tags: ["TOOLS", "LINUX", "AUTOMATION"],
    visual: "code",
    github: "https://github.com/diegoconterno",
    overview: [
      "FLUX is a developer toolkit that unifies building, flashing, and testing firmware across boards behind one CLI — locally and in CI.",
    ],
    background: [
      "Every board had its own scripts, flashing tools, and tribal knowledge. Onboarding took days, and CI could not run hardware tests consistently.",
    ],
    approach: [
      "A plugin-based CLI wraps toolchains and probes behind a common interface. Hardware-in-the-loop runners expose connected boards to CI jobs, with logs captured and attached automatically.",
    ],
    outcomes: [
      "One command to build, flash, and test any supported board",
      "Hardware-in-the-loop tests running on every merge",
      "Faster onboarding for new engineers",
    ],
    metrics: [["1", "CLI for every board"], ["HIL", "tests in CI"], ["days → hrs", "onboarding time"]],
    stack: [["LANGUAGE", "Python, Bash"], ["CI", "GitHub Actions"], ["DEBUG", "OpenOCD, J-Link"], ["PLATFORM", "Linux"]],
  },
];

const CASE_SECTIONS = [
  ["overview", "OVERVIEW"],
  ["background", "BACKGROUND"],
  ["approach", "APPROACH"],
  ["results", "RESULTS"],
  ["stack", "TECH STACK"],
];

/* ── Procedural project visuals (SVG) ────────────────────────────────── */

function rng(seed) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

let uid = 0;
function visual(p) {
  const r = rng(p.id);
  const id = `v${uid++}`;
  const W = 400, H = 165;
  let body = "";

  if (p.visual === "pcb") {
    for (let i = 0; i < 26; i++) {
      const y = 8 + r() * (H - 16), x = r() * W, len = 40 + r() * 140, dy = (r() - 0.5) * 60;
      body += `<path d="M${x} ${y} h${len * 0.5} l${Math.abs(dy) * 0.6} ${dy * 0.6} h${len * 0.5}" stroke="#1f3a2b" stroke-width="${r() > 0.7 ? 2 : 1}" fill="none"/>`;
      body += `<circle cx="${x}" cy="${y}" r="2.2" fill="#0a1510" stroke="#3a5a46"/>`;
    }
    body += `<path class="trace-flow" d="M0 120 H120 L150 90 H250 L270 70 H400" stroke="#5fe39a" stroke-width="1.5" fill="none" opacity=".75"/>`;
    const chip = (x, y, w, h, pins) => {
      let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${id}g)" stroke="#45584d"/>`;
      for (let i = 0; i < pins; i++) {
        const px = x + 6 + (i * (w - 12)) / (pins - 1);
        s += `<rect x="${px - 1.5}" y="${y - 6}" width="3" height="6" fill="#b8a46a"/><rect x="${px - 1.5}" y="${y + h}" width="3" height="6" fill="#b8a46a"/>`;
      }
      return s;
    };
    body += chip(150, 42, 110, 78, 14) + chip(40, 30, 54, 40, 6) + chip(300, 96, 64, 44, 7);
    body += `<text x="205" y="86" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#7c8f84" letter-spacing="2">HYDRA-01</text>`;
    body += `<circle cx="214" cy="52" r="2" fill="#56685d"/>`;
    [[330, 30], [345, 30], [360, 30]].forEach(([x, y], i) => (body += `<circle class="led" style="--i:${i}" cx="${x}" cy="${y}" r="3.5" fill="#5fe39a"/>`));
    body = `<defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26302b"/><stop offset="1" stop-color="#121815"/></linearGradient></defs><rect width="${W}" height="${H}" fill="#07120c"/>` + body;
  }

  if (p.visual === "wave") {
    const n = 130, bw = W / n;
    const bursts = [[0.22, 0.08, 0.55], [0.45, 0.06, 1], [0.62, 0.1, 0.8], [0.84, 0.05, 0.5]];
    for (let i = 0; i < n; i++) {
      const t = i / n;
      let a = 0.05;
      for (const [c, w, k] of bursts) a += k * Math.exp(-((t - c) ** 2) / (2 * w * w));
      const h = Math.max(2, Math.min(1, a) * (H - 30) * (0.35 + r() * 0.65));
      body += `<rect style="--i:${i}" x="${i * bw + bw * 0.2}" y="${(H - h) / 2}" width="${bw * 0.6}" height="${h}" fill="url(#${id}w)"/>`;
    }
    body = `<defs><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f9bd6"/><stop offset=".5" stop-color="#c7cde8"/><stop offset="1" stop-color="#8f9bd6"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="#0a0d12"/>
      <line x1="0" y1="${H / 2}" x2="${W}" y2="${H / 2}" stroke="#2a3040" stroke-dasharray="2 4"/>
      <g class="wave">${body}</g>`;
  }

  if (p.visual === "knobs") {
    body = `<rect width="${W}" height="${H}" fill="#0b0d0c"/>`;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        const cx = 30 + col * 50 + (row % 2) * 12, cy = 30 + row * 52, rad = row === 1 ? 17 : 13;
        const ang = (-135 + r() * 270) * (Math.PI / 180);
        body += `<circle cx="${cx}" cy="${cy + 3}" r="${rad + 2}" fill="#000" opacity=".6"/>
          <circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#${id}k)" stroke="#3b403d"/>
          <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ang) * rad * 0.8}" y2="${cy - Math.cos(ang) * rad * 0.8}" stroke="#d9e2dc" stroke-width="2" stroke-linecap="round"/>`;
      }
    }
    for (let i = 0; i < 5; i++) body += `<circle class="led" style="--i:${i}" cx="${360 - i * 14}" cy="150" r="2.5" fill="${i === 0 ? "#5fe39a" : "#e3a35f"}"/>`;
    body = `<defs><radialGradient id="${id}k" cx=".35" cy=".3"><stop offset="0" stop-color="#5a605c"/><stop offset="1" stop-color="#1a1d1b"/></radialGradient></defs>` + body;
  }

  if (p.visual === "code") {
    body = `<rect width="${W}" height="${H}" fill="#070b09"/><rect width="34" height="${H}" fill="#0b120e"/>`;
    const palette = ["#3f6f55", "#5fe39a", "#6c7d73", "#8a7fd0", "#4b5a52"];
    let indent = 0;
    for (let i = 0; i < 14; i++) {
      const y = 10 + i * 11;
      body += `<text x="26" y="${y + 5}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="6" fill="#33443a">${i + 1}</text>`;
      if (r() < 0.12) continue;
      indent = Math.max(0, Math.min(3, indent + (r() < 0.3 ? 1 : r() < 0.3 ? -1 : 0)));
      let x = 44 + indent * 14;
      const parts = 1 + Math.floor(r() * 4);
      for (let k = 0; k < parts; k++) {
        const w = 12 + r() * 50;
        body += `<rect x="${x}" y="${y}" width="${w}" height="4" rx="1" fill="${palette[Math.floor(r() * palette.length)]}" opacity=".85"/>`;
        x += w + 6;
      }
      if (i === 9) body += `<rect class="led" x="${x}" y="${y - 2}" width="5" height="8" fill="#5fe39a"/>`;
    }
    body += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#${id}f)"/>`;
    body = `<defs><linearGradient id="${id}f" x1="0" x2="1"><stop offset=".55" stop-color="#070b09" stop-opacity="0"/><stop offset="1" stop-color="#070b09"/></linearGradient></defs>` + body;
  }

  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
}

/* ── Cards ───────────────────────────────────────────────────────────── */

const tagList = (tags, max = 3) => `<ul class="tags">${tags.slice(0, max).map((t) => `<li>${t}</li>`).join("")}</ul>`;

function card(p, featured) {
  return `<button class="card" data-id="${p.id}" data-tags="${p.tags.join(" ")}" aria-label="Open ${p.name} case study">
    <div class="card__media">${visual(p)}</div>
    <div class="card__body">
      <span class="card__name">${p.name}</span>
      <span class="card__tag">${p.tagline}</span>
      ${featured
        ? `${tagList(p.tags)}<span class="card__cta">VIEW CASE STUDY <span>→</span></span>`
        : `<div class="card__foot">${tagList(p.tags)}<span class="card__go" aria-hidden="true">→</span></div>`}
    </div>
  </button>`;
}

const featured = PROJECTS.filter((p) => p.featured);
document.getElementById("featured").innerHTML = featured.map((p) => card(p, true)).join("");
document.getElementById("featured-count").textContent =
  `${String(featured.length).padStart(2, "0")}/${String(PROJECTS.length).padStart(2, "0")}`;
const grid = document.getElementById("project-grid");
grid.innerHTML = PROJECTS.map((p) => card(p, false)).join("");

document.addEventListener("click", (e) => {
  const c = e.target.closest(".card");
  if (c) openCase(c.dataset.id, c);
});

/* ── Filters ─────────────────────────────────────────────────────────── */

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((b) => {
    b.classList.toggle("is-active", b === btn);
    b.setAttribute("aria-pressed", b === btn);
  });
  const f = btn.dataset.filter;
  let i = 0;
  grid.querySelectorAll(".card").forEach((c) => {
    const show = f === "all" || c.dataset.tags.split(" ").includes(f);
    c.classList.toggle("is-hidden", !show);
    c.classList.remove("is-entering");
    if (show) {
      void c.offsetWidth;
      c.style.animationDelay = `${i++ * 60}ms`;
      c.classList.add("is-entering");
    }
  });
});

/* ── Case study: card → full-screen expansion ────────────────────────── */

const caseEl = document.getElementById("case");
const caseScroll = caseEl.querySelector(".case__scroll");
const caseNav = document.getElementById("case-nav");
const caseContent = document.getElementById("case-content");
let current = null;
let sourceEl = null;
let pushed = false;
let lastFocus = null;

const insetOf = (rect) =>
  `inset(${rect.top}px ${innerWidth - rect.right}px ${innerHeight - rect.bottom}px ${rect.left}px)`;

function inViewport(el) {
  if (!el || !el.offsetParent) return false;
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight;
}

function renderCase(p) {
  const idx = PROJECTS.indexOf(p);
  document.getElementById("case-crumb").textContent = `// 03 — PROJECTS / ${p.name}`;
  document.getElementById("case-title").textContent = p.name;
  document.getElementById("case-tagline").textContent = p.summary;
  document.getElementById("case-tags").innerHTML = p.tags.map((t) => `<li>${t}</li>`).join("");
  document.getElementById("case-media").innerHTML = visual(p);
  document.getElementById("case-index").textContent =
    `${String(idx + 1).padStart(2, "0")}/${String(PROJECTS.length).padStart(2, "0")}`;
  caseNav.innerHTML = CASE_SECTIONS.map(
    ([key, label], i) =>
      `<button role="tab" data-tab="${key}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${String(i + 1).padStart(2, "0")}. ${label}</button>`
  ).join("");
  showTab("overview");
}

function showTab(key) {
  const p = current;
  const i = CASE_SECTIONS.findIndex(([k]) => k === key);
  caseNav.querySelectorAll("button").forEach((b) => {
    const on = b.dataset.tab === key;
    b.setAttribute("aria-selected", on);
    b.tabIndex = on ? 0 : -1;
  });
  const paras = (arr) => arr.map((t) => `<p>${t}</p>`).join("");
  let html = `<h3>${String(i + 1).padStart(2, "0")}. ${CASE_SECTIONS[i][1]}</h3>`;
  if (key === "overview") {
    html += paras(p.overview) +
      `<p class="case__sub">KEY OUTCOMES</p><ul class="arrows">${p.outcomes.map((o) => `<li>${o}</li>`).join("")}</ul>`;
  } else if (key === "background" || key === "approach") {
    html += paras(p[key]);
  } else if (key === "results") {
    html += `<div class="metrics">${p.metrics.map(([v, l]) => `<div><strong>${v}</strong><span>${l}</span></div>`).join("")}</div>` +
      `<p class="case__sub">KEY OUTCOMES</p><ul class="arrows">${p.outcomes.map((o) => `<li>${o}</li>`).join("")}</ul>`;
  } else if (key === "stack") {
    html += `<dl class="stack">${p.stack.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
  }
  html += `<a class="btn btn--ghost" href="${p.github}" target="_blank" rel="noopener">VIEW ON GITHUB <span aria-hidden="true">→</span></a>`;
  caseContent.innerHTML = `<div class="pane">${html}</div>`;
}

caseNav.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) showTab(b.dataset.tab);
});
caseNav.addEventListener("keydown", (e) => {
  if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
  e.preventDefault();
  const tabs = [...caseNav.querySelectorAll("button")];
  const i = tabs.indexOf(document.activeElement);
  const next = tabs[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
  next.focus();
  showTab(next.dataset.tab);
});

function openCase(id, from, { push = true } = {}) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  current = p;
  sourceEl = from || null;
  lastFocus = document.activeElement;
  renderCase(p);
  caseEl.hidden = false;
  caseScroll.scrollTop = 0;
  document.body.classList.add("is-locked");

  if (push) {
    history.pushState({ case: id }, "", `#project/${id}`);
    pushed = true;
  }

  const startRect = from && inViewport(from)
    ? from.getBoundingClientRect()
    : new DOMRect(innerWidth / 2 - 40, innerHeight / 2 - 40, 80, 80);

  if (REDUCED) {
    caseEl.classList.add("is-open");
  } else {
    caseEl.animate([{ clipPath: insetOf(startRect) }, { clipPath: "inset(0px 0px 0px 0px)" }], {
      duration: 620,
      easing: "cubic-bezier(.75,0,.2,1)",
    });
    setTimeout(() => caseEl.classList.add("is-open"), 260);
  }
  caseEl.querySelector("[data-close]").focus({ preventScroll: true });
}

async function closeCase() {
  if (caseEl.hidden) return;
  // shrink back into the card the case was opened from, or its twin in the grid
  let target = sourceEl && sourceEl.dataset.id === current.id && inViewport(sourceEl) ? sourceEl : null;
  if (!target) {
    target = grid.querySelector(`.card[data-id="${current.id}"]:not(.is-hidden)`);
    if (target) {
      document.body.classList.remove("is-locked");
      target.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }
  const endRect = target ? target.getBoundingClientRect() : new DOMRect(innerWidth / 2 - 40, innerHeight / 2 - 40, 80, 80);

  caseEl.classList.remove("is-open");
  if (!REDUCED) {
    const anim = caseEl.animate([{ clipPath: "inset(0px 0px 0px 0px)" }, { clipPath: insetOf(endRect) }], {
      duration: 520,
      easing: "cubic-bezier(.75,0,.2,1)",
      fill: "forwards",
    });
    await anim.finished.catch(() => {});
    anim.cancel();
  }
  caseEl.hidden = true;
  document.body.classList.remove("is-locked");
  (target || lastFocus)?.focus({ preventScroll: true });
}

function requestClose() {
  if (pushed && history.state && history.state.case) {
    history.back(); // popstate → closeCase
  } else {
    history.replaceState(null, "", "#projects");
    closeCase();
  }
}

function step(dir) {
  const i = (PROJECTS.indexOf(current) + dir + PROJECTS.length) % PROJECTS.length;
  current = PROJECTS[i];
  history.replaceState({ case: current.id }, "", `#project/${current.id}`);
  caseScroll.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  renderCase(current);
}

caseEl.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) requestClose();
  const s = e.target.closest("[data-step]");
  if (s) step(Number(s.dataset.step));
});

document.addEventListener("keydown", (e) => {
  if (caseEl.hidden) return;
  if (e.key === "Escape") requestClose();
  if (e.key === "Tab") {
    const f = [...caseEl.querySelectorAll("button, a[href]")].filter((el) => el.offsetParent && el.tabIndex >= 0);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

window.addEventListener("popstate", (e) => {
  const id = e.state && e.state.case;
  if (id) {
    if (caseEl.hidden) openCase(id, grid.querySelector(`.card[data-id="${id}"]`), { push: false });
  } else {
    pushed = false;
    closeCase();
  }
});

// deep link: #project/hydra
const deep = location.hash.match(/^#project\/([\w-]+)/);
if (deep && PROJECTS.some((p) => p.id === deep[1])) {
  history.replaceState({ case: deep[1] }, "", location.hash);
  openCase(deep[1], null, { push: false });
}

/* ── Nav: scrollspy + sliding indicator + mobile menu ────────────────── */

const navLinks = document.querySelectorAll("[data-nav]");
const indicator = document.querySelector(".nav__indicator");
const navList = document.getElementById("nav-links");
const toggle = document.querySelector(".nav__toggle");

function setActive(id) {
  navLinks.forEach((a) => {
    const on = a.dataset.nav === id;
    a.classList.toggle("is-active", on);
    if (on) {
      a.setAttribute("aria-current", "true");
      indicator.style.width = `${a.offsetWidth}px`;
      indicator.style.transform = `translateX(${a.offsetLeft}px)`;
    } else a.removeAttribute("aria-current");
  });
}

const spy = new IntersectionObserver(
  (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("[data-section]").forEach((s) => spy.observe(s));
setActive("home");
window.addEventListener("resize", () => {
  const a = document.querySelector("[data-nav].is-active");
  if (a) setActive(a.dataset.nav);
});

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", open);
  navList.classList.toggle("is-open", open);
});
navList.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("is-open");
  }
});

/* ── Reveal on scroll + commit log "typing" ──────────────────────────── */

const revealer = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      revealer.unobserve(en.target);
    }),
  { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
);
document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));

const commits = document.getElementById("commits");
commits.querySelectorAll("li").forEach((li, i) => (li.style.transitionDelay = `${300 + i * 220}ms`));
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    commits.classList.add("is-typed");
    obs.disconnect();
  }
}).observe(commits);

/* ── Experience timeline: line draws + nodes light as you scroll ─────── */

const timeline = document.getElementById("timeline");
const progress = timeline.querySelector(".timeline__progress");
const track = timeline.querySelector(".timeline__track");
const nodes = [...timeline.querySelectorAll(".tl-item, .tl-end")];

function updateTimeline() {
  const line = innerHeight * 0.62;
  const t = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (line - t.top) / t.height));
  progress.style.transform = `scaleY(${pct})`;
  nodes.forEach((n) => {
    const dot = n.querySelector(".tl-node").getBoundingClientRect();
    n.classList.toggle("is-lit", dot.top + dot.height / 2 < line);
  });
}
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateTimeline(); ticking = false; });
}, { passive: true });
window.addEventListener("resize", updateTimeline);
updateTimeline();

/* ── Small details ───────────────────────────────────────────────────── */

const started = Date.now();
const uptime = document.getElementById("uptime");
setInterval(() => {
  const s = Math.floor((Date.now() - started) / 1000);
  uptime.textContent = [s / 3600, (s / 60) % 60, s % 60].map((n) => String(Math.floor(n)).padStart(2, "0")).join(":");
}, 1000);

document.getElementById("year").textContent = new Date().getFullYear();

const toast = document.getElementById("toast");
document.querySelectorAll("[data-copy]").forEach((el) =>
  el.addEventListener("click", (e) => {
    if (!navigator.clipboard) return; // plain mailto
    e.preventDefault();
    navigator.clipboard.writeText(el.dataset.copy).then(
      () => {
        toast.textContent = "EMAIL COPIED TO CLIPBOARD";
        toast.classList.add("is-on");
        setTimeout(() => toast.classList.remove("is-on"), 1800);
      },
      () => (location.href = el.href)
    );
  })
);
