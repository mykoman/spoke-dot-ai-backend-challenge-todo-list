import { Request, Response, NextFunction } from 'express'
export default (wrapFunction) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await wrapFunction(req, res, next)
        } catch (error) {
            return next(error)
        }
    }
