# Stage 1
FROM node:lts-alpine as build
RUN apk add --no-cache tzdata
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run lint
RUN npm run prod

# Stage 2
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80