import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Create the user in Supabase Auth
    const { data: userData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) return res.status(400).json({ error: authError.message });

    const userId = userData.id; // Supabase Auth user ID

    // 2. Create a profile row in your profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,   // match the auth user ID
        name: "",
        bio: "",
        avatar_url: ""
      })
      .select()
      .single();

    if (profileError) return res.status(400).json({ error: profileError.message });

    res.json({
      message: "User created and profile initialized",
      user: userData,
      profile: profileData,
      token: userData.session?.access_token // optional
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(404).json({ error: "Invalid email or password" });

    res.json({
      message: "Logged in",
      user: data.user,
      token: data.session?.access_token
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
