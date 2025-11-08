FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make gcc g++ libc-dev
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]