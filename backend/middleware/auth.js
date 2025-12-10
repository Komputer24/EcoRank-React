import supabase from "../config/supabase.js";

// Middleware to authenticate Supabase JWT
export const authenticateSupabaseToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect: "Bearer TOKEN"

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.log("Invalid or expired token");
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Attach user info to the request object
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};