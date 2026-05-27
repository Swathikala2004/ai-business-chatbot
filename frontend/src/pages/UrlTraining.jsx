import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./UrlTraining.css";

function UrlTraining() {
  const [url, setUrl] = useState("");

  const trainUrl = async (e) => {
    e.preventDefault();

    try {
      await API.post("/train-url", { url });
      alert("Website trained successfully");
      setUrl("");
    } catch {
      alert("Website training failed");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="url-page">
          <h2>Website URL Training</h2>
          <p>Train chatbot using business website content</p>

          <form onSubmit={trainUrl} className="url-form">
            <input
              type="url"
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button type="submit">Train Website</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UrlTraining;