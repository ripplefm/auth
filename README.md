# ripple.fm auth service

Authentication and user service for ripple.fm

Acts as an OAuth2 provider for the ripple.fm web client and exposes REST API endpoints for user data.

## Table of Contents

* [Prerequisites](#prerequisites)
* [Technologies](#technologies)
* [Development](#development)
  * [Formatting](#formatting)
  * [Setting up your environment](#setting-up-your-environment)
  * [Starting the service](#starting-the-service)
* [Production](#production)
  * [Deploying](#deploying)
  * [Notes on configuration](#notes-on-configuration)
  * [CLI](#cli)

# Prerequisites

* yarn or npm
* Typescript
* docker and docker-compose

# Technologies

This project was built with:

* [Typescript](https://www.typescriptlang.org/)
* [express](https://expressjs.com/) + [routing-controllers](https://github.com/typestack/routing-controllers) for controllers
* [oauth2orize](https://github.com/jaredhanson/oauth2orize)
* [TypeORM](https://github.com/typeorm/typeorm)
* [webpack](https://webpack.js.org/) for bundling/transpiling sass and es6
* [pug](https://pugjs.org/api/getting-started.html) for templating html and [MJML](https://mjml.io/) for templating emails

# Development

## Formatting

This project uses [Prettier](https://github.com/prettier/prettier) for formatting. It's recommended to configure your editor to work with prettier using the [editor integrations](https://prettier.io/docs/en/editors.html).

Formatting is checked when Travis CI runs a build and can be checked locally using the one of the following commands:

```sh
yarn lint
```

or

```sh
npm run lint
```

## Setting up your environment

We must first set the environment variables defined in [.env.example](.env.example). The variables include comments and are marked optional. **NOTE**: Some variables are not required to run the basic development environment.

The steps for defining your environment variables:

1. Copy `.env.exmaple` to `.env`
1. Update values for the variables
1. Source the environment using `source .env`

## Starting the service

Now that we loaded the environment variables we can start the service using `docker-compose`

To start we run:

```sh
$ docker-compose up
```

To stop:

```sh
$ docker-compose down
```

# Production

## Deploying

Travis CI will automatically build and push tagged commits (matching the version in `package.json`) to the docker image repository.

After an image is built and pushed, update the [helm chart for ripple.fm](https://github.com/ripplefm/charts) to set the updated tag for the auth service.

## Notes on configuration

Some notes about deploying to production:

* Ensure `NODE_ENV` is set to `production`
* the `REDIS_PASSOWRD` environment variable is optional but recommended

## CLI

The auth service includes cli commands defined [here](src/cli/index.ts). These commands can be used to initialize our service (i.e running migrations or creating oauth2 clients).
