// booting the express + DB connection
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";        // loads .env into process.env

const app = express();

// Middlewares
app.use(cors());            // allow browser apps to call this API
app.use(express.json());    // parse JSON bodies


const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

async function main() {
    try {
        await connectDB(URI as string);
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    }
    catch (err: any) {
        console.error("Failed to start:", err);
        process.exit(1);
    }
}

main()

// Routes
app.use("/api/todos", todoRoutes);