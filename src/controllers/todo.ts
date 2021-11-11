import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/Todo";

export const createTodo = async (req:Request, res: Response, next: NextFunction) =>{
    const {name, status} = req.body;
    const todo = Todo.create({
      name,
      status,
    });
  
    await todo.save();
  
    return res.json(todo);
}
