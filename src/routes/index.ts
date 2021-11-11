import { Router } from 'express';
import todoRouter from './todo';
const router = Router();

router.use("/todos", todoRouter)

export default router;
