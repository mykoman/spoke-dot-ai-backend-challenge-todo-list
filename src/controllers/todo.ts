import { Request, Response } from "express";
import { SuccessResponse } from "../helpers/success-response";
import { Todo } from "../models/Todo";


/**
 * @description This creates a todo item
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 */
export const createTodo = async (req: Request, res: Response) => {
  const { name, status } = req.body;
  const todo = Todo.create({
    name,
    status,
  });

  await todo.save();
  const response = new SuccessResponse({ message: "Todo successfully created", data: todo });
  return res.json(response);
}
