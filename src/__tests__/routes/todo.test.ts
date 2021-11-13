import {config} from 'dotenv';
import supertest from 'supertest';
import app from '../../app';
import { databaseConnection } from '../../config/database';


config();
const testApp = () => supertest(app);
describe("Fetching of todo items from the database", async () => {
  const testDatabaseURL = process.env.TEST_DATABASE_URL
  beforeAll(async () => {
    await databaseConnection(testDatabaseURL);
    await testApp().get("/api/v1/todos/").send();
  });

  afterAll(async () => {
    // const userToDelete = await createQueryBuilder('users')
    //   .select("users")
    //   .from(User, "users")
    //   .where("users.email = :email", { email }).getOne();
    // userToDelete.remove();

    // await connection.close();
  });

  it("should return a 200 response", async () => {

  })
})