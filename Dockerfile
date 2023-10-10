FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY standpoint/ ./standpoint/
RUN cd standpoint && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/standpoint/build ./standpoint/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/ ./api/

EXPOSE 80

CMD ["node", "./api/server.js"]