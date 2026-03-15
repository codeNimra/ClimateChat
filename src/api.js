import { CONFIG } from "./config.js";
import { SYSTEM_PROMPT } from "./data.js";

/**
 * Sends the conversation to Featherless AI and returns the reply text.
 * @param {Array} messages  - full message history [{ role, content }]
 * @returns {Promise<string>} - the assistant's reply
 */
export async function fetchAIReply(messages) {

  // Featherless uses OpenAI-compatible format:
  // system prompt goes as the first message with role "system"
  const apiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map(m => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(CONFIG.API_URL, {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${CONFIG.API_KEY}`,
    },
    body: JSON.stringify({
      model:      CONFIG.MODEL,
      max_tokens: CONFIG.MAX_TOKENS,
      messages:   apiMessages,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "Unknown API error");
  }

  return data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
}