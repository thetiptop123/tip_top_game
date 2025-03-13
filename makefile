# Makefile
# -----------
# Ce Makefile fournit des commandes pour gérer vos services via Docker Compose.
# Utilisez "make dev" pour lancer tous vos services avec un build préalable.

SHELL := /bin/bash

up:
	docker compose up --build -d

front:
	docker compose up --build frontend
db:
	docker compose up  --build mongodb
back:
	docker compose up  --build backend
	   
logs:
	docker compose logs -f
