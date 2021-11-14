import { createConnection } from 'typeorm'
import { config } from 'dotenv'
import { Todo } from '../models/Todo'
import { User } from '../models/User'
import ApplicationError from '../helpers/error-response'

config()

export const databaseConnection = async (databaseURL: string) => {
    try {
        await createConnection({
            type: 'postgres',
            url: databaseURL,
            entities: [Todo, User],
            synchronize: true,
            ssl:
                process.env.NODE_ENV === 'development' ||
                process.env.NODE_ENV === 'staging'
                    ? false
                    : true,
        })
        console.info('Connected to Postgres')
    } catch (error) {
        throw new ApplicationError(
            500,
            'Fetching of todo items from the database',
            error
        )
    }
}
