# FROM node:10
# WORKDIR /usr/src/app/location-dashboard
# COPY package*.json ./
# RUN npm install -g @angular/cli @angular-devkit/build-angular && npm run build
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
COPY . .
# RUN npm install
RUN npm ci && npm run build

FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/location-dashboard /usr/share/nginx/html

EXPOSE 80