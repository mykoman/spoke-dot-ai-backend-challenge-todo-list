import { config } from 'dotenv'
//import supertest from 'supertest'
//import request from 'request';
import app from '../../app'
import { databaseConnection } from '../../config/database'
import { Todo } from '../../models/Todo'
import todoSeed from '../../../data/todo-seeds.json'
import { createQueryBuilder } from 'typeorm'

describe.skip('Fetching of todo items from the database', () => {
    let testApp;
    //testApp = () => supertest(app)
    config()

    let response
    const testDatabaseURL = process.env.TEST_DATABASE_URL
    const baseUrl = "/api/v1/todos";
    beforeAll(async () => {
        await databaseConnection(testDatabaseURL);

        const todoItemsToDelete = await createQueryBuilder()
          .delete()
          .from(Todo, "todos");

        for (const { name, status, is_active } of todoSeed) {
            const todo = Todo.create({
                name,
                status,
                is_active
            })

            await todo.save()
        }
    })


    it("should return a 200 response", async () => {
        
        response = await testApp().get(`${baseUrl}`);
        expect(response.status).toBe(200);
    });

    it("should not return more than 10 items when default query is used", async () => {
        response = await testApp().get("/api/v1/todos");
        expect(response.data.data.count <= 10).toBeTruthy();
    });

    it("should only return active todo items", async () => {
        response = await testApp().get("/api/v1/todos");
        expect(response.data.data.total).toBe(17);
    });


    it("should return a count of 5 when a filter of completed is applied", async () => {
        response = await testApp().get(`${baseUrl}?status=completed`);
        expect(response.data.data.count).toBe(5);
    });

    it("should return 7 element when 10 items are skipped", async () => {
        response = await testApp().get(`${baseUrl}?skip=10`);
        expect(response.data.data.count).toBe(7);
        expect(response.data.data.total).toBe(17);
    });

    it("should return a count of 3 when a limit of 3 applied", async () => {
        response = await testApp().get(`${baseUrl}?limit=3`);
        expect(response.data.data.count).toBe(3);
    });

    it("should ensure that count and todo list are the same", async () => {
        response = await testApp().get(`${baseUrl}`);
        expect(response.data.data.count).toBe(response.data.data.todos.length);
    });


    it("should ensure that response data is returned in response ", async () => {
        response = await testApp().get(`${baseUrl}`);
        expect(response.data.data).toBeTruthy();
    });
    
})
