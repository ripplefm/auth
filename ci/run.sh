#!/bin/bash
set -e

# check formatting
yarn lint

# run tests
yarn test
