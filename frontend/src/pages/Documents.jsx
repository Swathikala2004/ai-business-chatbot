import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { isAdmin } from "../utils/auth";

import "./Documents.css";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  const fetchDocuments = async () => {
    try {
      const response = await API.get("/documents");
      setDocuments(response.data.documents || []);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadDocument = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Please select a file");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      await API.post("/documents/upload", formData);

      alert("Document uploaded successfully");
      setFile(null);
      fetchDocuments();
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  const deleteDocument = async (id) => {
    try {
      await API.delete(`/documents/${id}`);
      fetchDocuments();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <div className="documents-header">
          <h2>Documents</h2>
          <p>Upload and manage chatbot training files</p>
        </div>

        <form className="upload-box" onSubmit={uploadDocument}>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit">
            Upload Document
          </button>
        </form>

        <div className="document-grid">
          {documents.map((doc) => (
            <div className="document-card" key={doc.id}>
              <h3>{doc.filename}</h3>

              <p>{doc.file_path}</p>

              <span>
                {doc.extracted_text
                  ? doc.extracted_text.slice(0, 200)
                  : "Not trained yet"}
              </span>

              {isAdmin() && (
                <button
                  className="delete-btn"
                  onClick={() => deleteDocument(doc.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Documents;