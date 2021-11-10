import express, {Application, Request, Response, NextFunction} from 'express';

const app: Application = express();

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response)=>{
  const response = {message: "Welcome Spoke API on todo list"}
  return res.status(200).json(response);
})

export default app;

