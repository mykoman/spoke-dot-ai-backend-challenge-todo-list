import { Router } from 'express';
import todoRouter from './todo';
import userRouter from './user';
const router = Router();

router.use("/todos", todoRouter);
router.use("/users", userRouter);

export default router;
