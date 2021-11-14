import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'
import ApplicationError from '../helpers/error-response'
import { SuccessResponse } from '../helpers/success-response'
import { selectTodoQuery } from '../helpers/todo'
import { Todo } from '../models/Todo'

/**
 * @description This creates a todo item
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const createTodo = async (req: Request, res: Response) => {
    const { name, status } = req.body
    const todo = Todo.create({
        name,
        status,
    })

    await todo.save()
    const response = new SuccessResponse({
        message: 'Todo successfully created',
        data: todo,
    })
    return res.json(response)
}

/**
 * @description This lists the todo list in paginated manner using skip and limit queries, filters based on filter query
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const listTodos = async (req: Request, res: Response) => {
    const { skip = 0, limit = 10, filter } = req.query
    let query = createQueryBuilder()
        .select(selectTodoQuery())
        .from(Todo, 'todos')
        .where('todos.is_active = true')
        .skip(Number(skip))
        .take(Number(limit))

    if (filter) {
        query = query.where('todos.status = :filter', { filter })
    }

    const [todos, total] = await query.getManyAndCount()
    const data = {
        todos,
        total,
        count: todos.length,
    }

    const response = new SuccessResponse({
        message: 'Todo listing was successful',
        data,
    })
    return res.json(response)
}

/**
 * @description Updates a todo list item by Id
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, status } = req.body
    const todo = await createQueryBuilder()
        .select(selectTodoQuery())
        .from(Todo, 'todos')
        .where('todos.id = :id', { id: Number(id) })
        .getOne()

    if (!todo) {
        throw new ApplicationError(400, 'Todo item not found')
    }

    if (name) {
        todo.name = name
    }

    if (status) {
        todo.status = status
    }
    await todo.save()

    const response = new SuccessResponse({
        message: 'The item was successfully updated',
        data: todo,
    })
    return res.json(response)
}

/**
 * @description Soft delete/ archieve todo item by ID
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const deleteTodoById = async (req: Request, res: Response) => {
    const { id } = req.params
    const todo = await createQueryBuilder()
        .select('todos')
        .from(Todo, 'todos')
        .where('todos.id = :id', { id: Number(id) })
        .getOne()

    if (!todo) {
        throw new ApplicationError(400, 'Todo item not found')
    }

    if (todo.is_active === false) {
        throw new ApplicationError(400, 'Todo item no longer exists')
    }

    todo.is_active = false
    todo.save()

    const response = new SuccessResponse({
        message: 'The item was successfully deleted',
    })
    return res.json(response)
}
