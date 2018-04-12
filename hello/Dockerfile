FROM node:9.8.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm set progress=false
RUN npm install --quiet
COPY . /usr/src/app

EXPOSE 4000
