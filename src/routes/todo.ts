import { Router } from "express";
import { createTodo } from "../controllers/todo";
import asyncWrapper from "../middlewares/asyncWrapper";
import { vaidateTodoCreation } from "../middlewares/todo";
import { validate } from "../middlewares/validator";

const todoRouter: Router = Router();

todoRouter.post("/", validate(vaidateTodoCreation), asyncWrapper(createTodo));

export default todoRouter;