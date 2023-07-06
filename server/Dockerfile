FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm install typescript -g
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "node", "dist/app.js" ]