install-node-modules: ## Install dependencies locally
	@(cd client && yarn)

help: ## Help documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-local: ## Builds a local executable of the project via "go build"
	@(cd server && go build)

start-local: build-local ## Builds and starts a local version of the program
	@(cd server && ./main)
	@(cd client && yarn start)

build-dev-images: ## Builds the docker development images based on docker-compose.yml
	@(docker-compose build --parallel client server)

build-release-images: ## Builds the docker release images based on docker-compose.yml
	@(docker-compose build --parallel client-release server-release)

build-all-images: build-dev-images build-release-images ## Builds all docker images based on docker-compose.yml

build-k8s-namespace: ## Creates a Kubernetes workspace
	@(kubectl apply -f ./kubernetes/namespace.yaml)

build-k8s-infrastructure: build-k8s-namespace ## Creates the local Kubernetes architecture
	@(kubectl apply -f ./kubernetes)

build-data-k8s: build-k8s-namespace ## Creates the database deployment and service
	@(kubectl apply -f ./kubernetes/data.yaml)

build-dev-k8s: build-k8s-namespace build-data-k8s ## Creates development-specific deployments and services
	@(kubectl apply -f ./kubernetes/client.yaml -f ./kubernetes/server.yaml)

build-release-k8s: build-k8s-namespace build-data-k8s ## Creates release-specific deployments and services
	@(kubectl apply -f ./kubernetes/client-release.yaml -f ./kubernetes/server-release.yaml)

build-all-k8s: build-dev-k8s build-release-k8s ## Builds all deployments and services

destroy-all-k8s: ## Deletes the local Kubernetes architecture
	@(kubectl delete -f ./kubernetes)
