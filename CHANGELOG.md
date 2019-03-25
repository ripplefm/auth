# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.2] - 2019-03-24

### Fixed

* Add `Content-Security-Policy` header with `PUBLIC_DOMAIN` as frame-ancestor to allow iframes to be embedded on `PUBLIC_DOMAIN`

## [0.2.1] - 2019-03-20

### Changed

* Upgrade typescript to `3.3.4000` to fix build error

## [0.2.0] - 2019-03-20

### Changed

* Refactored and redesigned forms for login and register pages

## [0.1.5] - 2019-03-12

### Fixed

* Emails can now be sent in production
* Activation emails have working link

## [0.1.4] - 2019-03-01

### Changed

* Tokens are now signed with static issuer `ripple.fm` instead of signing with environment variable provided in `PUBLIC_DOMAIN`
* Configured `helmet` and `frameguard` to allow iframe embedding on domain provided in environment variable `PUBLIC_DOMAIN`

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
