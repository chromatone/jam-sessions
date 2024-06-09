FROM node:20 as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 4210

CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "4210"]
