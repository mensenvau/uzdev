FROM node:18-alpine

WORKDIR /app

ARG DATABASE_URL=mysql://root:rootpassword@mysql:3306/core_app
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./

RUN npm ci

RUN npm run prisma:generate && npm prune --production

COPY . .

EXPOSE 3001

CMD ["node", "src/server.js"]
