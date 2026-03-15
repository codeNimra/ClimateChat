"use strict";

// ── Constants ──────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are ClimaChat, a friendly and knowledgeable climate science tutor designed specifically for students aged 13–20. Your job is to make climate science exciting, clear, and approachable.

Guidelines:
- Use simple, engaging language appropriate for teenagers
- Use relatable analogies and real-world examples
- Be encouraging and curious in tone — like a cool science teacher
- Keep answers concise (3–5 sentences for simple questions, a bit longer for complex ones)
- Use emojis sparingly but effectively to make responses lively
- When relevant, offer a follow-up "Did you know?" fun fact
- In MYTH BUSTER mode: clearly label the claim as TRUE, FALSE, or PARTLY TRUE, then explain why with evidence

You care deeply about the planet and want students to feel empowered, not hopeless.`;

const TOPIC_STARTERS = [
  { emoji: "🌡️", label: "Global Warming",  question: "What actually causes global warming, and why does it matter?" },
  { emoji: "🌊", label: "Rising Seas",      question: "Why are sea levels rising and which places are most at risk?" },
  { emoji: "🌿", label: "Carbon Sinks",     question: "What are carbon sinks and why are forests so important?" },
  { emoji: "⚡",  label: "Clean Energy",     question: "How does solar energy work and can it power the whole world?" },
  { emoji: "🐝",  label: "Biodiversity",     question: "How does climate change affect animals and ecosystems?" },
  { emoji: "🌾",  label: "Food & Farming",   question: "How does climate change threaten our food supply?" },
];

const MYTH_EXAMPLES = [
  "Climate change is natural and has nothing to do with humans.",
  "It's too cold outside, so global warming isn't real.",
  "CO2 is plant food, so more of it is actually good.",
  "Scientists disagree about whether climate change is happening.",
];

// ── State ───────────────────────────────────────────────────────────────────

let state = {
  messages: [],   // { role, display, content }
  mode:     "chat",  // "chat" | "myth"
  loading:  false,
};


const $ = id => document.getElementById(id);


function render() {
  renderModeBar();
  renderBody();
  renderInputBar();
}

function renderModeBar() {
  $("btn-chat").classList.toggle("active", state.mode === "chat");
  $("btn-myth").classList.toggle("active", state.mode === "myth");
}

function renderBody() {
  const container = $("body-area");

  if (state.messages.length === 0) {
    container.innerHTML = buildEmptyState();
    // Attach topic/myth card listeners
    container.querySelectorAll("[data-question]").forEach(btn => {
      btn.addEventListener("click", () => sendMessage(btn.dataset.question));
    });
  } else {
    container.innerHTML = buildMessages();
    container.querySelector("#scroll-anchor")?.scrollIntoView({ behavior: "smooth" });
  }
}

function renderInputBar() {
  const input     = $("chat-input");
  const sendBtn   = $("send-btn");
  const isMythMode = state.mode === "myth";

  input.placeholder = isMythMode
    ? 'Paste a climate claim, e.g. "Electric cars are worse for the environment"'
    : "Ask anything about climate science...";

  input.classList.toggle("myth-mode", isMythMode);
  sendBtn.classList.toggle("myth-mode", isMythMode);
  sendBtn.innerHTML  = isMythMode ? "🔍 Check" : "↑";
  sendBtn.disabled   = state.loading || !input.value.trim();
}

// ── HTML builders ─────────────────────────────────────────────────────────────

function buildEmptyState() {
  const isMyth = state.mode === "myth";
  return `
    <div class="empty-state">
      <div class="empty-hero">
        <div class="emoji">${isMyth ? "🔍" : "🌱"}</div>
        <h1>${isMyth ? "Bust a Climate Myth" : "What's on your mind?"}</h1>
        <p>${isMyth
          ? "Paste a climate claim you've heard — I'll tell you if it's TRUE, FALSE, or somewhere in between."
          : "Ask me anything about climate science. No question is too big or too small."
        }</p>
      </div>

      ${isMyth ? `
        <div class="section-label">Try one of these</div>
        <div class="myth-list">
          ${MYTH_EXAMPLES.map(m => `
            <button class="myth-card" data-question="${escHtml(m)}">
              <span>💬</span> "${escHtml(m)}"
            </button>
          `).join("")}
        </div>
      ` : `
        <div class="section-label">Start with a topic</div>
        <div class="topic-grid">
          ${TOPIC_STARTERS.map(t => `
            <button class="topic-card" data-question="${escHtml(t.question)}">
              <div class="card-emoji">${t.emoji}</div>
              <div class="card-label">${t.label}</div>
              <div class="card-desc">${escHtml(t.question)}</div>
            </button>
          `).join("")}
        </div>
      `}
    </div>
  `;
}

function buildMessages() {
  const rows = state.messages.map(msg => `
    <div class="msg-row ${msg.role === "user" ? "user" : "bot"}">
      ${msg.role === "assistant" ? `<div class="avatar">🌍</div>` : ""}
      <div class="bubble ${msg.role === "user" ? "user" : "bot"}">${escHtml(msg.display)}</div>
    </div>
  `).join("");

  const typingDots = state.loading ? `
    <div class="msg-row bot">
      <div class="avatar">🌍</div>
      <div class="typing-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  ` : "";

  return `
    <div class="messages">
      ${rows}
      ${typingDots}
      <div id="scroll-anchor"></div>
    </div>
  `;
}

