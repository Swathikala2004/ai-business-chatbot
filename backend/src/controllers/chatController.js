import { supabase } from "../config/supabase.js";
import { askGemini } from "../services/geminiService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const { data: docs, error: docsError } = await supabase
      .from("documents")
      .select("extracted_text")
      .not("extracted_text", "is", null);

    if (docsError) {
      return res.status(400).json({
        success: false,
        message: docsError.message
      });
    }

    const { data: history, error: historyError } = await supabase
      .from("conversations")
      .select("user_message, bot_reply")
      .order("created_at", { ascending: false })
      .limit(5);

    if (historyError) {
      return res.status(400).json({
        success: false,
        message: historyError.message
      });
    }

    const companyData = docs
      .map((doc) => doc.extracted_text)
      .join("\n\n")
      .slice(0, 12000);

    if (!companyData) {
      return res.json({
        success: true,
        reply: "No trained document data found. Please upload TXT/DOCX/PDF first."
      });
    }

    const chatMemory = history
      .reverse()
      .map(
        (chat) =>
          `User: ${chat.user_message}\nBot: ${chat.bot_reply}`
      )
      .join("\n\n");

    const prompt = `
You are an AI business chatbot.

Answer ONLY using the company data below.
Use conversation memory only for context.
If the answer is not available in company data, say:
"Sorry, I don’t have enough information. Please contact the team."

Company Data:
${companyData}

Conversation Memory:
${chatMemory}

Current Question:
${message}
`;

    const reply = await askGemini(prompt);

    await supabase.from("conversations").insert([
      {
        user_message: message,
        bot_reply: reply
      }
    ]);

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getConversations = async (req, res) => {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    conversations: data
  });
};