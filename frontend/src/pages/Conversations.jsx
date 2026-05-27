import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import "./Conversations.css";

function Conversations() {
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const response = await API.get("/chat/history");
      setConversations(response.data.conversations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="conversations-page">
          <h2>Conversation History</h2>
          <p>View all chatbot conversations</p>

          <div className="conversation-list">
            {conversations.map((chat) => (
              <div className="conversation-card" key={chat.id}>
                <div className="user-question">
                  <strong>User:</strong> {chat.user_message}
                </div>

                <div className="bot-answer">
                  <strong>Bot:</strong> {chat.bot_reply}
                </div>

                <small>
                  {new Date(chat.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Conversations;