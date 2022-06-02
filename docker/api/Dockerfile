FROM node:12.13-alpine

WORKDIR /app

COPY api/package*.json ./

RUN npm install

COPY api .

COPY api/dist ./dist

# EXPOSE 3000
# CMD ["npm", "run", "start:dev"]
CMD ["node", "dist/main"]

