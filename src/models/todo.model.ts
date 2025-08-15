//  Mongoose schema/model
import mongoose from "mongoose";

export interface Todo {
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define schema (timestamps adds createdAt/updatedAt automatically)
const todoSchema = new mongoose.Schema<Todo>(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

// Create model
export const TodoModel = mongoose.model<Todo>("Todo", todoSchema);