// ── API call ──────────────────────────────────────────────────────────────────

async function sendMessage(userText) {
  if (!userText.trim() || state.loading) return;

  // Guard: key not set
  if (!CONFIG.API_KEY || CONFIG.API_KEY === "YOUR_FEATHERLESS_API_KEY_HERE") {
    alert("⚠️ Please open config.js and replace YOUR_FEATHERLESS_API_KEY_HERE with your real Featherless API key.\n\nGet one free at: https://featherless.ai");
    return;
  }

  const apiText = state.mode === "myth"
    ? `[MYTH BUSTER MODE] Please fact-check this climate claim: "${userText}"`
    : userText;

  state.messages.push({ role: "user", display: userText, content: apiText });
  state.loading = true;
  $("chat-input").value = "";
  render();

  try {
    // Build messages with system prompt first (OpenAI-compatible format)
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...state.messages.map(m => ({ role: m.role, content: m.content })),
    ];

    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CONFIG.API_KEY}`,
      },
      body: JSON.stringify({
        model:      CONFIG.MODEL,
        max_tokens: CONFIG.MAX_TOKENS,
        messages:   apiMessages,
      }),
    });

    const data = await res.json();

    // API returned an error object (e.g. invalid key, quota exceeded)
    if (data.error) {
      const errMsg = data.error.message || "Unknown API error";
      state.messages.push({
        role: "assistant",
        display: `❌ API Error: ${errMsg}\n\nMake sure your key in config.js is correct.`,
        content: "",
      });
    } else {
      // OpenAI-compatible response: choices[0].message.content
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      state.messages.push({ role: "assistant", display: reply, content: reply });
    }

  } catch (err) {
    state.messages.push({
      role: "assistant",
      display: `❌ Network error: ${err.message}\n\n💡 Make sure you're running via: npx serve .`,
      content: "",
    });
  }

  state.loading = false;
  render();
}

// ── Event listeners ───────────────────────────────────────────────────────────

function init() {
  $("btn-chat").addEventListener("click", () => { state.mode = "chat"; render(); });
  $("btn-myth").addEventListener("click", () => { state.mode = "myth"; render(); });

  $("send-btn").addEventListener("click", () => {
    sendMessage($("chat-input").value);
  });

  $("chat-input").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage($("chat-input").value);
    }
  });

  // Keep send button state in sync with input
  $("chat-input").addEventListener("input", () => {
    $("send-btn").disabled = state.loading || !$("chat-input").value.trim();
  });

  render();
}

// ── Utils ─────────────────────────────────────────────────────────────────────

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", init);