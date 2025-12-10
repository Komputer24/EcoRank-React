import { useState } from "react";

export default function Dashboard() {
  const [inputValue, setInputValue] = useState("");

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bio: inputValue })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Profile updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Dashboard</h1>
      <input 
        type="text" 
        placeholder="Type something..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={handleSave} style={{ marginLeft: "10px", padding: "8px" }}>
        Save
      </button>
    </div>
  );
}
