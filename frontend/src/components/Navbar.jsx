import { useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  const toggleDarkMode = () => {

    document.body.classList.toggle(
      "dark-mode"
    );

  };

  return (

    <header className="navbar">

      <div>

        <h2>
          Business Dashboard
        </h2>

        <p>
          Manage your AI chatbot platform
        </p>

      </div>

      <div className="navbar-actions">

        <span className="user-role">
          {user?.role || "user"}
        </span>

        <button
          className="dark-btn"
          onClick={toggleDarkMode}
        >
          Dark Mode
        </button>

        <button
          className="upgrade-btn"
          onClick={() =>
            navigate("/plans")
          }
        >
          Upgrade Plan
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>

  );
}

export default Navbar;