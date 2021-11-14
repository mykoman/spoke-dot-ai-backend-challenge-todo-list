import { Request, Response, NextFunction } from 'express'

/**
 * @description Logs the request method and URL of requests made to application
 * @param {obj} req request
 * @param {obj} res response
 * @param {obj} next next
 */
export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.info(
        req.method +
            '  ' +
            req.protocol +
            '://' +
            req.get('host') +
            req.originalUrl
    )
    next()
}
