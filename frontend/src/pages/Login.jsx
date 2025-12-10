import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // match backend
      });

      const data = await res.json();

      if (res.ok) {
        alert("Logged in successfully!"); // clear success message
        navigate("/dashboard");
      } else {
        alert("Login failed: " + (data.error || "User not found"));
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <input
        type="text"
        placeholder="Email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Continue
      </button>
    </div>
  );
}
