# # develop stage
# FROM node:lts-alpine as develop-stage
# WORKDIR /app
# COPY package*.json ./
# RUN yarn global add @quasar/cli
# COPY . .
# # build stage
# FROM develop-stage as build-stage
# RUN yarn
# RUN quasar build -m pwa
# # production stage
# FROM nginx:1.17.5-alpine as production-stage
# COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# build stage
#FROM node:lts-alpine as build-stage
FROM --platform=linux/amd64 node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
 RUN yarn global add @quasar/cli
COPY . .
RUN yarn
RUN quasar build -m pwa

# production stage
FROM --platform=linux/amd64 nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
COPY ./entrypoint.sh /entrypoint.sh
# expose internal port:80 and run init.sh
EXPOSE 80

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
