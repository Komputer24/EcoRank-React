import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();

// Allowed origins (dev + production)
const allowedOrigins = [
  process.env.FRONTEND_URL,   // your production frontend
  "http://localhost:5174"     // local dev frontend
];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

app.use(express.json());

// API routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);

// Dynamic port for hosting (Cloud Run)
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
