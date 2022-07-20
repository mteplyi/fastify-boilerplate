# fastify-boilerplate

![dependencies badge](https://img.shields.io/static/v1?labelColor=gray&color=gren&label=dependencies&message=up+to+date)

My awesome Fastify boilerplate.

## Setup

```
# Install dependencies:
npm ci

# Create `.env` file from example:
cp .env.example .env
```

Fill empty environment variables in `.env` file:

- **GITHUB\_\_TOKEN** is your GitHub personal access token. Follow the steps in "[Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)".

## Start

### For development

```
# Run using ts-node-dev
npm run dev
```

### For production

```
# Build production version to dist/
npm run build

# Run built sources from dist/
npm run start
```

### In docker container

```
# Start using docker compose
docker compose up --build --force-recreate
```

## Documentation

There is a `docs/swagger.yaml` that is actualized at each server start in development.
