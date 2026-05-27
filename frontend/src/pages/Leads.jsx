import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import { isAdmin } from "../utils/auth";

import "./Leads.css";

function Leads() {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: ""
  });

  const fetchLeads = async () => {

    try {

      const response = await API.get("/leads");

      setLeads(response.data.leads);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const createLead = async (e) => {

    e.preventDefault();

    try {

      await API.post("/leads", formData);

      alert("Lead created successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        requirement: ""
      });

      fetchLeads();

    } catch (error) {

      alert("Failed to create lead");

    }
  };

  const deleteLead = async (id) => {

    try {

      await API.delete(`/leads/${id}`);

      fetchLeads();

    } catch (error) {

      alert("Failed to delete lead");

    }
  };

  const exportLeadsCSV = () => {

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Requirement",
      "Status"
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.requirement,
      lead.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv"
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "leads.csv";

    a.click();
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      lead.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      lead.requirement
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchLeads();
  }, []);

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <Navbar />

        <div className="leads-page">

          <div className="leads-header">

            <h2>
              Lead Management
            </h2>

            <p>
              Capture and manage business leads
            </p>

          </div>

          <form
            className="lead-form"
            onSubmit={createLead}
          >

            <input
              type="text"
              name="name"
              placeholder="Client Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Client Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              name="requirement"
              placeholder="Requirement"
              value={formData.requirement}
              onChange={handleChange}
            />

            <button type="submit">
              Add Lead
            </button>

          </form>

          <input
            className="search-input"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            className="export-btn"
            onClick={exportLeadsCSV}
          >
            Export Leads CSV
          </button>

          <div className="lead-grid">

            {filteredLeads.map((lead) => (

              <div
                className="lead-card"
                key={lead.id}
              >

                <h3>{lead.name}</h3>

                <p>{lead.email}</p>

                <p>{lead.phone}</p>

                <span>
                  {lead.requirement}
                </span>

                <small>
                  Status: {lead.status}
                </small>

                {isAdmin() && (

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteLead(lead.id)
                    }
                  >
                    Delete
                  </button>

                )}

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Leads;