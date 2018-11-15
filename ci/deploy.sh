#! /bin/bash
set -e

docker login -u "$DOCKER_HUB_USERNAME" -p "$DOCKER_HUB_PASSWORD"

if [ -n "$TRAVIS_TAG" ]; then
  docker build \
    --file Dockerfile.prod \
    --tag ripplefm/auth:${TRAVIS_TAG} .

  docker push ripplefm/auth:${TRAVIS_TAG}
fi

docker logout
