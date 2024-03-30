FROM node:18-alpine

WORKDIR /mangahay-fe

COPY package*.json ./
COPY .docker.env .env

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

# Start the Next.js application
CMD ["npm", "run", "start"]