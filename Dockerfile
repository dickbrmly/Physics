FROM node:14
WORKDIR D:/Programming/NodeJS/Physics
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 80/tcp
EXPOSE 443/tcp
CMD ["node","server.js"]