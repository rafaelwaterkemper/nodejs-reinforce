docker network create my-net-docker

docker run \
    --name postgres-course \
    --network my-net-docker \
    -e POSTGRES_USER=waterkemper \
    -e POSTGRES_PASSWORD=waterkemper \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    --network my-net-docker \
    -p 8090:8080 \
    -d \
    adminer

## ---- MONGODB
docker run \
    --name mongodb \
    --network my-net-docker \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --network my-net-docker \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'waterkemper', pwd: 'waterkemper', roles: [{role: 'readWrite', db: 'herois'}]})"