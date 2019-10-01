# hello-shutterfly
The starting stack for Shutterfly devops.

## Prerequisites
The only prerequistes to development are [make]() and [docker]().

## Server
The `server` directory contains a very basic in-memory CRUD API built with GoLang. The data model is as follows:
```
Events
-------------------
ID:          string
Title:       string
Description: string
```
To start the server, run `make start`. This will build the Go files and run the resulting executable in a docker container. The docker portion is contained in `docker-compose.yml` and `server/Dockerfile`.

## Available Make Commands
```
build-local                    Builds a local executable of the project via "go build"
help                           Help documentation
start-local                    Builds and starts a local version of the program
start                          Builds and starts the project in a docker container
```
