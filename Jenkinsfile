pipeline {
    agent any

    environment {
        // Répertoires de déploiement sur le VPS pour chaque branche
        DEVELOP_DIR = 'tip_top_game'
        PREPROD_DIR  = 'tip_top_game_preprod'
        MAIN_DIR     = 'tip_top_game_main'
        // Variables dynamiques, à définir dans le stage Set Environment
        VERSION = ''
        DEPLOY_DIR = ''
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Checked out branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Set Environment') {
            steps {
                script {
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
