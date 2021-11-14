import { Router } from 'express'
import {
    createTodo,
    deleteTodoById,
    listTodos,
    updateTodo,
} from '../controllers/todo'
import asyncWrapper from '../middlewares/asyncWrapper'
import { verifyToken } from '../middlewares/auth'
import { validateTodoCreation, validateTodoUpdate } from '../middlewares/todo'
import { validate } from '../middlewares/validator'

const todoRouter: Router = Router()

todoRouter.post(
    '/',
    [verifyToken, validate(validateTodoCreation)],
    asyncWrapper(createTodo)
)
todoRouter.get('/', asyncWrapper(listTodos))
todoRouter.patch(
    '/:id',
    [verifyToken, validate(validateTodoUpdate)],
    asyncWrapper(updateTodo)
)
todoRouter.delete('/:id', verifyToken, asyncWrapper(deleteTodoById))

export default todoRouter
