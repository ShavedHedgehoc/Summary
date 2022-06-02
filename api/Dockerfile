FROM node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

# EXPOSE 3000
# CMD ["npm", "run", "start:dev"]
CMD ["node", "dist/main"]

