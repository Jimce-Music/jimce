FROM oven/bun:alpine

WORKDIR /app
COPY ./src ./src
COPY meta-prod.yml meta.yml
COPY package.json bun.lock bunfig.toml drizzle.config.ts LICENSE ./

RUN bun install --frozen-lockfile

CMD [ "bun", "run", "run:prod" ]