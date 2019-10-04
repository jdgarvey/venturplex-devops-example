# VenturPlex DevOps Example

This repo is meant to be an example of all the different facets of our DevOps approach.

![image](https://user-images.githubusercontent.com/31123803/66063172-b2d6fe00-e4f7-11e9-8974-3bc2e0284e5b.png)

## Prerequisites

The prerequisites to development are [make](https://www.gnu.org/software/make/),
[docker](https://www.docker.com/), and [kubernetes](https://kubernetes.io/).
Kubernetes actually comes with Docker, and can be enabled through Docker preferences.

## Getting Started

### Local Development

For local development, ensure that a Kubernetes cluster running.

You will also need to replace the volume path in `kubernetes/client.yaml` and `kubernetes/server.yaml`
with your absolute path to the respective directories.

Then run the following:

```bash
make install-node-modules # Install local dependencies for the client
make build-dev-images # Build docker images – only run this once, or when a dockerfile gets changed
make build-dev-k8s # Create Kubernetes infrastructure
```

The frontend is available on [http://localhost:31000](http://localhost:31000)
and the backend is available on [http://localhost:31001](http://localhost:31001).
Both the frontend and backend have live-reload enabled.

### Release Builds

For multi-stage release build, run the following:

```bash
make build-release-images # This actually compiles code, so it needs to be run every time there is a release build
make build-release-k8s # Create Kubernetes infrastructure
```

The frontend is available on [http://localhost:31002](http://localhost:31002)
and the backend is available on [http://localhost:31003](http://localhost:31003).

### Troubleshooting

If for some reason the backend does not boot properly
or live-reload does not work off the bat, recreate the dev k8s by running
`make destroy-all-k8s` and then `make build-dev-k8s`.

## Client

The `client` directory contains a very basic NRWL application
that consumes the API coming from the server directory.
It has a very basic Master Detail View on Users.

## Server

The `server` directory contains a very basic CRUD API
built with GoLang connected to a Postgres Database.

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

To start the server, run `make start`.
This will build the Go files and run the resulting executable in a docker container.
The docker portion is contained in `docker-compose.yml` and `server/Dockerfile`.

## Available Make Commands

```bash
build-all-images               Builds all docker images based on docker-compose.yml
build-all-k8s                  Builds all deployments and services
build-data-k8s                 Creates the database deployment and service
build-dev-images               Builds the docker development images based on docker-compose.yml
build-dev-k8s                  Creates development-specific deployments and services
build-k8s-infrastructure       Creates the local Kubernetes architecture
build-k8s-namespace            Creates a Kubernetes workspace
build-local                    Builds a local executable of the project via "go build"
build-release-images           Builds the docker release images based on docker-compose.yml
build-release-k8s              Creates release-specific deployments and services
destroy-all-k8s                Deletes the local Kubernetes architecture
help                           Help documentation
install-node-modules           Install dependencies locally
start-local                    Builds and starts a local version of the program
```
