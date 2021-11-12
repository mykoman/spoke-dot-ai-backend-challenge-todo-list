import { createConnection } from 'typeorm';
import { Todo } from '../models/Todo';
import { User } from '../models/User';


export const databaseConnection = async (databaseURL:string) => {
	try {
		await createConnection({
			type: "postgres",
			url: databaseURL,
			entities: [Todo, User],
			synchronize: true,
		});
		console.log('Connected to Postgres');

	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};
