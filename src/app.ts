import express, {Application, Request, Response, NextFunction} from 'express';
import { requestLogger } from './helpers/custom-logger';
import { SuccessResponse } from './helpers/success-response';
import errorHandler from './middlewares/errorHandler';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(requestLogger);
app.use("/api/v1", router)

app.get("/api/v1", (req: Request, res: Response)=>{
  const message = "Welcome Spoke API on todo list"
  const response = new SuccessResponse({message})
  return res.status(200).json(response);
});

app.use(errorHandler);

export default app;

