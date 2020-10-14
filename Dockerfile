FROM node:14-alpine

WORKDIR /app

RUN ["npm", "install", "-g", "create-react-app"]

COPY ./docker-entrypoint.sh /

RUN ["chmod", "700", "/docker-entrypoint.sh"]

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["yarn", "start"]
