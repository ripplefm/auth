# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2019-02-26

### Changed

* Errors that result in an HTTP 500 response are now logged to console
* `createOAuth2Client` CLI command now fails if a client with that name already exists

## [0.1.2] - 2019-02-20

### Changed

* UUID columns types are changed to use the `gen_random_uuid()` function defined in the `pgcrypto` extension to generate uuids instead of `uuid_generate_v4()`

## [0.1.1] - 2019-02-16

### Added

* Add endpoint to retrieve OAuth2 client id by client name (useful for `web` service not needing to know `client_id` ahead of time)