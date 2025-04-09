pipeline {
    agent any

    environment {
        // Répertoires de déploiement sur le VPS selon la branche
        DEVELOP_DIR = 'tip_top_game'
        PREPROD_DIR  = 'tip_top_game_preprod'
        MAIN_DIR     = 'tip_top_game_main'
        // Ces variables seront définies dynamiquement dans le stage "Set Environment"
        VERSION = ''
        DEPLOY_DIR = ''
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Checked out branch: '${env.BRANCH_NAME}'"
            }
        }

        stage('Set Environment') {
            steps {
                script {
                    // Affichez la valeur brute de BRANCH_NAME pour debug (encadrée par des quotes)
                    echo "BRANCH_NAME (raw): '${env.BRANCH_NAME}'"
                    // On retire les espaces superflus
                    def branchName = env.BRANCH_NAME ? env.BRANCH_NAME.trim() : ''
                    echo "BRANCH_NAME (trimmed): '${branchName}'"

                    if (branchName == 'develop') {
                        env.VERSION = 'test'
                        env.DEPLOY_DIR = env.DEVELOP_DIR
                    } else if (branchName == 'preprod') {
                        env.VERSION = 'preprod'
                        env.DEPLOY_DIR = env.PREPROD_DIR
                    } else if (branchName == 'main') {
                        env.VERSION = 'prod'
                        env.DEPLOY_DIR = env.MAIN_DIR
                    } else {
                        echo "Branch '${branchName}' is a feature branch; skipping deployment."
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
                        // Pour déboguer, on peut afficher brièvement le nom de l'utilisateur et vérifier que la variable SSH_KEY existe
                        echo "SSH_USER: ${SSH_USER}"
                        sh """
                           ssh -vvv -i ${SSH_KEY} -o StrictHostKeyChecking=no ${SSH_USER}@46.202.168.187 'cd /var/www/${env.DEPLOY_DIR} && ./deployment.sh ${env.BRANCH_NAME}'
                           """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment for branch '${env.BRANCH_NAME}' (${env.VERSION}) completed successfully."
        }
        failure {
            echo "Deployment for branch '${env.BRANCH_NAME}' failed. Please check the Jenkins log."
        }
    }
}
