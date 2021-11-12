import { Router } from "express";
import { login, register } from "../controllers/user";
import asyncWrapper from "../middlewares/asyncWrapper";
import { validateLoginData, validateRegisterationData } from "../middlewares/auth";
import { validate } from "../middlewares/validator";

const userRouter = Router();

userRouter.post("/register", validate(validateRegisterationData), asyncWrapper(register));
userRouter.post("/login", validate(validateLoginData), asyncWrapper(login));

export default userRouter;
