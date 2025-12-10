import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();

// Allowed origins (dev + production)
const allowedOrigins = [
  process.env.FRONTEND_URL,   // production frontend
  "http://localhost:5174"     // local dev frontend
];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Do not throw an error — just block with a response
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// Body parser
app.use(express.json());

// Health check route (optional but useful)
app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

// API routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);

// Cloud Run sets PORT automatically
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
