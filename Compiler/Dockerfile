FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++
RUN apk update && apk add --no-cache openjdk17
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]