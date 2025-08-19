//  Express routes
import { Router } from "express";
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
