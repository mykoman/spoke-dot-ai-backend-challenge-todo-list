import { Request, Response } from "express";
import { Connection, createQueryBuilder } from "typeorm";
import ApplicationError from "../helpers/error-response";
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


/**
 * @description This lists the todo list in paginated manner using skip and limit queries, filters based on filter query
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 */
export const listTodos = async (req: Request, res: Response) => {
  const { skip, limit, filter } = req.query;
  let query = createQueryBuilder('todos')
    .select("todos")
    .from(Todo, "todos")

  if (skip) {
    query = query.skip(Number(skip));
  }

  if (limit) {
    query = query.take(Number(limit));
  }

  if (filter) {
    query = query.where('todos.status = :filter', { filter })
  }

  const [todos, total] = await query.getManyAndCount();
  const data = {
    todos,
    total
  }

  const response = new SuccessResponse({ message: "Todo listing was successful", data });
  return res.json(response);
}




/**
 * @description Updates a todo list item by Id
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 */
 export const updateTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {name, status} = req.body;
  let todo = await Todo.findOne( Number(id));

  if(!todo){
    throw new ApplicationError(400, "Todo item not found");
  }

  if(name){
    todo.name = name;
  }

  if(status){
    todo.status = status;
  }
  await todo.save()

  const response = new SuccessResponse({ message: "The item was successfully updated", data: todo });
  return res.json(response);
}


/**
 * @description Deletes a todo list item by its Id
 * @async
 * @param {Object} req 
 * @param {Object} res 
 * @returns {Object}
 */
 export const deleteTodoById = async (req: Request, res: Response) => {
  const {id} = req.params;
  let todo = await Todo.findOne( Number(id));

  if(!todo){
    throw new ApplicationError(400, "Todo item not found");
  }

  
  await todo.remove()

  const response = new SuccessResponse({ message: "The item was successfully deleted" });
  return res.json(response);
}

