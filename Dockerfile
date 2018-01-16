FROM node:8.2.1-alpine

ARG LOCATION

ENV LOCATION "crud-app"

WORKDIR /$LOCATION

COPY . /$LOCATION

RUN npm install

EXPOSE 8081

#COPY . /$LOCATION

#CMD ["npm", "start"]