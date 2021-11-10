import { createConnection } from 'typeorm';
import {config} from 'dotenv';

config();
const url = process.env.POSTGRES_URL

export const databaseConnection = async () => {
	try {
		await createConnection({
			type: "postgres",
			url: 'postgres://postgres:@localhost/todo_list'
		});
		console.log('Connected to Postgres');

	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};
