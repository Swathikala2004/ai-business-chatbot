import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Team.css";

function Team() {
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "support"
  });

  const fetchMembers = async () => {
    const response = await API.get("/team");
    setMembers(response.data.members);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addMember = async (e) => {
    e.preventDefault();

    await API.post("/team", formData);

    setFormData({
      name: "",
      email: "",
      role: "support"
    });

    fetchMembers();
  };

  const deleteMember = async (id) => {
    await API.delete(`/team/${id}`);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="team-page">
          <h2>Team Members</h2>
          <p>Manage admins, support agents, and team members</p>

          <form className="team-form" onSubmit={addMember}>
            <input
              name="name"
              placeholder="Member name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Member email"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="team">Team Member</option>
              <option value="support">Support Agent</option>
            </select>

            <button type="submit">Add Member</button>
          </form>

          <div className="team-grid">
            {members.map((member) => (
              <div className="team-card" key={member.id}>
                <h3>{member.name}</h3>
                <p>{member.email}</p>
                <span>{member.role}</span>

                <button onClick={() => deleteMember(member.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Team;