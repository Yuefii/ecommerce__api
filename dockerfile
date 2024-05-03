FROM node:22-alpine3.18

WORKDIR /app
COPY package.json pnpm-lock.yaml .env ./
RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpx prisma generate
RUN pnpm build
EXPOSE 8080
CMD ["pnpm", "start"]