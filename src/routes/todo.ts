import { Router } from "express";
import { createTodo, deleteTodoById, listTodos, updateTodo } from "../controllers/todo";
import asyncWrapper from "../middlewares/asyncWrapper";
import { validateTodoCreation, validateTodoUpdate } from "../middlewares/todo";
import { validate } from "../middlewares/validator";

const todoRouter: Router = Router();

todoRouter.post("/", validate(validateTodoCreation), asyncWrapper(createTodo));
todoRouter.get("/", asyncWrapper(listTodos));
todoRouter.patch("/:id", validate(validateTodoUpdate), asyncWrapper(updateTodo));
todoRouter.delete("/:id", asyncWrapper(deleteTodoById));

export default todoRouter;