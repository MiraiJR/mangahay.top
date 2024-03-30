FROM node:18-alpine

WORKDIR /mangahay-fe

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

# Start the Next.js application
CMD ["npm", "run", "start"]