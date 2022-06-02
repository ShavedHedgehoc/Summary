FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY frontend/package*.json ./
COPY frontend/tsconfig.json ./

COPY frontend/src ./src
COPY frontend/public ./public
RUN npm install
CMD ["npm", "start", "server"]