import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message); // shows just the message
      } else {
        const err = await res.json();
        alert("Error: " + err.error);
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Server error");
    }
  };


  return(
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <input
        type="text"
        placeholder="Email"
        className="signup-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="signup-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signup-button"
        onClick={async () => {
          await handleSubmit();
          navigate("/");
        }}
      >Submit</button>
    </div>
  )
}