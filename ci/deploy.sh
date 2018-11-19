#! /bin/bash
set -e

docker login -u "$DOCKER_HUB_USERNAME" -p "$DOCKER_HUB_PASSWORD"

if [ -n "$TRAVIS_TAG" ]; then
  release_version=`cat package.json | grep "version\": " | cut -d \" -f 4`

  # enforce mix.exs version to be equal to travis_tag
  if [[ "$TRAVIS_TAG" != "$release_version"* ]]; then
    echo "Branch tag ($TRAVIS_TAG) not equal to version defined in 'package.json' ($release_version)"
    echo "Terminating Build..."
    exit 1
  fi

  docker build \
    --file Dockerfile.prod \
    --tag ripplefm/auth:${TRAVIS_TAG} .

  docker push ripplefm/auth:${TRAVIS_TAG}
fi

docker logout
