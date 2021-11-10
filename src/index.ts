import app from "./app";
import { config } from "dotenv";
config();
//TODO:: type of port
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`App now running on port ${port}`);
});
