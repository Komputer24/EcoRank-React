import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

const app = Fastify({
  logger: true
});

// Allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5174"
];

// CORS setup
await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed"), false);
    }
  },
  credentials: true
});

// Health check
app.get("/", () => {
  return { status: "Server running" };
});

// Register route groups
app.register(authRoutes, { prefix: "/api" });
app.register(profileRoutes, { prefix: "/api" });

// Start server
const PORT = process.env.PORT || 8080;

app.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`Server running on ${PORT}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
