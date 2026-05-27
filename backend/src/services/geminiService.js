import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askGemini = async (prompt) => {
  try {

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    return chatCompletion.choices[0].message.content;

  } catch (error) {

    console.log("Groq Error:", error.message);

    return "Sorry, AI service temporarily unavailable.";

  }
};