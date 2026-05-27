import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import "./Chatbot.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi 👋 I am your AI Business Chatbot. Ask me anything."
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message
    };

    const updatedMessages = [
      ...messages,
      userMessage
    ];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("/chat", {
        message
      });

      setMessages([
        ...updatedMessages,
        {
          type: "bot",
          text: response.data.reply
        }
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          type: "bot",
          text:
            error.response?.data?.message ||
            "AI temporarily unavailable"
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="chatbot-page">
          <div className="chat-header">
            <h2>AI Chatbot</h2>
            <p>Ask questions from your business documents</p>
          </div>

          <div className="chat-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "user-message"
                    : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bot-message">
                Typing...
              </div>
            )}
          </div>

          <div className="chat-input-box">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chatbot;