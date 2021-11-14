import { config } from 'dotenv'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import ApplicationError from '../helpers/error-response'

config()
/**
 * @description checks if authorization token is present in header
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new ApplicationError(401, 'authorization header not set')
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
        if (error) {
            return next(new ApplicationError(401, `${error.message}`))
        }

        const { id } = decodedToken
        req.user = id

        return next()
    })
}

/**
 * @description validation of data as middleware for registration
 * @param {Object} registrationData req.body of the business data
 * @returns {Object} may contain error key if validation fails
 */
export const validateRegisterationData = (registrationData: Request) => {
    const schemaObject = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    }

    const schema = Joi.object(schemaObject)

    return schema.validate(registrationData)
}

/**
 * @description validation of data as middleware for login
 * @param {Object} loginData req.body of the business data
 * @returns {Object} may contain error key if validation fails
 */
export const validateLoginData = (loginData: Request) => {
    const schemaObject = {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }

    const schema = Joi.object(schemaObject)

    return schema.validate(loginData)
}
