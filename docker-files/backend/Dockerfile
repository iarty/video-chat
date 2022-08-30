FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY ./server /app
RUN yarn install
EXPOSE 7777
CMD ["yarn", "server"]
