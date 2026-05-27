import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1 className="main-title">
          AI Business Chatbot
        </h1>

        <p>
          Login to manage your chatbot dashboard
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

        <span>
          Hospital • Real Estate • College • Restaurant
        </span>

      </div>

    </div>
  );
}

export default Login;