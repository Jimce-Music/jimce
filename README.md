# Jimce

A local first music server for everyone.

## Hosting Jimce

Currently, Jimce is not ready to host. But when it will be, we will provide a docker-compose.yml file for you to get started in seconds.

## Developing

To start contributing to Jimce, make sure you are in the right repository. This one contains the code for the entire backend, but not for the web client or mobile app. If this is your correct repo, follow these steps to get started developing Jimce in just a minute.

1. Make sure you installed [Docker](https://www.docker.com/) and `docker compose` is working
2. Make sure [Bun](https://bun.sh/) is installed
3. Clone this repository: `git clone https://github.com/Jimce-Music/jimce.git`
4. Open the repo directory `cd jimce`
5. Install the dependencies: `bun i --frozen-lockfile`
6. Run the server via `bun run dev`
7. Start writing code in your favorite IDE

### Alternative dev build via docker

To run the jimce dev build in docker, choose one of these methods:

#### 1. Prebuilt image

This method is recommended to anyone who does not plan on making changes to the repo and just wants to try a specific server dev version, maybe even on a PR.
However, you need to download / create the config files manually. The second method requires fewer commands and configuration to get started.

1. Make sure you installed [Docker](https://www.docker.com/) and `docker compose` is working
2. Run these commands:

```bash
mkdir jimce && cd jimce
curl https://raw.githubusercontent.com/Jimce-Music/jimce/refs/heads/dev/docker-compose.prebuilt-dev.yml -o docker-compose.yml
curl https://raw.githubusercontent.com/Jimce-Music/jimce/refs/heads/dev/config.yml -o config.yml
curl https://raw.githubusercontent.com/Jimce-Music/jimce/refs/heads/dev/meta.yml -o meta.yml
curl https://raw.githubusercontent.com/Jimce-Music/jimce/refs/heads/dev/.env.example -o .env

docker compose up
```

#### 2. Via the git repo

This is recommended if you plan on making changes to the code:

1. Make sure you installed [Docker](https://www.docker.com/) and `docker compose` is working
2. Run these commands:

```bash
git clone https://github.com/Jimce-Music/jimce.git
cd jimce
docker compose -f docker-compose.dev.yml up --build
```

### Additional development tools

Here are some useful tools for developing on jimce:

#### 1. Online API docs

Visit <https://jimce-music.github.io/jimce/latest-dev/> for the latest API docs for the dev-branch.
Additional URLS include:

1. Latest commit on main <https://jimce-music.github.io/jimce/latest/>
2. For a specific commit short hash (like: 8a6893a) <https://jimce-music.github.io/jimce/commit/8a6893a/>

TODO: Add info regarding jimce-dev docker image and jimce api client packages
