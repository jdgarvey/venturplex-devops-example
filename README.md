# VenturPlex DevOps Example

This repo is meant to be an example of all the different facets of our DevOps approach.

![image](https://user-images.githubusercontent.com/31123803/66063172-b2d6fe00-e4f7-11e9-8974-3bc2e0284e5b.png)

## Prerequisites

The only prerequistes to development are [make](https://www.gnu.org/software/make/) and [docker](https://www.docker.com/).

## Client

The `client` directory contains a very basic NRWL application that consumes the API coming from the server directory. It has a very basic Master Detail View on Users.

## Server

The `server` directory contains a very basic CRUD API built with GoLang connected to a Postgres Database.

The data model is as follows:

```markdown
User
-------------------
Id:          string
FirstName:       string
LastName: string
```

Here is the routing table:

```markdown
GET    /users     – Retrieve all users
GET    /users/:id – Retrieve user by ID
POST   /user      – Create an user
PUT    /users/:id – Update an existing user
DELETE /users/:id – Delete an existing user
```

To start the server, run `make start`. This will build the Go files and run the resulting executable in a docker container. The docker portion is contained in `docker-compose.yml` and `server/Dockerfile`.

## Available Make Commands

```bash
build-local                    Builds a local executable of the project via "go build"
help                           Help documentation
start-local                    Builds and starts a local version of the program
start                          Builds and starts the project in a docker container
```
