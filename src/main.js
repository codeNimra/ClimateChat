import "./style.css";
import { CONFIG }                                      from "./config.js";
import { state }                                       from "./state.js";
import { fetchAIReply }                                from "./api.js";
import { render, appendMessage, showTyping, hideTyping, updateSendBtn } from "./render.js";

const $ = (id) => document.getElementById(id);

function isKeyMissing() {
  return !CONFIG.API_KEY || CONFIG.API_KEY === "your-featherless-key-here";
}

async function sendMessage(userText) {
  if (!userText.trim() || state.loading) return;

  if (isKeyMissing()) {
    alert("⚠️ Add VITE_API_KEY to your .env file.\n\nGet a free key at: https://featherless.ai");
    return;
  }

  const apiContent = state.mode === "myth"
    ? `[MYTH BUSTER MODE] Please fact-check this climate claim: "${userText}"`
    : userText;

  const userMsg = { role: "user", display: userText, content: apiContent };
  state.messages.push(userMsg);
  state.loading         = true;
  $("chat-input").value = "";
  updateSendBtn();

  // ✅ Append user bubble instantly — no full rebuild
  appendMessage(userMsg);
  showTyping();

  try {
    const reply = await fetchAIReply(state.messages);
    const botMsg = { role: "assistant", display: reply, content: reply };
    state.messages.push(botMsg);
    hideTyping();
    appendMessage(botMsg);
  } catch (err) {
    const hint = err.message.includes("403")
      ? "💡 403 = model not available on your plan. Try a smaller model in src/config.js."
      : "💡 Check your VITE_API_KEY in .env is correct.";
    const errMsg = { role: "assistant", display: `❌ ${err.message}\n\n${hint}`, content: "" };
    state.messages.push(errMsg);
    hideTyping();
    appendMessage(errMsg);
  }

  state.loading = false;
  updateSendBtn();
}

function init() {
  // Mode toggle — full re-render only on mode switch
  $("btn-chat").addEventListener("click", () => {
    if (state.mode === "chat") return;
    state.mode     = "chat";
    state.messages = [];
    state.loading  = false;
    render(sendMessage);
  });

  $("btn-myth").addEventListener("click", () => {
    if (state.mode === "myth") return;
    state.mode     = "myth";
    state.messages = [];
    state.loading  = false;
    render(sendMessage);
  });

  // Send button
  $("send-btn").addEventListener("click", () => sendMessage($("chat-input").value));

  // Enter key
  $("chat-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage($("chat-input").value);
    }
  });

  // Keep send button in sync as user types
  $("chat-input").addEventListener("input", updateSendBtn);

  // Initial render
  render(sendMessage);
}

init();