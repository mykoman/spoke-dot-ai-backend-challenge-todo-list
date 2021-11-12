import { createConnection } from 'typeorm';
import {config} from 'dotenv';
import { Todo } from '../models/Todo';
import { User } from '../models/User';

config();
const url = process.env.POSTGRES_URL

export const databaseConnection = async () => {
	try {
		await createConnection({
			type: "postgres",
			url,
			entities: [Todo, User],
			synchronize: true,
		});
		console.log('Connected to Postgres');

	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};
