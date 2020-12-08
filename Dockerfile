# pull official base image
FROM node:13.12.0-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

# start app
CMD ["npm", "start"]    