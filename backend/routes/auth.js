import supabase from "../config/supabase.js";

export default async function authRoutes(app) {

  // Signup
  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const { data: userData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

    if (authError) return res.status(400).send({ error: authError.message });

    const userId = userData.id;

    const { data: profileData, error: profileError } =
      await supabase
        .from("profiles")
        .insert({
          id: userId,
          name: "",
          bio: "",
          avatar_url: ""
        })
        .select()
        .single();

    if (profileError) return res.status(400).send({ error: profileError.message });

    return {
      message: "User created",
      user: userData,
      profile: profileData,
      token: userData.session?.access_token
    };
  });

  // Login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(404).send({ error: "Invalid email or password" });

    return {
      message: "Logged in",
      user: data.user,
      token: data.session?.access_token
    };
  });

}
