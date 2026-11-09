FROM node:22-slim

WORKDIR /app

COPY package.json .npmrc ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 9000
CMD ["npm", "run", "start"]
