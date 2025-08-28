// Handlers for CRUD
import type { Request, Response } from "express";
import { TodoModel } from "../models/todo.model.js";

// Create
export async function createTodo(req: Request, res: Response) {
  try {
    const { title, completed } = req.body;
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "title must be a non-empty string" });
    }
    const todo = await TodoModel.create({ title, completed });
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(500).json({ error: "server error", detail: String(err) });
  }
}

// Read all
export async function getTodos(_req: Request, res: Response) {
  try {
    const todos = await TodoModel.find().sort({ createdAt: -1 });
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ error: "server error", detail: String(err) });
  }
}

// Read one
export async function getTodoById(req: Request, res: Response) {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "todo not found" });
    return res.json(todo);
  } catch {
    return res.status(400).json({ error: "invalid id" });
  }
}

// Update by id
export async function updateTodo(req: Request, res: Response) {
  try {
    const { title, completed } = req.body;
    const todo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(title !== undefined ? { title } : {}), ...(completed !== undefined ? { completed } : {}) } },
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ error: "todo not found" });
    return res.json(todo);
  } catch {
    return res.status(400).json({ error: "invalid data or id" });
  }
}

// Delete by id
export async function deleteTodo(req: Request, res: Response) {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: "todo not found" });
    return res.json({ message: "deleted", id: todo._id });
  } catch {
    return res.status(400).json({ error: "invalid id" });
  }
}
