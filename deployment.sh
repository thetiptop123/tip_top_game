#!/bin/bash

set -e  # Exit on error
set -o pipefail  # Catch errors in pipelines

LOG_FILE="/var/log/deploy.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "Starting deployment at $(date)"

if [ -z "$1" ];
 then echo "No branch specified. Usage: ./deploy.sh <branch>"
 exit 1
fi


# Detect branch (passed as an argument or default to 'prod')
BRANCH=$1
export BRANCH


# Pull latest code
echo "Entering on folder corresponding to $1 branch"
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

# Ajouter dynamiquement le répertoire courant comme safe.directory pour Git
echo "Adding $(pwd) to Git safe.directory"
git config --global --add safe.directory "$(pwd)"

echo "Changing branch to $BRANCH"
git checkout $BRANCH

# If the branch is preprod or main, stash changes, then pull
if [[ "$BRANCH" == "preprod" || "$BRANCH" == "main" ]]; then
    echo "Stashing changes before pulling latest code..."
    git stash
fi

echo "Pulling latest changes from GitHub..."
 git pull origin "$BRANCH" --no-edit

# Map branch to environment version
case "$1" in
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
        echo "Error: Invalid branch name '$1'. Allowed values: develop, preprod, main."
        exit 1
        ;;
esac
echo "Branch '$1' mapped to deployment version '$VERSION'."
export VERSION # Export for use in other commands if necessary


# Build and restart containers
echo "Building and restarting frontend & backend containers..."

# Dynamically name the containers and images based on the branch
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

# Clean up any orphan containers before rebuilding and restarting services
echo "Cleaning up orphan containers..."
docker-compose down --remove-orphans

docker-compose build $FRONTEND_DOCKER_IMAGE_NAME $BACKEND_DOCKER_IMAGE_NAME
docker-compose up -d --remove-orphans  $FRONTEND_DOCKER_IMAGE_NAME $BACKEND_DOCKER_IMAGE_NAME

echo "Backing up Docker images to S3..."

images=($FRONTEND_IMAGE $BACKEND_IMAGE)

for image in "${images[@]}"; do
  echo "Backing up $image to backup bucket"
  docker save $image | gzip | rclone rcat s3remote:thetiptop-s3-backup/$(date +%Y-%m-%d)/$image.tar.gz  --s3-no-check-bucket
done


#Clear old backups on bucket
echo "Cleaning old versions..."
if rclone lsd s3remote:thetiptop-s3-backup/$VERSION >/dev/null 2>&1; then
    echo "Cleaning old versions..."
    rclone delete s3remote:thetiptop-s3-backup/$VERSION/
else
    echo "Directory s3remote:thetiptop-$VERSION/ does not exist. Skipping deletion."
fi


# Sync frontend and backend to the corresponding S3 bucket without --delete
echo "Syncing frontend & backend files to AWS S3..."
rclone sync . s3remote:thetiptop-s3-backup/$VERSION
docker save tip_top_game_backend | gzip | rclone rcat s3remote:thetiptop-s3-backup/$VERSION/tip_top_game_backend.tar

# Ensure .htaccess file is correctly handling the routing
echo "RewriteEngine On
RewriteCond %{HTTP_HOST} ^yourdomain.com$
RewriteCond %{REQUEST_URI} !^/(develop)/
RewriteRule ^(.*)$ /develop/$1 [L]" | sudo tee /var/www/.htaccess > /dev/null

# Restart necessary services (Jenkins, Traefik, etc.) to apply changes
echo "Restarting services..."
docker restart $FRONTEND_CONTAINER $BACKEND_CONTAINER sonarqube traefik prometheus grafana

# Clear old backups (keep last 7 days) without using --delete flag
echo "Cleaning old backups..."

echo "Setting back containers from develop branch…"
git checkout $BRANCH
docker-compose stop frontend backend
docker-compose up -d --build frontend backend

echo "Deployment completed successfully."