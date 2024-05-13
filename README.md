# spatial-backend
It is a backend for a spatial application based on nodejs.

## How to use

### Requirement - Docker and nodejs Installed
With docker run
```
docker-compose build
docker-compose up
```

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

# /home

    headers.authorisation[
        "${jwtToken}"
    ]
