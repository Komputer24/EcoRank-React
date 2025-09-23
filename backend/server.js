// server.js
import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",     
  host: "localhost",    
  database: "EcorankDB",
  password: "pillowcase",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { username, email, password} = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});