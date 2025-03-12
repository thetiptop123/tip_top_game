# Makefile
# -----------
# Ce Makefile fournit des commandes pour gérer vos services via Docker Compose.
# Utilisez "make dev" pour lancer tous vos services avec un build préalable.

SHELL := /bin/bash

# Cible principale : lance les services en mode dev (build + up)
up:
	docker compose up --build -d

# Arrêter les services (sans les supprimer)
stop:
	docker compose stop

# Supprimer les services et les réseaux associés
clean:
	docker compose downÒ

# Consulter les logs en direct
logs:
	docker compose logs -f
