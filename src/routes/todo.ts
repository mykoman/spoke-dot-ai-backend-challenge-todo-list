import { Router } from "express";
import { createTodo } from "../controllers/todo";
import asyncWrapper from "../middlewares/asyncWrapper";

const todoRouter: Router = Router();

todoRouter.post("/", asyncWrapper(createTodo));

export default todoRouter;