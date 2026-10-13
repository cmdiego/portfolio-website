/* ==========================================================================
   Diego Conterno — portfolio
   Edit PROJECTS below to change cards, case studies, and Lab entries.
   ========================================================================== */

document.documentElement.classList.add("js");

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const GH_USER = "cmdiego";
const CAREER_START = new Date(2022, 2, 1); // Honeywell, Mar 2022

/*
  kind: "professional" (Bose work) | "personal" (GitHub) | "lab" (hardware/firmware side projects)
  sections: case-study tabs. Each may have: text[], listTitle + list[], metrics[[value, label]],
            diagram (preformatted string), stack[[key, value]].
  A "lab" entry without sections shows as "write-up soon"; add sections to make it open as a case study.
*/
const PROJECTS = [
  /* ── Professional · Bose Pre-Development ───────────────────────────── */
  {
    id: "hydra",
    kind: "professional",
    name: "HYDRA",
    tagline: "Real-time wireless data collection",
    summary: "A platform that lets engineers collect real-time audio and sensor data from wearable devices.",
    tags: ["BLUETOOTH", "LINUX", "AUDIO", "TOOLS"],
    visual: "pcb",
    featured: true,
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "Hydra is an internal wireless data collection platform that lets engineers capture real-time audio and sensor data from wearable devices. I owned and enhanced it as a platform supporting all of Bose's wearable products on a shared, multi-repository software stack.",
        ],
        listTitle: "HIGHLIGHTS",
        list: [
          "High-throughput wireless transfer with BLE GATT and L2CAP services",
          "Custom Yocto-based Raspberry Pi image for one-step onboarding and updates",
          "Synchronized multi-source audio capture on the wearable firmware platform",
          "Schema-validated configuration shared between client apps and firmware",
        ],
      },
      {
        title: "WHAT I BUILT",
        list: [
          "Designed and implemented a custom peripheral application enabling engineers to collect real-time audio and sensor data from wearables",
          "Built a custom Yocto-based Raspberry Pi image to streamline developer onboarding, deployment, and software updates",
          "Developed BLE GATT and L2CAP services on Raspberry Pi using BlueZ and D-Bus for high-throughput data transfer",
          "Designed and implemented an embedded audio driver on the shared wearable firmware platform to collect synchronized data from multiple sources",
          "Automated configuration validation with Python and Pydantic, enforcing schemas and reducing configuration errors",
          "Defined shared REST APIs with DevOps to keep configuration schemas in sync between client applications and wearable firmware",
        ],
      },
      {
        title: "TECH STACK",
        stack: [["LANGUAGES", "C, Python"], ["WIRELESS", "BLE GATT, L2CAP"], ["HOST", "Raspberry Pi, BlueZ, D-Bus"], ["OS", "Yocto Embedded Linux"], ["CONFIG", "Pydantic, REST APIs"]],
      },
    ],
  },
  {
    id: "katamari",
    kind: "professional",
    name: "KATAMARI",
    tagline: "Keyword spotting for wearables",
    summary: "Turning on-device DSP keyword-spotting outputs into reliable system behavior.",
    tags: ["AUDIO", "ML", "DSP", "EMBEDDED"],
    visual: "wave",
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "Katamari brought keyword spotting to a wearable. I built the embedded layer that turns the DSP's keyword-spotting outputs into system behavior, then worked with ML and DSP engineers to make recognition reliable.",
        ],
        metrics: [["30%+", "improvement in pattern recognition performance"]],
      },
      {
        title: "WHAT I BUILT",
        list: [
          "Designed and implemented an embedded driver and event-driven state machine translating DSP keyword-spotting outputs into system behavior",
          "Collaborated with ML and DSP engineers to characterize recognition failures and improve reliability through software validation and debugging",
          "Diagnosed false-positive voice triggers and an inactive voice-processing channel using Qualcomm Kymera Audio Framework debugging and instrumentation tools",
          "Corrected audio-channel routing and supported validation of an updated ML integration",
        ],
      },
      {
        title: "RESULTS",
        metrics: [["30%+", "improvement in pattern recognition performance"]],
        listTitle: "OUTCOMES",
        list: ["Root-caused false-positive voice triggers", "Restored an inactive voice-processing channel", "Validated an updated ML integration end-to-end"],
      },
      {
        title: "TECH STACK",
        stack: [["LANGUAGE", "C"], ["AUDIO", "Qualcomm Kymera Audio Framework"], ["ARCHITECTURE", "Event-driven state machine"], ["DOMAIN", "DSP / ML keyword spotting"]],
      },
    ],
  },
  {
    id: "speak2chat",
    kind: "professional",
    name: "SPEAK2CHAT",
    tagline: "Speech detection on earbuds",
    summary: "A speech-detection prototype built into an existing earbud firmware architecture.",
    tags: ["AUDIO", "DSP", "EMBEDDED"],
    visual: "vad",
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "Speak2Chat detects when the wearer is speaking and changes earbud behavior in response. I led the embedded software architecture and implementation inside an existing earbud firmware architecture, then took it through multiple rounds of field testing.",
        ],
      },
      {
        title: "WHAT I BUILT",
        list: [
          "Led the embedded software architecture and implementation of the speech-detection prototype",
          "Integrated DSP speech-detection outputs into a hierarchical publish/subscribe state machine driving UI behavior",
          "Characterized feature power consumption and runtime performance to evaluate feasibility and optimize behavior",
          "Delivered multiple wearable prototypes for field testing, folding user feedback into each iteration",
        ],
      },
      {
        title: "TECH STACK",
        stack: [["LANGUAGE", "C"], ["ARCHITECTURE", "Hierarchical pub/sub state machine"], ["DOMAIN", "DSP speech detection"], ["VALIDATION", "Power & runtime profiling, field tests"]],
      },
    ],
  },
  {
    id: "camilo",
    kind: "professional",
    name: "CAMILO",
    tagline: "Content detection & adaptive EQ",
    summary: "A prototype that recognizes what you're listening to and adapts the headset's tuning to match.",
    tags: ["AUDIO", "ML", "BLUETOOTH"],
    visual: "eq",
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "Camilo classifies the content you're listening to and adjusts the headset's tuning to match. I built the foundational prototype architecture tying together the core control algorithms, a content classification model, and music tuning.",
          "After user research with external participants validated the experience, I presented the final prototype to senior leadership.",
        ],
      },
      {
        title: "PIPELINE",
        text: ["Simplified view of the prototype's data flow:"],
        diagram:
`macOS audio ─▶ BlackHole ─▶ JACK capture & buffering
                                   │
             ┌─────────────────────┴─────────────────────┐
             ▼                                           ▼
   content classification (ML)             metadata + audio energy
             │                                           │
             └──────────▶ multi-stage filtering ◀────────┘
                                   │
                         control algorithms
                                   │
                  host → device control (USB / Bluetooth)
                                   ▼
                            headset tuning`,
      },
      {
        title: "WHAT I BUILT",
        list: [
          "Built the foundational prototype architecture integrating control algorithms, a content classification model, and music tuning",
          "Developed a custom macOS audio pipeline with BlackHole Audio and JACK for real-time capture and buffering",
          "Designed a multi-stage filtering pipeline to stabilize ML inference outputs and improve prediction reliability",
          "Implemented metadata extraction and audio energy monitoring to improve classification accuracy",
          "Developed a host-device control layer for custom headset tuning commands over USB and Bluetooth",
          "Presented the final prototype to senior leadership after successful user research validation",
        ],
      },
      {
        title: "TECH STACK",
        stack: [["AUDIO I/O", "BlackHole, JACK (macOS)"], ["ML", "Content classification model"], ["CONTROL", "USB & Bluetooth host-device commands"], ["DSP", "Adaptive EQ / music tuning"]],
      },
    ],
  },
  {
    id: "samantha",
    kind: "professional",
    name: "SAMANTHA",
    tagline: "ChatGPT voice assistant prototype",
    summary: "Gesture-triggered ChatGPT conversations from a wearable, through a companion iPhone app.",
    tags: ["EMBEDDED", "AI", "VOICE"],
    visual: "pubsub",
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "Samantha explored a voice assistant on a wearable: a gesture starts a ChatGPT conversation that runs through a companion iPhone app. I designed the firmware messaging layer that made the integration possible.",
        ],
      },
      {
        title: "WHAT I BUILT",
        list: [
          "Architected a publish/subscribe IPC framework on the shared wearable firmware platform for voice assistant integration",
          "Delivered custom wearable firmware enabling gesture-triggered ChatGPT interactions through a companion iPhone app",
        ],
      },
      {
        title: "TECH STACK",
        stack: [["FIRMWARE", "Shared wearable platform"], ["ARCHITECTURE", "Pub/sub IPC framework"], ["COMPANION", "iPhone app"], ["ASSISTANT", "ChatGPT"]],
      },
    ],
  },

  /* ── Personal · GitHub ─────────────────────────────────────────────── */
  {
    id: "ableton-mcp",
    kind: "personal",
    repo: "ableton_live_mcp",
    name: "ABLETON LIVE MCP",
    tagline: "An AI assistant inside Ableton Live 12",
    summary: "An MCP server that lets an AI assistant organize sessions, write parts, fix mixes, and master tracks in Ableton Live 12.",
    tags: ["TOOLS", "AUDIO", "PYTHON", "AI"],
    visual: "clips",
    featured: true,
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "AbletonMCP lets an AI assistant work directly inside Ableton Live 12. Ask in plain language from Claude or any MCP client, and it organizes your session, writes parts, shapes sounds, diagnoses and fixes your mix, restructures the arrangement, and masters to a loudness target.",
          "It uses only the standard Live API and Max for Live — no plugins to buy and no patched Live.",
        ],
        listTitle: "HIGHLIGHTS",
        list: [
          "35 tools, 5 workflow prompts, and 4 resources",
          "A Max for Live analyzer records Live's real output so the assistant can check its own work",
          "Works with Claude Code, Claude Desktop, OpenCode, Codex, Copilot, Cursor, and Gemini CLI",
          "CI on every change and tagged releases",
        ],
      },
      {
        title: "ARCHITECTURE",
        text: ["Three pieces: a thin Remote Script bridge inside Live, the MCP server with all the music theory and audio logic, and an analyzer device on the master."],
        diagram:
`AI client ──MCP stdio──▶ ableton-mcp server ──JSON lines, TCP 9877──▶ Remote Script (in Live)
                                │
                                └──OSC/UDP 9879──▶ Analyzer (Max for Live, on master)`,
      },
      {
        title: "IN USE",
        text: ["Just ask in plain language — the assistant picks the tools:"],
        list: [
          "“Rename and color my tracks by instrument.”",
          "“Write a funky bassline for the chords in scene 2.”",
          "“Why does my mix sound muddy?”",
          "“Add a breakdown before the second drop.”",
        ],
      },
      {
        title: "TECH STACK",
        stack: [["LANGUAGE", "Python 3.12+, uv"], ["PROTOCOL", "Model Context Protocol (stdio)"], ["LIVE BRIDGE", "Remote Script, TCP JSON lines"], ["ANALYSIS", "Max for Live, OSC/UDP"], ["CI", "GitHub Actions"]],
      },
    ],
  },
  {
    id: "sample-manager",
    kind: "personal",
    repo: "sample-manager",
    name: "SAMPLE MANAGER",
    tagline: "Sample browser for the terminal",
    summary: "A one-stop shop for selecting, searching, and arranging audio samples — as a TUI or a standalone program.",
    tags: ["TOOLS", "AUDIO", "TUI"],
    visual: "tui",
    badge: "EARLY",
    sections: [
      {
        title: "OVERVIEW",
        text: [
          "A simple sample management tool that runs in your terminal as a TUI or as an independent program. The goal is a one-stop shop for selecting, searching, and arranging your samples however you like.",
          "This project just started, so expect it to change quickly.",
        ],
        listTitle: "GOALS",
        list: ["Fast search across sample libraries", "Select and audition samples without leaving the terminal", "Arrange and organize samples your way", "Run as a TUI or as a standalone app"],
      },
    ],
  },
  {
    id: "raylib-template",
    kind: "personal",
    repo: "raylib-cpp-game-template",
    name: "RAYLIB C++ TEMPLATE",
    tagline: "C++20 game template on raylib",
    summary: "A C++20 game template built on raylib with a scene stack, RAII resource wrappers, and a CMake build.",
    tags: ["C++20", "GAME DEV", "CMAKE"],
    visual: "game",
    sections: [
      {
        title: "OVERVIEW",
        text: ["A starting point for raylib games in modern C++. It handles the game loop, scene management, and resource lifetimes so new projects can jump straight to gameplay."],
        listTitle: "HIGHLIGHTS",
        list: [
          "Scene stack for menus, gameplay, and more",
          "RAII wrappers for raylib resources",
          "Cross-platform CMake build with helper scripts",
          "raylib vendored as a git submodule",
        ],
      },
      {
        title: "STRUCTURE",
        diagram:
`raylib-cpp-game-template/
├── assets/        images, sounds, fonts
├── include/
│   ├── core/      Game, Scene
│   ├── scenes/    scene interfaces
│   └── resources/ RAII headers
├── src/
│   ├── core/      game loop, Scene base
│   ├── resources/ RAII implementations
│   └── scenes/    Menu, Gameplay, …
├── scripts/       build.sh, run.sh
└── CMakeLists.txt`,
      },
      {
        title: "TECH STACK",
        stack: [["LANGUAGE", "C++20"], ["ENGINE", "raylib"], ["BUILD", "CMake, Bash scripts"]],
      },
    ],
  },

  /* ── Lab · hardware & firmware side projects (write-ups coming) ───── */
  {
    id: "nrf52",
    kind: "lab",
    labId: "LAB-01",
    name: "nRF52 projects",
    tagline: "Firmware side projects on Nordic nRF52 hardware",
    platform: "NORDIC NRF52",
    tags: ["FIRMWARE", "NRF52"],
    visual: "pcb",
  },
  {
    id: "stm32",
    kind: "lab",
    labId: "LAB-02",
    name: "STM32 projects",
    tagline: "Firmware side projects on STM32 microcontrollers",
    platform: "STM32",
    tags: ["FIRMWARE", "STM32"],
    visual: "pcb",
  },
];

