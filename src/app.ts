import express, {Application, Request, Response, NextFunction} from 'express';
import { SuccessResponse } from './helpers/success-response';
import router from './routes';

const app: Application = express();

app.use(express.json());

app.use("/api/v1", router)

app.get("/api/v1", (req: Request, res: Response)=>{
  const message = "Welcome Spoke API on todo list"
  const response = new SuccessResponse({message: "Welcome Spoke API on todo list"})
  return res.status(200).json(response);
})

export default app;

