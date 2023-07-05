FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i
RUN npm ci --only=production
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "node", "dist/app.js" ]