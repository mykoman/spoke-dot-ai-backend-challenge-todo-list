import {Request, Response, NextFunction} from 'express';
import ApplicationError from "../helpers/error-response";

/**
 * @description this middleware validates the request body when http requests are made to the server
 * @param inputFunction Function function by joi to run validation on input parameters
 * @returns Object 
 */
export const validate = (inputFunction) => {
  return (req:Request, res: Response, next: NextFunction) => {
		const { error } = inputFunction(req.body);
    
		if (error){
      //only one error is handled per time. The details array has one content
      const errorMessage = error.details[0].message
      throw new ApplicationError(400, errorMessage);
    }

		next();
	};
}