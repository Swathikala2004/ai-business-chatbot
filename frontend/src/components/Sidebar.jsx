import { Link } from "react-router-dom";

import {
  FiHome,
  FiFileText,
  FiMessageCircle,
  FiSettings,
  FiUsers,
  FiGlobe,
  FiPhoneCall,
  FiCreditCard,
  FiUserPlus
} from "react-icons/fi";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">
        AI Chatbot
      </h2>

      <nav className="sidebar-nav">
        <Link to="/dashboard">
          <FiHome /> Dashboard
        </Link>

        <Link to="/documents">
          <FiFileText /> Documents
        </Link>

        <Link to="/chatbot">
          <FiMessageCircle /> Chatbot
        </Link>

        <Link to="/leads">
          <FiUsers /> Leads
        </Link>

        <Link to="/url-training">
          <FiGlobe /> URL Training
        </Link>

        <Link to="/handoff">
          <FiPhoneCall /> Human Handoff
        </Link>

        <Link to="/plans">
          <FiCreditCard /> Plans
        </Link>

        <Link to="/team">
          <FiUserPlus /> Team
        </Link>

        <Link to="/settings">
          <FiSettings /> Settings
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;