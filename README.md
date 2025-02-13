# Bon déroulement du développement du projet ThéTipTop project

## Lien pour accéder aux différents containers:

### Localement:

Grafana:
`http://localhost:3001`

Prometheus:
`http://localhost:9090`

SonarQube:
`http://localhost:9000`

Jenkins:
`http://localhost:8080`

Frontend:
`http://localhost:4200`


### A distance (VPS):

Grafana:
`http://46.202.168.187:3001`

Prometheus:
`http://46.202.168.187:9090`

SonarQube:
`http://46.202.168.187:9000`

Jenkins:
`http://46.202.168.187:8080`

Frontend:
`http://46.202.168.187:4200`

## Commandes pour lancer docker-compose localement:
`docker-compose down`
`docker-compose up -d --build`

⚠️⚠️⚠️ A noter que cette étape n'est pas obligatoire puisque les containers tournent sur le VPS. Seules les parties frontend et backend doivent être lancées localement afin de visualiser/tester les changements.⚠️⚠️⚠️

## Bonnes pratiques en terme de développement:
1. Toujours créer une branche par fonctionnalité - voire idéalement par ticket

2. Le nom de la branche doit être structurée comme suit:
    `3T-WGtdxfv5`

Où:
    - 3T: ThéTipTop (TTT -> 3T -> nom du projet);
    - WGtdxfv5: numéro du ticket présent dans l'url: https://trello.com/c/WGtdxfv5/50-readmemd-updates. En mettant l'id du ticket, on retrouvera facilement ce dernier en entrant le lien suivant: https://trello.com/c/WGtdxfv5

3. Les commits doivent suivre les structures suivantes:
    - `3T-WGtdxfv5: [changements faits]`
    - `Fix 3T-WGtdxfv5: [changements faits]`

De cette manière, on aura plus de facilité à retrouver une portion de code code modifié à partir du ticket et inversement (retrouver à quel développement de fonctionnalité correspondait une portion de code modifié).