import supabase from "../config/supabase.js";

export default async function authRoutes(app) {

  // SIGNUP
  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
      const { data: userData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (authError) {
        return res.status(400).send({ error: authError.message });
      }

      const userId = userData.user.id;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          name: "",
          bio: "",
          avatar_url: ""
        })
        .select()
        .single();

      if (profileError) {
        return res.status(400).send({ error: profileError.message });
      }

      res.send({
        message: "User created and profile initialized",
        user: userData.user,
        profile: profileData,
        token: userData.session?.access_token
      });

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  // LOGIN
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    res.send({
      message: "Logged in",
      user: data.user,
      token: data.session?.access_token
    });
  });

}
