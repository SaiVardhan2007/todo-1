//  Express app setup (routes, middleware)
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

// Middlewares
app.use(cors());            // allow browser apps to call this API
app.use(express.json());    // parse JSON bodies

// Healthcheck
// app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api/todos", todoRoutes);

// // Basic 404 handler
// app.use((_req, res) => res.status(404).json({ error: "Not found" }));

export default app;
