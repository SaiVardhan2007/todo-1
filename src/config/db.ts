// Mongo connection helper

import mongoose from "mongoose";

export async function connectDB(uri: string) {
  // Recommended: use mongoose.connect with a single URI
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}
