//  Express routes
import { Router } from "express";
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getTodos);
router.get("/:id", authenticate, getTodoById);
router.post("/", authenticate, createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;