const hasCase = (p) => Array.isArray(p.sections) && p.sections.length > 0;
const CASES = PROJECTS.filter(hasCase);
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ── Procedural project visuals (SVG) ────────────────────────────────── */

function rng(seed) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const W = 400, H = 165;
const MONO = "JetBrains Mono, monospace";

function bars(r, id, n, bursts, fill) {
  const bw = W / n;
  let s = "";
  for (let i = 0; i < n; i++) {
    const t = i / n;
    let a = 0.05;
    for (const [c, w, k] of bursts) a += k * Math.exp(-((t - c) ** 2) / (2 * w * w));
    const h = Math.max(2, Math.min(1, a) * (H - 30) * (0.35 + r() * 0.65));
    s += `<rect style="--i:${i}" x="${i * bw + bw * 0.2}" y="${(H - h) / 2}" width="${bw * 0.6}" height="${h}" fill="${fill}"/>`;
  }
  return s;
}

let uid = 0;
const VISUALS = {
  pcb(r, id, p) {
    let s = `<defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26302b"/><stop offset="1" stop-color="#121815"/></linearGradient></defs><rect width="${W}" height="${H}" fill="#07120c"/>`;
    for (let i = 0; i < 26; i++) {
      const y = 8 + r() * (H - 16), x = r() * W, len = 40 + r() * 140, dy = (r() - 0.5) * 60;
      s += `<path d="M${x} ${y} h${len * 0.5} l${Math.abs(dy) * 0.6} ${dy * 0.6} h${len * 0.5}" stroke="#1f3a2b" stroke-width="${r() > 0.7 ? 2 : 1}" fill="none"/><circle cx="${x}" cy="${y}" r="2.2" fill="#0a1510" stroke="#3a5a46"/>`;
    }
    s += `<path class="trace-flow" d="M0 120 H120 L150 90 H250 L270 70 H400" stroke="#5fe39a" stroke-width="1.5" fill="none" opacity=".75"/>`;
    const chip = (x, y, w, h, pins) => {
      let c = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${id}g)" stroke="#45584d"/>`;
      for (let i = 0; i < pins; i++) {
        const px = x + 6 + (i * (w - 12)) / (pins - 1);
        c += `<rect x="${px - 1.5}" y="${y - 6}" width="3" height="6" fill="#b8a46a"/><rect x="${px - 1.5}" y="${y + h}" width="3" height="6" fill="#b8a46a"/>`;
      }
      return c;
    };
    s += chip(150, 42, 110, 78, 14) + chip(40, 30, 54, 40, 6) + chip(300, 96, 64, 44, 7);
    s += `<text x="205" y="86" text-anchor="middle" font-family="${MONO}" font-size="11" fill="#7c8f84" letter-spacing="2">${esc(p.name.split(" ")[0].toUpperCase().slice(0, 8))}</text>`;
    [330, 345, 360].forEach((x, i) => (s += `<circle class="led" style="--i:${i}" cx="${x}" cy="30" r="3.5" fill="#5fe39a"/>`));
    return s;
  },

  wave(r, id) {
    return `<defs><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f9bd6"/><stop offset=".5" stop-color="#c7cde8"/><stop offset="1" stop-color="#8f9bd6"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="#0a0d12"/>
      <line x1="0" y1="${H / 2}" x2="${W}" y2="${H / 2}" stroke="#2a3040" stroke-dasharray="2 4"/>
      <g class="wave">${bars(r, id, 130, [[0.22, 0.08, 0.55], [0.45, 0.06, 1], [0.62, 0.1, 0.8], [0.84, 0.05, 0.5]], `url(#${id}w)`)}</g>`;
  },

  vad(r, id) {
    const segs = [[0.12, 0.3], [0.48, 0.72], [0.82, 0.93]];
    let s = `<rect width="${W}" height="${H}" fill="#08100c"/>`;
    segs.forEach(([a, b], i) => {
      s += `<rect x="${a * W}" y="14" width="${(b - a) * W}" height="${H - 28}" fill="rgba(95,227,154,.07)" stroke="#5fe39a" stroke-opacity=".5" stroke-dasharray="3 3"/>
        <text x="${a * W + 5}" y="26" font-family="${MONO}" font-size="8" fill="#5fe39a" letter-spacing="1">SPEECH_${i + 1}</text>`;
    });
    const bursts = segs.map(([a, b]) => [(a + b) / 2, (b - a) / 3.2, 0.95]);
    return s + `<g class="wave">${bars(r, id, 110, bursts, "#9fb7a8")}</g>`;
  },

  eq(r, id) {
    let s = `<defs><linearGradient id="${id}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fe39a" stop-opacity=".35"/><stop offset="1" stop-color="#5fe39a" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="#08100c"/>`;
    for (let x = 0; x <= W; x += 40) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#14231b"/>`;
    for (let y = 20; y < H; y += 25) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#14231b"/>`;
    s += `<line x1="0" y1="${H / 2}" x2="${W}" y2="${H / 2}" stroke="#27402f" stroke-dasharray="3 3"/>`;
    const pts = [];
    for (let x = 0; x <= W; x += 4) {
      const t = x / W;
      const y = H / 2 - 34 * Math.exp(-((t - 0.12) ** 2) / 0.006) + 16 * Math.exp(-((t - 0.45) ** 2) / 0.01) - 24 * Math.exp(-((t - 0.8) ** 2) / 0.008);
      pts.push(`${x},${y.toFixed(1)}`);
    }
    s += `<path d="M0,${H} L${pts.join(" L")} L${W},${H} Z" fill="url(#${id}e)"/><polyline points="${pts.join(" ")}" fill="none" stroke="#5fe39a" stroke-width="2"/>`;
    [[0.12, -34], [0.45, 16], [0.8, -24]].forEach(([t, d], i) => (s += `<circle class="led" style="--i:${i}" cx="${t * W}" cy="${H / 2 + d}" r="5" fill="#08100c" stroke="#5fe39a" stroke-width="2"/>`));
    s += `<rect x="${W - 132}" y="10" width="122" height="20" fill="#0d1813" stroke="#27402f"/><text x="${W - 124}" y="24" font-family="${MONO}" font-size="9" fill="#8b9c92">CONTENT: <tspan fill="#5fe39a">MUSIC</tspan></text>`;
    return s;
  },

  pubsub() {
    const subs = ["GESTURE", "AUDIO", "UI", "APP LINK"];
    let s = `<rect width="${W}" height="${H}" fill="#08100c"/>
      <line x1="30" y1="${H / 2}" x2="${W - 30}" y2="${H / 2}" stroke="#27402f" stroke-width="6"/>
      <line class="trace-flow" x1="30" y1="${H / 2}" x2="${W - 30}" y2="${H / 2}" stroke="#5fe39a" stroke-width="2"/>
      <text x="30" y="${H / 2 - 10}" font-family="${MONO}" font-size="8" fill="#56685d" letter-spacing="1">IPC BUS</text>`;
    subs.forEach((n, i) => {
      const x = 60 + i * 92, up = i % 2 === 0, y = up ? 22 : H - 46;
      s += `<line x1="${x + 30}" y1="${up ? y + 24 : y}" x2="${x + 30}" y2="${H / 2}" stroke="#3a5a46" stroke-dasharray="2 3"/>
        <rect x="${x}" y="${y}" width="60" height="24" fill="#0d1813" stroke="#27402f"/>
        <text x="${x + 30}" y="${y + 15}" text-anchor="middle" font-family="${MONO}" font-size="8" fill="#c9d6ce">${n}</text>
        <circle class="led" style="--i:${i}" cx="${x + 30}" cy="${H / 2}" r="4" fill="#5fe39a"/>`;
    });
    return s;
  },

  clips(r) {
    const colors = ["#ff7d4d", "#f7c948", "#a3e05f", "#5fe3c9", "#6fa8ff", "#c38cff", "#ff8cc6", "#9fb7a8"];
    let s = `<rect width="${W}" height="${H}" fill="#121212"/>`;
    const cols = 8, rows = 6, cw = 44, ch = 19, gx = 6, ox = 18, oy = 12;
    for (let c = 0; c < cols; c++) {
      s += `<rect x="${ox + c * (cw + gx)}" y="${oy}" width="${cw}" height="10" fill="${colors[c]}" opacity=".9"/>`;
      for (let rr = 0; rr < rows - 1; rr++) {
        const x = ox + c * (cw + gx), y = oy + 16 + rr * (ch + 5);
        if (r() < 0.32) {
          s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="#1e1e1e" stroke="#2a2a2a"/><rect x="${x + 4}" y="${y + 7}" width="5" height="5" fill="#3a3a3a"/>`;
        } else {
          const playing = rr === 1 + (c % 3);
          s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="${colors[c]}" opacity="${playing ? 1 : 0.55}"/>
            <path d="M${x + 4} ${y + 5} l6 4.5 -6 4.5z" fill="#121212"/>`;
          if (playing) s += `<rect class="led" style="--i:${c}" x="${x}" y="${y + ch - 2}" width="${cw}" height="2" fill="#fff"/>`;
        }
      }
    }
    return s;
  },

  tui(r) {
    const files = ["kick_tight_01.wav", "snare_vinyl_03.wav", "hat_open_02.wav", "pad_warm_C.wav", "bass_808_F.wav", "vox_chop_05.wav", "perc_shaker.wav"];
    let s = `<rect width="${W}" height="${H}" fill="#070b09"/><rect x="8" y="8" width="${W - 16}" height="${H - 16}" fill="none" stroke="#27402f"/>
      <text x="76" y="22" font-family="${MONO}" font-size="8" fill="#56685d">~/library/drums  /search: _</text>
      <line x1="200" y1="28" x2="200" y2="${H - 8}" stroke="#27402f"/>`;
    files.forEach((f, i) => {
      const y = 40 + i * 15, sel = i === 2;
      if (sel) s += `<rect x="12" y="${y - 9}" width="184" height="13" fill="#5fe39a"/>`;
      s += `<text x="18" y="${y}" font-family="${MONO}" font-size="8.5" fill="${sel ? "#052012" : "#a9b8af"}">${sel ? "▶ " : "  "}${f}</text>`;
    });
    for (let i = 0; i < 60; i++) {
      const h = 4 + Math.abs(Math.sin(i * 0.35)) * 40 * (0.4 + r() * 0.6) * Math.exp(-i / 40);
      s += `<rect x="${210 + i * 3}" y="${78 - h / 2}" width="2" height="${h}" fill="#5fe39a" opacity=".8"/>`;
    }
    s += `<text x="210" y="122" font-family="${MONO}" font-size="8" fill="#56685d">44.1k · 24bit · 0.42s</text><text x="210" y="136" font-family="${MONO}" font-size="8" fill="#56685d">[space] play  [a] add</text>`;
    return s;
  },

  game(r) {
    let s = `<rect width="${W}" height="${H}" fill="#0c1420"/>`;
    for (let i = 0; i < 40; i++) s += `<rect x="${Math.floor(r() * W)}" y="${Math.floor(r() * 90)}" width="2" height="2" fill="#c7cde8" opacity="${0.3 + r() * 0.6}"/>`;
    s += `<rect x="300" y="34" width="24" height="24" fill="#f7e7a6"/><rect x="306" y="34" width="18" height="18" fill="#0c1420"/>`;
    const t = 16;
    for (let x = 0; x < W; x += t) {
      const hgt = x > 140 && x < 220 ? 3 : 2;
      for (let k = 0; k < hgt; k++) {
        const y = H - t * (k + 1);
        s += `<rect x="${x}" y="${y}" width="${t}" height="${t}" fill="${k === hgt - 1 ? "#5fe39a" : "#2a6a47"}" stroke="#08100c"/>`;
      }
    }
    s += `<rect x="96" y="${H - 64}" width="48" height="12" fill="#3a5a46" stroke="#08100c"/>`;
    [[110, H - 80], [250, H - 72], [272, H - 72]].forEach(([x, y], i) => (s += `<circle class="led" style="--i:${i}" cx="${x}" cy="${y}" r="4" fill="#f7c948"/>`));
    s += `<rect x="60" y="${H - 56}" width="16" height="24" fill="#ff7d4d"/><rect x="66" y="${H - 52}" width="6" height="4" fill="#0c1420"/>
      <text x="${W - 12}" y="20" text-anchor="end" font-family="${MONO}" font-size="9" fill="#c7cde8">SCENE: GAMEPLAY</text>`;
    return s;
  },
};

