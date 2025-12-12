import supabase from "../config/supabase.js";

export const authenticateSupabaseToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.status(403);
    throw new Error("Invalid or expired token");
  }

  req.user = user;
};
