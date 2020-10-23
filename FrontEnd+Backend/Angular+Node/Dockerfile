FROM node:10 as ui-build
WORKDIR /usr/src/app
COPY client/location-dashboard ./location-dashboard
RUN cd location-dashboard && npm install @angular/cli && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/location-dashboard/dist ./location-dashboard/dist
COPY server/package*.json ./
RUN npm install
COPY server/index.js .

EXPOSE 3080

CMD ["node", "index.js"]