function visual(p) {
  const id = `v${uid++}`;
  const body = (VISUALS[p.visual] || VISUALS.pcb)(rng(p.id), id, p);
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
}

/* ── Cards ───────────────────────────────────────────────────────────── */

const tagList = (tags, max = 3) => `<ul class="tags">${tags.slice(0, max).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
const badgeFor = (p) => (p.kind === "professional" ? "BOSE" : p.kind === "personal" ? "GITHUB" : "LAB");

function card(p, featured) {
  const live = p.repo ? `<span class="card__live" data-repo="${p.repo}"></span>` : `<span class="card__live">BOSE PRE-DEVELOPMENT · INTERNAL</span>`;
  return `<button class="card" data-id="${p.id}" data-kind="${p.kind}" data-tags="${p.tags.join(" ")}" aria-label="Open ${esc(p.name)} case study">
    <div class="card__media">${visual(p)}<span class="card__badge card__badge--${p.kind}">${badgeFor(p)}</span>${p.badge ? `<span class="card__badge card__badge--alt">${p.badge}</span>` : ""}</div>
    <div class="card__body">
      <span class="card__name">${esc(p.name)}</span>
      <span class="card__tag">${esc(p.tagline)}</span>
      ${featured
        ? `${tagList(p.tags)}<span class="card__cta">VIEW CASE STUDY <span>→</span></span>`
        : `<div class="card__foot">${tagList(p.tags)}<span class="card__go" aria-hidden="true">→</span></div>`}
      <div class="card__meta">${live}</div>
    </div>
  </button>`;
}

const featured = PROJECTS.filter((p) => p.featured);
const gridProjects = PROJECTS.filter((p) => p.kind !== "lab" && hasCase(p));
document.getElementById("featured").innerHTML = featured.map((p) => card(p, true)).join("");
document.getElementById("featured-count").textContent = `${pad(featured.length)}/${pad(gridProjects.length)}`;
const grid = document.getElementById("project-grid");
grid.innerHTML = gridProjects.map((p) => card(p, false)).join("");

/* Lab table */
const labList = document.getElementById("lab-list");
labList.innerHTML = PROJECTS.filter((p) => p.kind === "lab").map((p) => {
  const ready = hasCase(p);
  const tag = ready ? "button" : "div";
  return `<li><${tag} class="lab__row${ready ? " lab__row--link" : ""}" ${ready ? `data-open="${p.id}"` : ""}>
      <span class="lab__id">${p.labId}</span>
      <span class="lab__name">${esc(p.name)}<em>${esc(p.tagline)}</em></span>
      <span class="lab__stack">${esc(p.platform)}</span>
      <span class="lab__status${ready ? " lab__status--live" : ""}">${ready ? "→ READ" : "◐ WRITE-UP SOON"}</span>
    </${tag}></li>`;
}).join("");

document.addEventListener("click", (e) => {
  const c = e.target.closest(".card, [data-open]");
  if (c) openCase(c.dataset.id || c.dataset.open, c);
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
    const show = f === "all" || c.dataset.kind === f || c.dataset.tags.split(" ").includes(f);
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

const CRUMB = { professional: "PROFESSIONAL / BOSE", personal: "PERSONAL / GITHUB", lab: "LAB" };
const NOTE = {
  professional: "Internal Bose prototype — described at a high level, without proprietary details.",
  personal: "",
  lab: "Personal side project — separate from my professional work.",
};

function renderCase(p) {
  const idx = CASES.indexOf(p);
  document.getElementById("case-crumb").textContent = `// ${CRUMB[p.kind]} / ${p.name}`;
  document.getElementById("case-title").textContent = p.name;
  document.getElementById("case-tagline").textContent = p.summary || p.tagline;
  document.getElementById("case-tags").innerHTML = p.tags.map((t) => `<li>${esc(t)}</li>`).join("");
  document.getElementById("case-note").textContent = NOTE[p.kind];
  document.getElementById("case-media").innerHTML = visual(p);
  document.getElementById("case-index").textContent = `${pad(idx + 1)}/${pad(CASES.length)}`;
  caseNav.innerHTML = p.sections.map(
    (s, i) => `<button role="tab" data-tab="${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${pad(i + 1)}. ${esc(s.title)}</button>`
  ).join("");
  showTab(0);
}

