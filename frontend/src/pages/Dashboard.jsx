import { useEffect, useState } from "react";

export default function Dashboard() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Load profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          console.error("Error fetching profile:", data.error);
          alert("Failed to load profile.");
        } else {
          setInputValue(data.profile.bio || "");
        }
      } catch (err) {
        console.error(err);
        alert("Could not load profile.");
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Save bio to backend
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio: inputValue }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Profile updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving.");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Dashboard</h1>

      <input
        type="text"
        placeholder="Type your bio..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />

      <button
        onClick={handleSave}
        style={{
          marginLeft: "10px",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}