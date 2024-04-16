# spatial-backend
It is a backend for a spatial application based on nodejs.

## How to use

With docker (local mongo)
    docker-compose build
    docker-compose up
Using without docker (mongo atlas)
    npm start

# User Api
# Endpoints
# /login

    body:{
        email:string,
        password:string,
    }
### How do I get set up? ###
# /signup

    body:{
        name:string,
        email:string,
        password:string,
    }
