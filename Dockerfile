FROM node:alpine as builder

RUN apk update && apk add --no-cache python2 python make g++

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
