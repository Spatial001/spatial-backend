FROM node:16.13.2-alpine3.15
WORKDIR /app
EXPOSE 3001
COPY package*.json .
RUN npm ci --production
COPY . .
CMD [ "node","index.js" ]