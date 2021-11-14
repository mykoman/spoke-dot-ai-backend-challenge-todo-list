import { config } from 'dotenv'
import logger from '../config/logger'
import { Request, Response } from 'express'

config()

export default (error, req: Request, res: Response) => {
    const isProduction = process.env.NODE_ENV === 'production'
    let errorMessages = {}

    if (!isProduction) {
        logger.error(error.stack)
        errorMessages = error
    }

    return res.status(error.status || 500).json({
        status: 'error',
        error: {
            message: error.message,
            ...(error.errors && { errors: error.errors }),
            ...(!isProduction && { trace: errorMessages }),
        },
    })
}
