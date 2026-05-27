import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({ chats: 0, leads: 0, documents: 0, industries: 4 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  const chartData = [
    { name: "Mon", chats: 20 },
    { name: "Tue", chats: 45 },
    { name: "Wed", chats: 35 },
    { name: "Thu", chats: 70 },
    { name: "Fri", chats: 90 },
    { name: "Sat", chats: 60 },
    { name: "Sun", chats: 120 }
  ];

  const fetchDashboardData = async () => {
    try {
      const docsRes = await API.get("/documents");
      const leadsRes = await API.get("/leads");
      const chatsRes = await API.get("/chat/history");

      const docs = docsRes.data.documents || [];
      const leads = leadsRes.data.leads || [];
      const chats = chatsRes.data.conversations || [];

      setStats({
        chats: chats.length,
        leads: leads.length,
        documents: docs.length,
        industries: 4
      });

      setRecentLeads(leads.slice(0, 3));
      setRecentDocs(docs.slice(0, 3));
      setRecentChats(chats.slice(0, 3));
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <section className="cards">
          <div className="card"><h3>Total Chats</h3><h2>{stats.chats}</h2><p>Saved conversations</p></div>
          <div className="card"><h3>Total Leads</h3><h2>{stats.leads}</h2><p>Captured from chatbot</p></div>
          <div className="card"><h3>Documents</h3><h2>{stats.documents}</h2><p>Trained files</p></div>
          <div className="card"><h3>Industries</h3><h2>{stats.industries}</h2><p>Hospital, College, Real Estate, Restaurant</p></div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h3>Chat Analytics</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="chats" stroke="#4f46e5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel chatbot-preview">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <a href="/documents">Upload Document</a>
              <a href="/leads">View Leads</a>
              <a href="/chatbot">Open Chatbot</a>
            </div>
          </div>
        </section>

        <section className="recent-grid">
          <div className="recent-card">
            <h3>Recent Leads</h3>
            {recentLeads.map((lead) => (
              <div className="recent-item" key={lead.id}>
                <b>{lead.name || "No name"}</b>
                <p>{lead.requirement}</p>
              </div>
            ))}
          </div>

          <div className="recent-card">
            <h3>Recent Conversations</h3>
            {recentChats.map((chat) => (
              <div className="recent-item" key={chat.id}>
                <b>User:</b>
                <p>{chat.user_message}</p>
              </div>
            ))}
          </div>

          <div className="recent-card">
            <h3>Recent Documents</h3>
            {recentDocs.map((doc) => (
              <div className="recent-item" key={doc.id}>
                <b>{doc.filename}</b>
                <p>{doc.extracted_text?.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;