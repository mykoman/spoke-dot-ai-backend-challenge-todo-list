# Todo List API

This repository houses code for [Todo List](https://documenter.getpostman.com/view/2438531/UVC8CRZF)'s backend.

## Table of Contents

- [Todo List](#todo-list-api)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
    - [Folder Structure](#folder-structure)
    - [HTTP Response Codes](#http-response-codes)
    - [Sample HTTP Response](#sample-http-response)
  - [Project Status](#project-status)
  - [Project Payload](#project-payload)
  - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Getting the Source](#getting-the-source)
    - [Installation & Usage](#installation-usage)
    - [Running Tests](#running-tests)
  - [Authors](#authors)

## About the Project

This is a RESTful API for a todo list. Part of an  assessment for [Spoke.AI](https://www.spoke.ai/). It allows a user to:

- Register a new account.
- Log in to the created account.
- Create a todo item (Auth protected)
- List all todo items in paginated manner and optionally filter the results based on status (created, in-progress, completed)
- Update a todo item (Auth protected)
- Delete a todo item (Auth protected)

### Folder Structure

```bash
.
├── ...
├── src                        # source files
│   ├── __tests__              # folder containing automated tests
│   ├── config                 # Configuration files, database etc
│   ├── controllers            # app business logic files
│   ├── helpers                # helper functions
│   ├── middlewares            # app middleware and route middlewares
│   ├── models                 # models/ entities
│   ├── routes                 # routes for navigating the application
│   ├── app.ts                 # express application
│   ├── index.ts               # entry file- server file
├── .env.example               # example environment file
├── .gitignore                 # gitginore file
├── jest.config.js             # jest configuration file
├── package.json               # application configuration
├── README.md                  # this file!!
├── tsconfig.json              # typescript configuration file
└── 
```

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

### Sample HTTP Response

The API response, to the best of my ability, is structure after JSEnd specifications.

- For a `success` response, the server will return a response of this format:

```
{
  "status": "success",
  "message": "success message from the API server"
  "data": { ... }
}
```

- For an `error` response, the server will return a response of this format. The `trace` key in the `error` object is returned if `NODE_ENV !== production`.

```
{
  "status": "error",
  "error": {
    "message": "error message from the API server",
    "trace": {
      "statusCode": <status-code>
    }
  }
}
```


## Project Payload

- [Project Specifications](https://spokeai.notion.site/Spoke-Backend-Coding-Challenge-c413f65a5eba4f6bbe30ae920d145670)
- [Postman Collection](https://documenter.getpostman.com/view/2438531/UVC8CRZF)

## Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/) v4.17. It has the following dependencies:

- [Node.js `>=` 12.18.3](https://nodejs.org/en/download)
- [Typescript ](https://www.typescriptlang.org/download)
- [PostgreSQL Database](https://www.postgresql.org/download/)


### Getting the Source

This project is hosted on [Github](https://github.com/mykoman/spoke-dot-ai-backend-challenge-todo-list). You can clone this project directly using this command:

```sh
git clone https://github.com/mykoman/spoke-dot-ai-backend-challenge-todo-list.git
```

### Installation & Usage

- Create two PostgreSQL database by running the `cmd` below one for the main database and the other for test database:

```sh
psql
CREATE DATABASE <database_name>
CREATE DATABASE <test_database_name>
```

- After cloning the repository, create a `.env` file from `.env.example` and set your local `.env.` variable(s).

```sh
cp .env.example .env
```
- Install the dependencies

```sh
npm install
```
- Run Development server
```sh
npm run dev
```

### Running Tests

To run tests, run

```sh
npm test
```

## Author

- **[Michael Ogbuma](https://github.com/mykoman)** 
