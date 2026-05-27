import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Settings.css";

function Settings() {
  const [botName, setBotName] = useState("BusinessBot");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi 👋 How can I help you today?"
  );
  const [businessType, setBusinessType] = useState("Hospital");
  const [themeColor, setThemeColor] = useState("#4f46e5");

  const saveSettings = (e) => {
    e.preventDefault();
    alert("Settings saved successfully");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="settings-page">
          <h2>Chatbot Settings</h2>
          <p>Customize your business chatbot</p>

          <form className="settings-card" onSubmit={saveSettings}>
            <label>Bot Name</label>
            <input
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
            />

            <label>Welcome Message</label>
            <textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />

            <label>Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option>Hospital</option>
              <option>Real Estate</option>
              <option>College</option>
              <option>Restaurant</option>
            </select>

            <label>Theme Color</label>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
            />

            <button type="submit">Save Settings</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Settings;