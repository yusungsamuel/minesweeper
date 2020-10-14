# Getting Started with Docker

## Install

Install docker and docker-compose.
- [Installing docker](https://docs.docker.com/desktop/)
- [Installing docker-compose](https://docs.docker.com/compose/install/)

## Build

Build the development container as follows:

```bash
docker-compose build
```

## Usage

Start the development container using the following command:

```bash
docker-compose up
```

Changes to the code in `./app` from the host machine (i.e. outside the container) should trigger hot reloads inside the container to facilitate development. To install new npm packages, edit `./app/package.json`, then restart the container.

## Advanced

For more fine-grained control over the dev server, start the container with a shell and use CLI commands as desired:

```bash
docker-compose run --service-ports --name minesweeper-manual app sh

# from inside the container: 

## add new package
yarn add <PKG_NAME>

## start the server
yarn start
```
