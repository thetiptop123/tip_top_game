#!/bin/bash

set -e  # Arrêt en cas d'erreur
set -o pipefail  # Capture les erreurs dans les pipelines

LOG_FILE="/var/log/deploy.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "Starting deployment at $(date)"

if [ -z "$1" ]; then 
    echo "No branch specified. Usage: ./deploy.sh <branch>"
    exit 1
fi

# La branche est passée en argument, sinon défaut à 'prod'
BRANCH=$1
export BRANCH

# Détermine le dossier de déploiement en fonction de la branche
echo "Entering folder corresponding to branch: $BRANCH"
case "$BRANCH" in
    develop)
        DEPLOY_DIR="/var/www/tip_top_game"
        ;;
    preprod)
        DEPLOY_DIR="/var/www/tip_top_game_preprod"
        ;;
    main)
        DEPLOY_DIR="/var/www/tip_top_game_main"
        ;;
    *)
        echo "Error: Invalid branch name '$BRANCH'. Allowed values: develop, preprod, main."
        exit 1
        ;;
esac

echo "Using deployment folder: $DEPLOY_DIR"

# Se positionner dans le dossier de déploiement
cd "$DEPLOY_DIR"

# Déclare le répertoire courant comme safe.directory pour Git (éviter des warnings)
echo "Adding $(pwd) to Git safe.directory"
git config --global --add safe.directory "$(pwd)"

###############################################################################
# Vérification des modifications locales sur le VPS avant de changer de branche,
# puis sauvegarde de ces modifications en créant un patch dans un dossier de backup.
###############################################################################

echo "Checking for local modifications on VPS files..."
# La commande git diff-index vérifie s'il existe des modifications non validées
if ! git diff-index --quiet HEAD --; then
    echo "Local modifications detected. Backing up these changes before pulling from GitHub."
    
    # Création d'un dossier de backup avec date et heure dans /tmp
    BACKUP_DIR="/tmp/deploy_backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Création d'un patch contenant l'ensemble des changements non commités
    git diff > "$BACKUP_DIR/local_changes.patch"
    
    echo "Backup completed. Local changes saved as patch in: $BACKUP_DIR/local_changes.patch"
else
    echo "No local modifications detected."
fi

###############################################################################
# Changement de branche et récupération du code depuis GitHub
###############################################################################

echo "Changing branch to $BRANCH"
git checkout "$BRANCH"

# Pour les branches 'preprod' et 'main', sauvegarder en stash les changements avant le pull (optionnel)
if [[ "$BRANCH" == "preprod" || "$BRANCH" == "main" ]]; then
    echo "Stashing any residual changes before pulling latest code..."
    git stash
fi

echo "Pulling latest changes from GitHub..."
git pull origin "$BRANCH" --no-edit

###############################################################################
# Mappage de la branche sur la version d'environnement
###############################################################################

case "$BRANCH" in
    develop)
        VERSION="test"
        ;;
    preprod)
        VERSION="preprod"
        ;;
    main)
        VERSION="prod"
        ;;
    *)
        echo "Error: Invalid branch name '$BRANCH'. Allowed values: develop, preprod, main."
        exit 1
        ;;
esac

echo "Branch '$BRANCH' mapped to deployment version '$VERSION'."
export VERSION  # Pour l'utiliser ultérieurement dans d'autres commandes

###############################################################################
# Construction et redémarrage des containers Docker
###############################################################################

echo "Building and restarting frontend & backend containers..."

# Définition dynamique des noms des images et containers en fonction de la branche
if [[ "$BRANCH" == "preprod" || "$BRANCH" == "main" ]]; then
    FRONTEND_IMAGE="tip_top_game_frontend_${VERSION}"
    BACKEND_IMAGE="tip_top_game_backend-${VERSION}"
    FRONTEND_CONTAINER="tip_top_frontend-${VERSION}"
    BACKEND_CONTAINER="tip_top_backend_${VERSION}"
    FRONTEND_DOCKER_IMAGE_NAME="frontend-${VERSION}"
    BACKEND_DOCKER_IMAGE_NAME="backend-${VERSION}"
else
    FRONTEND_IMAGE="tip_top_game_frontend"
    BACKEND_IMAGE="tip_top_game_backend"
    FRONTEND_CONTAINER="tip_top_frontend"
    BACKEND_CONTAINER="tip_top_backend"
fi

# Nettoyer les containers orphelins avant de reconstruire et redémarrer les services
echo "Cleaning up orphan containers..."
docker-compose down --remove-orphans

# Reconstruction et redémarrage
docker-compose build $FRONTEND_DOCKER_IMAGE_NAME $BACKEND_DOCKER_IMAGE_NAME
docker-compose up -d --remove-orphans $FRONTEND_DOCKER_IMAGE_NAME $BACKEND_DOCKER_IMAGE_NAME

###############################################################################
# Sauvegarde des images Docker sur S3
###############################################################################

# echo "Backing up Docker images to S3..."
# images=($FRONTEND_IMAGE $BACKEND_IMAGE)

# for image in "${images[@]}"; do
#     echo "Backing up $image to backup bucket"
#     docker save "$image" | gzip | rclone rcat s3remote:thetiptop-s3-backup/$(date +%Y-%m-%d)/$VERSION/$image.tar.gz  --s3-no-check-bucket
# done

###############################################################################
# Mise à jour du fichier .htaccess pour la réécriture d'URL
###############################################################################

echo "Ensuring .htaccess file is correctly handling the routing..."
echo "RewriteEngine On
RewriteCond %{HTTP_HOST} ^yourdomain.com$
RewriteCond %{REQUEST_URI} !^/(develop)/
RewriteRule ^(.*)$ /develop/\$1 [L]" | sudo tee /var/www/.htaccess > /dev/null

###############################################################################
# Redémarrage des services nécessaires pour appliquer les modifications
###############################################################################

echo "Restarting services..."
docker restart "$FRONTEND_CONTAINER" "$BACKEND_CONTAINER" sonarqube traefik prometheus grafana

###############################################################################
# Redémarrage final avec mise à jour
###############################################################################

echo "Setting back containers from develop branch…"
git checkout "$BRANCH"
docker-compose stop frontend backend
docker-compose up -d --build frontend backend

echo "Deployment completed successfully."
