import express, {Application, Request, Response, NextFunction} from 'express';
import router from './routes';

const app: Application = express();

app.use(express.json());

app.use("/api/v1", router)

app.get("/api/v1", (req: Request, res: Response)=>{
  const response = {message: "Welcome Spoke API on todo list"}
  return res.status(200).json(response);
})

export default app;

