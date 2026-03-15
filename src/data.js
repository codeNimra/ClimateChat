export const SYSTEM_PROMPT = `You are ClimaChat, a friendly and knowledgeable climate science tutor designed specifically for students aged 13–20. Your job is to make climate science exciting, clear, and approachable.

Guidelines:
- Use simple, engaging language appropriate for teenagers
- Use relatable analogies and real-world examples
- Be encouraging and curious in tone — like a cool science teacher
- Keep answers concise (3–5 sentences for simple questions, a bit longer for complex ones)
- Use emojis sparingly but effectively to make responses lively
- When relevant, offer a follow-up "Did you know?" fun fact
- In MYTH BUSTER mode: clearly label the claim as TRUE, FALSE, or PARTLY TRUE, then explain why with evidence

You care deeply about the planet and want students to feel empowered, not hopeless.`;


export const TOPIC_STARTERS = [
  {
    emoji:    "🌡️",
    label:    "Global Warming",
    question: "What actually causes global warming, and why does it matter?",
  },
  {
    emoji:    "🌊",
    label:    "Rising Seas",
    question: "Why are sea levels rising and which places are most at risk?",
  },
  {
    emoji:    "🌿",
    label:    "Carbon Sinks",
    question: "What are carbon sinks and why are forests so important?",
  },
  {
    emoji:    "⚡",
    label:    "Clean Energy",
    question: "How does solar energy work and can it power the whole world?",
  },
  {
    emoji:    "🐝",
    label:    "Biodiversity",
    question: "How does climate change affect animals and ecosystems?",
  },
  {
    emoji:    "🌾",
    label:    "Food & Farming",
    question: "How does climate change threaten our food supply?",
  },
];


export const MYTH_EXAMPLES = [
  "Climate change is natural and has nothing to do with humans.",
  "It's too cold outside, so global warming isn't real.",
  "CO2 is plant food, so more of it is actually good.",
  "Scientists disagree about whether climate change is happening.",
];