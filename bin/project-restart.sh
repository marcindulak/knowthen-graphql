#!/bin/bash

set -eo pipefail

docker-compose -f docker-compose.yml stop web
docker rm project_knowthen_graphql_web -f
docker rmi project_knowthen_graphql_web -f
docker volume rm project_knowthen_graphql_web_node_modules -f

docker-compose -f docker-compose.yml stop server
docker rm project_knowthen_graphql_server -f
docker rmi project_knowthen_graphql_server -f
docker volume rm project_knowthen_graphql_server_node_modules -f

docker-compose -f docker-compose.yml stop database
docker rm project_knowthen_graphql_database -f
docker rmi project_knowthen_graphql_database -f
docker volume rm project_knowthen_graphql_database_data -f

rm -rf {server,web}/node_modules
docker-compose -f docker-compose.yml build --build-arg USER_UID=$(id -u) --build-arg USER_GID=$(id -g) database server web
docker-compose -f docker-compose.yml up -d database server web
# https://github.com/docker/compose/issues/7306#issuecomment-789667409
# https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running/39028690#39028690
echo "exec server: npm run initdb" && docker-compose -f docker-compose.yml exec -T server sh -c "until pg_isready -h database -U postgres; do sleep 1; done && npm run initdb"
