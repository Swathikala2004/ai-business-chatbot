import { useState } from "react";
import API from "../services/api";

import "./WidgetChat.css";

function WidgetChat() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi 👋 How can I help you?"
    }
  ]);

  const sendMessage = async () => {

    if (!message) return;

    const updated = [
      ...messages,
      {
        type: "user",
        text: message
      }
    ];

    setMessages(updated);

    try {

      const response = await API.post("/chat", {
        message
      });

      setMessages([
        ...updated,
        {
          type: "bot",
          text: response.data.reply
        }
      ]);

    } catch {

      setMessages([
        ...updated,
        {
          type: "bot",
          text: "AI service unavailable"
        }
      ]);

    }

    setMessage("");
  };

  return (
    <div className="widget-chat">

      <div className="widget-messages">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.type === "user"
                ? "widget-user"
                : "widget-bot"
            }
          >
            {msg.text}
          </div>

        ))}

      </div>

      <div className="widget-input">

        <input
          type="text"
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default WidgetChat;