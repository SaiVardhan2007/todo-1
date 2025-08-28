// booting the express + DB connection
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

const PORT = Number(process.env.PORT) || 4000;

async function main() {
  try {
    const URI = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!URI) throw new Error("MONGO_URI not set");
    await connectDB(URI);

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

main();
