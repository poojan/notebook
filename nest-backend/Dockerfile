FROM node:21.1.0-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]