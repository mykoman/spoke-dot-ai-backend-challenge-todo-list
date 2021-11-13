import request  from 'supertest';
import { createQueryBuilder } from 'typeorm';
import { databaseConnection } from '../../config/database';
import app from '../../app';
import { User } from '../../models/User';
import {config} from 'dotenv';

config();
const testApp = () => request(app);

describe("The login process", () => {
	const email = "test@mail.com";
	const password = "password";
	const wrongPassword = "Password1";
	let response;
	let connection;
	const testDatabaseURL = process.env.TEST_DATABASE_URL
	// it("demo", async()=>{
	// 	connection = await databaseConnection(testDatabaseURL);
	// 	expect(1).toBe(1);
	// })
	beforeAll(async () => {
		// connection = await databaseConnection(testDatabaseURL);
		await testApp().post("/api/v3/users/register").send({
			email,
			password,
		});
	});

	afterAll(async () => {
		const userToDelete = await createQueryBuilder('users')
    .select("users")
    .from(User, "users")
		.where("users.email = :email", {email}).getOne();
		userToDelete.remove();

		await connection.close();
	});

	it("should check for email/password match ", async () => {
		response = await testApp().post("/api/v3/user/login").send({
			email,
			password,
		});
		expect(response.status).toBe(200);
		expect(response.body.data.token).toBeTruthy();
	});


});
