# VenturPlex DevOps Example

This repo is meant to be an example of all the different facets of our DevOps approach.

![image](https://user-images.githubusercontent.com/31123803/66063172-b2d6fe00-e4f7-11e9-8974-3bc2e0284e5b.png)

## Prerequisites

The prerequisites to development are [make](https://www.gnu.org/software/make/),
[docker](https://www.docker.com/), and [kubernetes](https://kubernetes.io/).
Kubernetes actually comes with Docker, and can be enabled through Docker preferences.

## Getting Started

Once all prerequisites are installed, run `make init` to download other necessary tools for development on MacOS.

If the AWS CLI has never been installed on your machine before,
make sure to [configure](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html#configure-awscli) it.

### Local Development

For local development, ensure that a Kubernetes cluster running.

You will also need to replace the volume path in `kubernetes/client.yaml` and `kubernetes/server.yaml`
with your absolute path to the respective directories.

Then run the following:

```bash
make install-node-modules # Install local dependencies for the client
make deploy-dev # Build dev images and create dev Kubernetes infrastructure
```

> Note: `make install-node-modules` only needs to be run once initially,
> and then it only needs to be run if client/package.json changes.

The frontend is available on [http://localhost:4200](http://localhost:4200)
and the backend is available on [http://localhost:8080](http://localhost:8080).
Both the frontend and backend have live-reload enabled.

### Release Builds

The app is deployed to [AWS EKS](https://aws.amazon.com/eks/) via [Terraform](https://www.hashicorp.com/).

To ensure that the infrastructure is up to date, run `make deploy-infrastructure`.
This will make any necessary updates to the EKS cluster and networking, as well as
ensure that the K8s context is set correctly on the local machine.

To deploy a release version of both the client and server, run `make deploy-release`.
This will build the release images, push them to Docker Hub, and deploy the Kubernetes infrastructure.

**On a local cluster**
The frontend is available on [http://localhost:4200](http://localhost:4200)
and the backend is available on [http://localhost:8080](http://localhost:8080).

**On a remote cluster**
Run `make get-client-host` and `make get-server-host` to get the host names for the client and server respectively.

### Remove Infrastructure State

Terraform state is held in [Terraform Cloud](https://app.terraform.io/app/venturplex/workspaces).
Ask a manager for access if needed.

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

Below are all the available Make targets (copied from running `make help`).

```bash
build-client-release-image     Builds the release-ready docker image for the client
build-dev-images               Builds the docker development images based on docker-compose.yml
build-local                    Builds a local executable of the project via "go build"
build-server-release-image     Builds the release-ready docker image for the server
create-cluster                 Creates and configures a cluster on EKS
deploy-client-release          Creates the k8s deployment and service for the release version of the client
deploy-data                    Creates the k8s database deployment and service
deploy-dev-client              Creates the k8s dev cient deployment and service
deploy-dev-server              Creates the k8s dev server deployment and service
deploy-dev                     Creates development-specific deployments and services
deploy-namespace               Creates a Kubernetes workspace
deploy-release                 Builds all images and deploys all k8s infrastructure for a release
deploy-server-release          Creates the k8s deployment and service for the release version of the server
destroy-all-k8s                Deletes the local Kubernetes architecture
get-client-hostname            Retrieve the external IP for the client application
get-server-hostname            Retrieve the external IP for the server application
help                           Help documentation
init                           Install required tools for local environment on macOS
install-node-modules           Install dependencies locally
local-k8s-context              Ensures that the K8s context is set to Docker for Desktop
push-client-release            Push the built client-release image to Docker Hub
push-server-release            Push the built server-release image to Docker Hub
start-local                    Builds and starts a local version of the program
```
