import './Login.css';
import { useState } from "react";

export default function Login() {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: inputValue, password }),
      });

      const data = await res.json();
      console.log(data); // handle success/failure
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <input
        type="text"
        placeholder="Email or username"
        className="login-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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