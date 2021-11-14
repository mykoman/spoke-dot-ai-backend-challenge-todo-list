import app from "./app";
import { config } from "dotenv";
import { databaseConnection } from "./config/database";
config(); 
const port = process.env.PORT || 3000;

      const databaseURL = process.env.DATABASE_URL;
      //databaseConnection(databaseURL);

app.listen(port, ()=>{
  console.log(`App now running on port ${port}`);
});
