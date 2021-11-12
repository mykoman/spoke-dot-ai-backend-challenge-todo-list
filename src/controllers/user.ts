import express, { Request, Response} from 'express';
import { createQueryBuilder } from 'typeorm';
import { checkPasswordMatch, generateJWT, hashPassword } from '../helpers/auth';
import ApplicationError from '../helpers/error-response';
import { SuccessResponse } from '../helpers/success-response';
import { User } from '../models/User';
/**
 * @description this function registers a user
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
export const register = async (req: Request, res: Response) => {
  const {email, name} = req.body;
  const lowercaseEmail = email.toLowerCase();
	const doesUserExist = await createQueryBuilder('users')
  .select("users")
  .from(User, "users")
  .where('users.email = :lowercaseEmail', { lowercaseEmail }).getOne();

  if(doesUserExist){
    throw new ApplicationError(400, "Email already exists, Kindly login instead");
  }

	const password = await hashPassword(req.body.password);
	const user = User.create({
    name,
    email: lowercaseEmail,
    password 
  });
  await user.save();
	const token = await generateJWT({ id: user.id, email: user.email });
	const data = {
		 token,
	};
	const response = new SuccessResponse({ message: "Successfully registered", data });
	return res.status(200).json(response);
};

export const login = async (req, res) => {
	const { email, password } = req.body;
  const lowercaseEmail = email.toLowerCase();
	const user = await createQueryBuilder('users')
  .select("users")
  .from(User, "users")
  .where('users.email = :lowercaseEmail', { lowercaseEmail }).getOne()
  
	if (!user) {
		throw new ApplicationError(400, "Account not found. Consider creating an account!");
	}

	const isValid = await checkPasswordMatch(password, user.password );
	if (!isValid) {
    throw new ApplicationError(401, "Invalid email or password!");
	}

	const token = await generateJWT({
		id: user.id,
    email: lowercaseEmail
	});
	const data = { token };

	const response = new SuccessResponse({message: "Login successful", data});
	return res.status(200).json(response);
};