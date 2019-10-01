# VenturPlex DevOps Example
This repo is meant to be an example of all the different facets of our DevOps approach.

![image](https://user-images.githubusercontent.com/1544557/65931056-f547f000-e3bc-11e9-96c9-87de6c536ff8.png)

## Prerequisites
The only prerequistes to development are [make](https://www.gnu.org/software/make/) and [docker](https://www.docker.com/).

## Server
The `server` directory contains a very basic in-memory CRUD API built with GoLang. 
The data model is as follows:
```
Events
-------------------
ID:          string
Title:       string
Description: string
```
Here is the routing table:
```
GET    /events     – Retrieve all events
GET    /events/:id – Retrieve event by ID
POST   /event      – Create an event
PATCH  /events/:id – Update an existing event
DELETE /events/:id – Delete an existing event
```
To start the server, run `make start`. This will build the Go files and run the resulting executable in a docker container. The docker portion is contained in `docker-compose.yml` and `server/Dockerfile`.

## Available Make Commands
```
build-local                    Builds a local executable of the project via "go build"
help                           Help documentation
start-local                    Builds and starts a local version of the program
start                          Builds and starts the project in a docker container
```
