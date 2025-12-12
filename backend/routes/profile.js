import supabase from "../config/supabase.js";
import { authenticateSupabaseToken } from "../middleware/auth.js";

export default async function profileRoutes(app) {

  // Get profile
  app.get("/profile", { preHandler: authenticateSupabaseToken }, async (req, res) => {
    const userId = req.user.id;

    const { data, error } =
      await supabase.from("profiles").select("*").eq("id", userId).single();

    if (error) return res.status(400).send({ error: error.message });

    return { profile: data };
  });

  // Update profile
  app.put("/profile", { preHandler: authenticateSupabaseToken }, async (req, res) => {
    const userId = req.user.id;
    const updates = req.body;

    const { data, error } =
      await supabase.from("profiles").update(updates).eq("id", userId).select().single();

    if (error) return res.status(400).send({ error: error.message });

    return { message: "Profile updated", profile: data };
  });

}
