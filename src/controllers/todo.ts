import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../helpers/success-response";
import { Todo } from "../models/Todo";

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { name, status } = req.body;
  const todo = Todo.create({
    name,
    status,
  });

  await todo.save();
  const response = new SuccessResponse({ message: "Todo successfully created", data: todo });
  return res.json(response);
}
