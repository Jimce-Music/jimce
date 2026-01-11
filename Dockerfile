FROM oven/bun:alpine

WORKDIR /app
COPY ./src ./src
COPY package.json bun.lock bunfig.toml meta.yml drizzle.config.ts LICENSE ./

RUN bun install --frozen-lockfile

CMD [ "bun", "run", "run:prod" ]