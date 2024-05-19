FROM node:22-alpine3.18

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
COPY . .
RUN pnpm install

# for production
# RUN pnpm prisma generate
# RUN pnpm build

EXPOSE 8080
CMD ["pnpm", "dev"]

# CMD ["pnpm", "start"]

