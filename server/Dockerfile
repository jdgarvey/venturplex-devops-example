# Dockerfile References: https://docs.docker.com/engine/reference/builder/

# Start from the latest golang base image and alias for later
ARG GOLANG_VERSION=latest

FROM golang:$GOLANG_VERSION as builder

# Set the Current Working Directory inside the container
WORKDIR /app/

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changes
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

RUN ["go", "get", "github.com/go-playground/justdoit"]

ENTRYPOINT justdoit -watch="./" -include="(.+\\.go|.+\\.c)$" -build="go build -o main ." -run="./main"
