FROM node:14.16.1-alpine

COPY . .

RUN npm i
RUN npm run build

RUN rm -rf node_modules
RUN rm -rf _client

RUN npm i --produciton

CMD node _server/index.js