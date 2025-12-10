import express from "express";
import supabase from "../config/supabase.js";
import { authenticateSupabaseToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/profile → get the logged-in user's profile
router.get("/profile", authenticateSupabaseToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(`Fetching profile for user: ${userId}`);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("Supabase error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    res.json({ profile: data });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// PUT /api/profile → update the logged-in user's profile
router.put("/profile", authenticateSupabaseToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body; // { name, bio, etc. }
    console.log(`Updating profile for user: ${userId}`, updates);

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Profile updated", profile: data });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

export default router;
