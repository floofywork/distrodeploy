# DistroDeploy

A quick way to deploy docker linux distributions to do some quick code testing.

## Development Guide

-   Install Docker Desktop or just Docker (If you can work without GUI all based on cli)
-   Create bot for discord
-   Create .env file in the root
-   Add `DISCORD_TOKEN` and `CLIENT_ID` from the discord bot into the .env
-   The `docker-compose.yml` is actually for production but it's fine just will be a bit slower because of the sleep 20 seconds every start to wait db to start up but it's not really needed for development
-   Run `docker compose up --build -d`
-   You're done the bot should be running
-   To stop it run `docker compose down`. If you want to clear all data including database run `docker compose down -v`

### Changing VM Provider

-   In `./src/Providers/` there is Base provider and Docker provider. Base provider is the abstract class you will need to implement to make new provider.
-   After you make the new provider maybe with `QEMU` change provider in `./src/DiscordBot/Data/BotProvider.ts` into your new provider

## Deployment Guide

-   Install Docker
-   Create bot for discord
-   Create .env file in the root
-   Add `DISCORD_TOKEN` and `CLIENT_ID` from the discord bot into the .env
-   Run `docker compose up --build -d`
-   You're done the bot should be running
-   To stop it run `docker compose down`. If you want to clear all data including database run `docker compose down -v`
