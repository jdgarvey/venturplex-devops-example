start: ## Builds and starts the project in a docker container
	@docker-compose up --remove-orphans --build

help: ## Help documentation
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-local: ## Builds a local executable of the project via "go build"
	@(cd server && go build)

start-local: build-local ## Builds and starts a local version of the program
	@(cd server && ./hello-shutterfly)

