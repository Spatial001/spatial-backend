# build docker image
# docker --version
sudo systemctl start docker

# builds and tags all the service images
sudo docker-compose build

# push the image
sudo docker-compose push