import { createConnection } from 'typeorm';
import { config } from 'dotenv';
import { Todo } from '../models/Todo';
import { User } from '../models/User';

config();

export const databaseConnection = async (databaseURL:string) => {
	try {
		await createConnection({
			type: "postgres",
			url: databaseURL,
			entities: [Todo, User],
			synchronize: true,
			ssl: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "staging" ? false : true
		});
		console.log('Connected to Postgres');

	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};
