from node:20-alpine AS base

WORKDIR /usr/src/backend-app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run dist

EXPOSE 3000

CMD [ "npm", "run"]