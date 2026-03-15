import { state }                         from "./state.js";
import { TOPIC_STARTERS, MYTH_EXAMPLES } from "./data.js";

const $ = (id) => document.getElementById(id);

function escHtml(str) {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;");
}


export function render(onCardClick) {
  renderModeButtons();
  renderInputBar();

    const container = $("body-area");
  if (state.messages.length === 0) {
    container.innerHTML = buildEmptyState();
    container.querySelectorAll("[data-question]").forEach((btn) => {
      btn.addEventListener("click", () => onCardClick(btn.dataset.question));
    });
  } else if (!$("messages-list")) {
    // Messages exist but the list isn't in the DOM yet — build it once
    container.innerHTML = `<div class="messages" id="messages-list"></div>`;
    state.messages.forEach((msg) => appendBubble(msg));
  }
}

// ── Incremental updates (used during chat) ───────────────

/** Append a single message bubble without touching the rest of the DOM */
export function appendMessage(msg) {
  ensureMessagesList();
  appendBubble(msg);
  scrollToBottom();
}

/** Show the typing indicator */
export function showTyping() {
  ensureMessagesList();
  const list = $("messages-list");
  if ($("typing-indicator")) return;  // already showing
  const el = document.createElement("div");
  el.id        = "typing-indicator";
  el.className = "msg-row bot";
  el.innerHTML = `
    <div class="avatar">🌍</div>
    <div class="typing-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `;
  list.appendChild(el);
  scrollToBottom();
}

/** Remove the typing indicator */
export function hideTyping() {
  $("typing-indicator")?.remove();
}

/** Update send button state only */
export function updateSendBtn() {
  const input   = $("chat-input");
  const sendBtn = $("send-btn");
  if (!input || !sendBtn) return;
  sendBtn.disabled = state.loading || !input.value.trim();
}

// ── Private helpers ──────────────────────────────────────

function ensureMessagesList() {
  if (!$("messages-list")) {
    $("body-area").innerHTML = `<div class="messages" id="messages-list"></div>`;
  }
}

function appendBubble(msg) {
  const list = $("messages-list");
  const el   = document.createElement("div");
  el.className = `msg-row ${msg.role === "user" ? "user" : "bot"}`;
  el.innerHTML = `
    ${msg.role === "assistant" ? `<div class="avatar">🌍</div>` : ""}
    <div class="bubble ${msg.role === "user" ? "user" : "bot"}">${escHtml(msg.display)}</div>
  `;
  list.appendChild(el);
}

function scrollToBottom() {
  const list = $("messages-list");
  if (list) list.scrollTop = list.scrollHeight;
  // also scroll the outer container
  const outer = $("body-area");
  if (outer) outer.scrollTop = outer.scrollHeight;
}

function renderModeButtons() {
  $("btn-chat").classList.toggle("active", state.mode === "chat");
  $("btn-myth").classList.toggle("active", state.mode === "myth");
}

function renderInputBar() {
  const input   = $("chat-input");
  const sendBtn = $("send-btn");
  const isMyth  = state.mode === "myth";

  input.placeholder = isMyth
    ? 'Paste a climate claim, e.g. "Electric cars are worse for the environment"'
    : "Ask anything about climate science...";

  input.classList.toggle("myth-mode", isMyth);
  sendBtn.classList.toggle("myth-mode", isMyth);
  sendBtn.textContent = isMyth ? "🔍 Check" : "↑";
  sendBtn.disabled    = state.loading || !input.value.trim();
}

// ── Empty state builders ─────────────────────────────────

function buildEmptyState() {
  const isMyth = state.mode === "myth";
  return `
    <div class="empty-state">
      <div class="empty-hero">
        <div class="hero-emoji">${isMyth ? "🔍" : "🌱"}</div>
        <h1>${isMyth ? "Bust a Climate Myth" : "What's on your mind?"}</h1>
        <p>${isMyth
          ? "Paste a climate claim you've heard — I'll tell you if it's TRUE, FALSE, or somewhere in between."
          : "Ask me anything about climate science. No question is too big or too small."
        }</p>
      </div>
      ${isMyth ? buildMythCards() : buildTopicCards()}
    </div>
  `;
}

function buildTopicCards() {
  const cards = TOPIC_STARTERS.map((t) => `
    <button class="topic-card" data-question="${escHtml(t.question)}">
      <div class="card-emoji">${t.emoji}</div>
      <div class="card-label">${t.label}</div>
      <div class="card-desc">${escHtml(t.question)}</div>
    </button>
  `).join("");
  return `
    <div class="section-label">Start with a topic</div>
    <div class="topic-grid">${cards}</div>
  `;
}

function buildMythCards() {
  const cards = MYTH_EXAMPLES.map((myth) => `
    <button class="myth-card" data-question="${escHtml(myth)}">
      <span>💬</span> "${escHtml(myth)}"
    </button>
  `).join("");
  return `
    <div class="section-label">Try one of these</div>
    <div class="myth-list">${cards}</div>
  `;
}