# Centmovies

## Setup

Pre-requisites:

- Docker Only


Run `docker-compose up` in the root of the project.

It will bring up Postgres and the Express application server in development mode.

It binds the application server to `localhost:3000`

## Api Url are:
- `GET http://localhost:3000/api/v1/movies`: the movies name
- `POST http://localhost:3000/api/v1/movies`: body should include title, genre & description.
- `GET http://localhost:3000/api/v1/movies/:id` : Returns movie with given id
- `DEL http://localhost:3000/api/v1/movies/:id` : Deletes a movie with the specified id
- `PUT http://localhost:3000/api/v1/movies/:id` : Updates a movie with the specified id

## Models

#### `Movie`
- `title`: the movies name
- `genre`: The type of movie it is -useful for grouping
- `description`: Describes the movie 
- `id`: Distinguishes between each movie 

## Technonogies Used

- `Nodejs - Express`
- `Docker & docker-compose`
- ` Postgresql`
- ` Sequelize --as ORM`