function showTab(i) {
  const p = current;
  const s = p.sections[i];
  caseNav.querySelectorAll("button").forEach((b) => {
    const on = Number(b.dataset.tab) === i;
    b.setAttribute("aria-selected", on);
    b.tabIndex = on ? 0 : -1;
  });
  let html = `<h3>${pad(i + 1)}. ${esc(s.title)}</h3>`;
  if (s.text) html += s.text.map((t) => `<p>${esc(t)}</p>`).join("");
  if (s.metrics) html += `<div class="metrics">${s.metrics.map(([v, l]) => `<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join("")}</div>`;
  if (s.diagram) html += `<pre class="diagram">${esc(s.diagram)}</pre>`;
  if (s.list) html += `${s.listTitle ? `<p class="case__sub">${esc(s.listTitle)}</p>` : ""}<ul class="arrows">${s.list.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`;
  if (s.stack) html += `<dl class="stack">${s.stack.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
  if (p.repo) html += `<a class="btn btn--ghost" href="https://github.com/${GH_USER}/${p.repo}" target="_blank" rel="noopener">VIEW ON GITHUB <span aria-hidden="true">↗</span></a>`;
  caseContent.innerHTML = `<div class="pane">${html}</div>`;
}

caseNav.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) showTab(Number(b.dataset.tab));
});
caseNav.addEventListener("keydown", (e) => {
  if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
  e.preventDefault();
  const tabs = [...caseNav.querySelectorAll("button")];
  const i = tabs.indexOf(document.activeElement);
  const next = tabs[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
  next.focus();
  showTab(Number(next.dataset.tab));
});

function openCase(id, from, { push = true } = {}) {
  const p = CASES.find((x) => x.id === id);
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
  // shrink back into whatever opened it, or the matching card in the grid
  const matches = (el) => el && (el.dataset.id || el.dataset.open) === current.id;
  let target = matches(sourceEl) && inViewport(sourceEl) ? sourceEl : null;
  if (!target) {
    target = grid.querySelector(`.card[data-id="${current.id}"]:not(.is-hidden)`) ||
      document.querySelector(`[data-open="${current.id}"]`);
    if (target && target.offsetParent) {
      document.body.classList.remove("is-locked");
      target.scrollIntoView({ block: "center", behavior: "instant" });
    } else target = null;
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
  const i = (CASES.indexOf(current) + dir + CASES.length) % CASES.length;
  current = CASES[i];
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
if (deep && CASES.some((p) => p.id === deep[1])) {
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
function staggerCommits() {
  commits.querySelectorAll("li").forEach((li, i) => (li.style.transitionDelay = `${300 + i * 220}ms`));
}
staggerCommits();
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    commits.classList.add("is-typed");
    obs.disconnect();
  }
}).observe(commits);

/* ── Experience timeline: line draws, nodes light, details expand ────── */

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

timeline.addEventListener("click", (e) => {
  const btn = e.target.closest(".tl-toggle");
  if (!btn) return;
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", open);
  btn.closest(".tl-item").classList.toggle("is-open", open);
  btn.lastChild.textContent = open ? " LESS" : " DETAILS";
});
timeline.addEventListener("transitionend", (e) => e.target.classList.contains("tl-details") && updateTimeline());

/* ── Live GitHub data: recent commits, current repo, card stats ──────── */

const CACHE_KEY = "gh-cache-v1";
const CACHE_TTL = 15 * 60 * 1000;

function ago(iso) {
  const s = (Date.now() - new Date(iso)) / 1000;
  const units = [[31536000, "y"], [2592000, "mo"], [86400, "d"], [3600, "h"], [60, "m"]];
  for (const [n, u] of units) if (s >= n) return `${Math.floor(s / n)}${u} ago`;
  return "just now";
}

async function fetchGitHub() {
  const get = (path) => fetch(`https://api.github.com${path}`, { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  const repos = (await get(`/users/${GH_USER}/repos?sort=pushed&per_page=20&type=owner`)).filter((r) => !r.fork);
  const recent = repos.slice(0, 4);
  const lists = await Promise.all(recent.map((r) => get(`/repos/${GH_USER}/${r.name}/commits?per_page=5`).catch(() => [])));
  const commitsOut = lists.flatMap((list, i) => list
    .filter((c) => (c.parents || []).length < 2) // skip merge commits
    .map((c) => ({
      sha: c.sha.slice(0, 7),
      msg: c.commit.message.split("\n")[0],
      repo: recent[i].name,
      date: c.commit.author.date,
      url: c.html_url,
    })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);
  return {
    at: Date.now(),
    repos: repos.map((r) => ({ name: r.name, stars: r.stargazers_count, pushed: r.pushed_at, url: r.html_url })),
    commits: commitsOut,
  };
}

function renderGitHub(data, live) {
  if (data.commits.length) {
    commits.innerHTML = data.commits.map((c) =>
      `<li><a class="hash" href="${esc(c.url)}" target="_blank" rel="noopener">${c.sha}</a><span class="commit__msg">${esc(c.msg)}</span><span class="commit__repo">${esc(c.repo)} · ${ago(c.date)}</span></li>`
    ).join("");
    staggerCommits();
  }
  const badge = document.getElementById("commits-badge");
  badge.textContent = live ? "● LIVE" : "CACHED";
  badge.classList.toggle("is-live", live);

  const now = data.repos.find((r) => r.name !== "portfolio-website");
  if (now) {
    const a = document.getElementById("now-repo");
    a.textContent = now.name;
    a.href = now.url;
    a.title = `last push ${ago(now.pushed)}`;
  }
  document.querySelectorAll(".card__live[data-repo]").forEach((el) => {
    const r = data.repos.find((x) => x.name === el.dataset.repo);
    if (r) el.textContent = `★ ${r.stars} · PUSHED ${ago(r.pushed).toUpperCase()}`;
  });
}

(async () => {
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)); } catch { /* storage unavailable */ }
  if (cached) renderGitHub(cached, Date.now() - cached.at < CACHE_TTL);
  if (cached && Date.now() - cached.at < CACHE_TTL) return;
  try {
    const data = await fetchGitHub();
    renderGitHub(data, true);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  } catch {
    // rate-limited or offline: keep the static fallback / cached data
  }
})();

/* ── Small details ───────────────────────────────────────────────────── */

(() => {
  const now = new Date();
  const months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + now.getMonth() - CAREER_START.getMonth();
  document.getElementById("tenure").textContent = `${Math.floor(months / 12)}y ${months % 12}m · since Mar 2022`;
})();

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
