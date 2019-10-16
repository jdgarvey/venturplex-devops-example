SHELL := /bin/bash

install-node-modules: ## Install dependencies locally
	@(cd client && yarn)

help: ## Help documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Install required tools for local environment on macOS
	brew install awscli || exit 0
	brew tap weaveworks/tap && brew install weaveworks/tap/eksctl || exit 0

lint: ## Lints the Angular projects
	@(cd client && yarn lint)

test: ## Unit tests the Angular projects
	@(cd client && yarn test)

e2e: ## Runs E2E tests for the Angular projects
	@(cd client && yarn e2e)

build-local: ## Builds a local executable of the project via "go build"
	@(cd server && go build)

start-local: build-local ## Builds and starts a local version of the program
	@(cd server && ./main)
	@(cd client && yarn start)

local-k8s-context: ## Ensures that the K8s context is set to Docker for Desktop
	@(kubectl config use-context docker-desktop)

build-dev-images: ## Builds the docker development images based on docker-compose.yml
	@(docker-compose build --force-rm --parallel client server)

deploy-namespace: ## Creates a Kubernetes workspace
	@(kubectl apply -f ./kubernetes/namespace.yaml && kubectl config set-context --current --namespace=venturplex-devops-example)

deploy-data: ## Creates the k8s database deployment and service
	@(kubectl apply -f ./kubernetes/data.yaml)

deploy-dev-server: ## Creates the k8s dev server deployment and service
	@(kubectl apply -f ./kubernetes/server.yaml)

deploy-dev-client: ## Creates the k8s dev cient deployment and service
	@(kubectl apply -f ./kubernetes/client.yaml)

deploy-dev: local-k8s-context build-dev-images deploy-namespace deploy-data deploy-dev-server deploy-dev-client  ## Creates development-specific deployments and services

deploy-infrastructure: ## Deploys a K8s cluster, nodes, and networking infrastructure to AWS
	@(cd terraform && terraform apply && CLUSTER=`terraform output cluster_name` && aws eks update-kubeconfig --name $$CLUSTER)

build-server-release-image: ## Builds the release-ready docker image for the server
	@(docker-compose build --force-rm server-release)

deploy-server-release: ## Creates the k8s deployment and service for the release version of the server
	@(kubectl apply -f ./kubernetes/server-release.yaml)

build-client-release-image: ## Builds the release-ready docker image for the client
	@(. wait-for-endpoint.sh && docker-compose build --force-rm --build-arg ENDPOINT=http://$$ENDPOINT client-release)

deploy-client-release: ## Creates the k8s deployment and service for the release version of the client
	@(kubectl apply -f ./kubernetes/client-release.yaml)

deploy-release: deploy-namespace deploy-data build-server-release-image push-server-release deploy-server-release build-client-release-image push-client-release deploy-client-release ## Builds all images and deploys all k8s infrastructure for a release

push-server-release: ## Push the built server-release image to Docker Hub
	@(docker-compose push server-release)

push-client-release: ## Push the built client-release image to Docker Hub
	@(docker-compose push client-release)

get-server-hostname: ## Retrieve the external IP for the server application
	@kubectl get service server-release -o jsonpath={.status.loadBalancer.ingress[0].hostname}

get-client-hostname: ## Retrieve the external IP for the client application
	@kubectl get service client-release -o jsonpath={.status.loadBalancer.ingress[0].hostname}

destroy-all-k8s: ## Deletes the local Kubernetes architecture
	@(kubectl delete -f ./kubernetes)
