import Joi from "joi";
import {Request} from 'express'
/**
 * @description validation of data as middleware
 * @param {Object} todoData req.body of the business data
 * @returns Object may contain error key if validation fails
 */
 export const validateTodoCreation = (todoData: Request) => {
	const schemaObject = {
		name: Joi.string().required(),
		status: Joi.string().required().valid("in-progress", "created", "completed"),
	};

	const schema = Joi.object(schemaObject);

	return schema.validate(todoData);
};


/**
 * @description validation of data as middleware
 * @param {Object} todoData req.body of the business data
 * @returns {Object} may contain error key if validation fails
 */
 export const validateTodoUpdate = (todoData: Request) => {
	const schemaObject = {
		name: Joi.string(),
		status: Joi.string().valid("in-progress", "created", "completed"),
	};

	const schema = Joi.object(schemaObject);

	return schema.validate(todoData);
};