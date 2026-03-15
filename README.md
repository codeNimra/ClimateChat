# 🌍 ClimaChat — AI Climate Education for Students

> An AI-powered climate science tutor built for students aged 13–20. Ask anything about climate change, or bust common myths powered by Featherless AI.

![ClimaChat](https://img.shields.io/badge/Climate-Education-22c55e?style=for-the-badge&logo=leaf)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-f7df1e?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

- 💬 **Ask Mode**  Ask any climate science question in plain language
- 🔍 **Myth Buster Mode**  Paste a climate claim and get a TRUE / FALSE / PARTLY TRUE verdict
- 🌿 **Topic Cards**  Quick-start buttons for Global Warming, Clean Energy, Biodiversity & more
- ⚡ **Instant responses**  Incremental DOM updates, no page reloads
- 📱 **Fully responsive**  Works on mobile, tablet and desktop
- 🎨 **Dark forest theme**  Beautiful, student-friendly UI

---

## 🚀 Live Demo

🔗 **[https://codenimra.github.io/ClimateChat](https://codenimra.github.io/ClimateChat)**

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Vanilla JavaScript (ES Modules)     |
| Bundler    | Vite 5                              |
| AI Model   | Qwen 2.5 7B via Featherless AI      |
| Styling    | Pure CSS with CSS Variables         |
| Fonts      | Playfair Display + DM Sans          |
| Deploy     | GitHub Pages via gh-pages           |

---

## 📁 Project Structure

```
ClimateChat/
├── index.html              # App shell
├── vite.config.js          # Vite config
├── package.json
├── .gitignore
└── src/
    ├── main.js             # Entry point, event listeners
    ├── config.js           # API key & model settings (gitignored)
    ├── api.js              # Featherless AI API call
    ├── render.js           # DOM rendering functions
    ├── state.js            # App state
    ├── data.js             # Topics, myths, system prompt
    └── style.css           # All styles
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/codeNimra/ClimateChat.git
cd ClimateChat
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API key

Create `src/config.js`:
```js
export const CONFIG = {
  API_KEY:    "your-featherless-api-key",
  MODEL:      "Qwen/Qwen2.5-7B-Instruct",
  MAX_TOKENS: 1000,
  API_URL:    "https://api.featherless.ai/v1/chat/completions",
};
```

> Get a free API key at [featherless.ai](https://featherless.ai)

### 4. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 🌱 Social Impact

ClimaChat is built for the **GenAI Devs Hackathon** under the theme *Code with Purpose. Build for Humanity.*

Climate change is one of the most pressing issues of our time, yet many students find climate science intimidating or confusing. ClimaChat bridges this gap by making climate education:

- **Accessible** available 24/7, completely free
- **Engaging** conversational AI instead of textbooks
- **Empowering** students learn facts to fight misinformation

---

## 📜 License

MIT free to use, modify and distribute.

---

<div align="center">
  Built with 💚 for the planet · <a href="https://featherless.ai">Powered by Featherless AI</a>
</div>