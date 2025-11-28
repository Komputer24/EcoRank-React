import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SECRET_KEY
);

// Example route using Supabase
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "User created", data });

  
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(404).json({ error: "User not found or invalid password" });

    res.json({ message: "Logged in", user: data.user, session: data.session });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on all interfaces");
}); 