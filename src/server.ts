// boot the app + DB connection
import "dotenv/config";        // loads .env into process.env
import app from "./app.js";
import { connectDB } from "./config/db.js";

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
