<div align="center">

# Tsuki — Interactive Operator Console

<a href="https://www.tsukiai.to"><img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=20&pause=900&center=true&vCenter=true&width=780&lines=Real-time+Live2D+Operator+Console;Premium+Chat+UI+%E2%80%A2+60+FPS+Render+Loop;Privacy-first+%E2%80%A2+Keys+stay+local+in+your+browser;Next.js+15+%E2%80%A2+PixiJS+8+%E2%80%A2+Cubism+SDK+5" alt="Typing SVG" /></a>

<p>
  <a href="https://www.tsukiai.to"><img src="https://img.shields.io/badge/Site-tsukiai.to-111111?style=for-the-badge" /></a>
  <a href="https://www.tsukiai.to/docs"><img src="https://img.shields.io/badge/Docs-Architecture%20%26%20Pipeline-111111?style=for-the-badge" /></a>
  <a href="https://x.com/TsukiChan_AI"><img src="https://img.shields.io/badge/X-@TsukiChan__AI-111111?style=for-the-badge" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-15%20(App%20Router)-222222?style=flat-square" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-222222?style=flat-square" />
  <img src="https://img.shields.io/badge/TailwindCSS-UI-222222?style=flat-square" />
  <img src="https://img.shields.io/badge/Framer%20Motion-Animations-222222?style=flat-square" />
  <img src="https://img.shields.io/badge/PixiJS-8.x-222222?style=flat-square" />
  <img src="https://img.shields.io/badge/Cubism%20SDK-5.x-222222?style=flat-square" />
  <img src="https://img.shields.io/badge/WebGL-2.0-222222?style=flat-square" />
</p>

**Tsuki** is an interactive operator console featuring a real-time animated **Live2D** interface, a premium chat experience, and an extensible app shell of productivity tools.  
Built to feel like a **dense console dashboard**—smooth cursor tracking, responsive UI, and privacy-first key handling.

</div>

---

## ✦ What’s inside

### Live2D Visualization (60 FPS)
- High-fidelity Live2D rendering with real-time cursor tracking
- Smooth motion via input normalization → easing → lerp interpolation → parameter mapping
- WebGL 2.0 rendering via PixiJS + Cubism

### Premium Chat UI (Session Persistent)
- Real-time message rendering
- Typing indicator + animated UI polish
- Session persistence via browser storage

### App Shell Tools (Extensible UI)
Includes an app shell designed for tool expansion:
- Manga Studio
- Website Builder
- Web Scanner
- Discord Bot
- Knowledge Base
- Asset Forge
- Prompt Library
- Workflows
- Settings
- Diagnostics

> Note: Some tools / chat backends may be stubbed or “Coming Soon” depending on the current release.

---

## 🧱 Architecture (High Level)

**Layered design** separating rendering, state, and persistence:

- **Client Layer:** Live2D • PixiJS • React  
- **Processing Layer:** Cursor Tracking • RAF loop • Interpolation (lerp)  
- **Storage Layer:** localStorage • IndexedDB (where applicable)

---

## 🔐 Security & Privacy

Tsuki is built **privacy-first**:
- API keys are stored **locally in your browser** (localStorage)
- No server-side session storage by default
- Tracking data stays in memory (runtime only)
- Clear data anytime via **Settings → Reset All**

---

## 📁 Live2D Model Setup

Tsuki expects a Live2D model entry file (`.model3.json`).

**Default path expectation:**
- `public/live2d/koshino/<your-model>.model3.json`

If your model isn’t loading:
- Confirm the `.model3.json` exists and references correct texture/moc files
- Confirm the folder is publicly reachable (Next.js `public/`)
- Verify case-sensitive filenames (important on Linux deployments)

---

## 🚀 Getting Started (Local Dev)

> These commands are typical for a Next.js + TS repo. If your repo uses different scripts, adjust accordingly.

```bash
# install
npm install

# dev
npm run dev

# production
npm run build
npm run start
