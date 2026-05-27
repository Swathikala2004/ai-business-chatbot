import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Handoff.css";

function Handoff() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandoff = async (e) => {
    e.preventDefault();

    try {
      await API.post("/handoff", formData);
      alert("Handoff request submitted");

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch {
      alert("Failed to submit handoff");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="handoff-page">
          <h2>Human Handoff</h2>
          <p>Allow customers to talk to your team</p>

          <form className="handoff-form" onSubmit={submitHandoff}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} />
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Handoff;