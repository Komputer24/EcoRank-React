import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        alert("Account Successfully Created");
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
        placeholder="Username"
        className="signup-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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