import mongoose from "mongoose";

export interface Todo {
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const todoSchema = new mongoose.Schema<Todo>(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model<Todo>("Todo", todoSchema);
