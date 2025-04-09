pipeline {
    agent any

    // Déclaration des variables d'environnement globales
    environment {
        // Répertoires de déploiement sur le VPS pour chaque branche
        DEVELOP_DIR = 'tip_top_game'
        PREPROD_DIR  = 'tip_top_game_preprod'
        MAIN_DIR     = 'tip_top_game_main'
        // Variables pour la version d'environnement et le dossier de déploiement, qui seront définies dynamiquement
        VERSION = ''
        DEPLOY_DIR = ''
    }

    stages {

        stage('Checkout') {
            steps {
                // Jenkins effectue un checkout du code source
                checkout scm
                echo "Checked out branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Set Environment') {
            steps {
                script {
                    // Selon la branche, nous configurons les variables VERSION et DEPLOY_DIR
                    if (env.BRANCH_NAME == 'develop') {
                        env.VERSION = 'test'
                        env.DEPLOY_DIR = env.DEVELOP_DIR
                    } else if (env.BRANCH_NAME == 'preprod') {
                        env.VERSION = 'preprod'
                        env.DEPLOY_DIR = env.PREPROD_DIR
                    } else if (env.BRANCH_NAME == 'main') {
                        env.VERSION = 'prod'
                        env.DEPLOY_DIR = env.MAIN_DIR
                    } else {
                        // Si c'est une branche de feature, on arrête le pipeline
                        echo "Branch ${env.BRANCH_NAME} is a feature branch; skipping deployment."
                        currentBuild.result = 'SUCCESS'
                        error("Not a deployment branch. Exiting pipeline.")
                    }
                    echo "Environment mapped: VERSION=${env.VERSION}, DEPLOY_DIR=${env.DEPLOY_DIR}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Utilisation de withCredentials pour récupérer la clé SSH et l'utilisateur
                    withCredentials([
                        sshUserPrivateKey(credentialsId: 'vps-ssh-credential', 
                                            keyFileVariable: 'SSH_KEY', 
                                            usernameVariable: 'SSH_USER')
                    ]) {
                        // Exécuter la commande SSH avec l'option -i qui spécifie la clé privée
                        sh """
                           ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@46.202.168.187 'cd /var/www/${env.DEPLOY_DIR} && ./deployment.sh ${env.BRANCH_NAME}'
                           """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment for branch ${env.BRANCH_NAME} (${env.VERSION}) completed successfully."
        }
        failure {
            echo "Deployment for branch ${env.BRANCH_NAME} failed. Please check the Jenkins log."
        }
    }
}
