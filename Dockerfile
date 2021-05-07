FROM node:8.12-alpine as builder

RUN apk update && apk add python make g++

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
