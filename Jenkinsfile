pipeline {
    agent any

    // Define environment variables that map branch names to environment settings.
    environment {
        // Define your environment directories if used by your deployment.sh (adjust paths if needed)
        DEVELOP_DIR = 'tip_top_game'
        PREPROD_DIR  = 'tip_top_game_preprod'
        MAIN_DIR     = 'tip_top_game_main'
        
        // For logging or passing version names to your script
        VERSION = ''
    }

    stages {

        stage('Checkout') {
            steps {
                // Jenkins automatically sets the BRANCH_NAME variable in a multibranch pipeline
                checkout scm
                echo "Checked out branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Set Environment') {
            steps {
                script {
                    // Map branch names to versions/environments.
                    // Adjust these conditions based on your workflow.
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
                        // For feature branches, we might not want to deploy automatically.
                        echo "Branch ${env.BRANCH_NAME} is a feature branch; skipping deployment."
                        // Optionally, you can choose to run unit tests or other actions here.
                        currentBuild.result = 'SUCCESS'
                        // Exit the pipeline early if no deployment is needed.
                        error("Not a deployment branch. Exiting pipeline.")
                    }
                    echo "Environment mapped: VERSION=${env.VERSION}, DEPLOY_DIR=${env.DEPLOY_DIR}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Utiliser SSH pour se connecter au VPS et exécuter le script de déploiement.
                    sshagent(['vps-ssh-credential']) {
                        // Assurez-vous que l'adresse IP ou le DNS du VPS est correct et accessible depuis Jenkins.
                        sh """
                           ssh -o StrictHostKeyChecking=no tiptop@46.202.168.187 'cd /var/www/tip_top_game && ./deployment.sh ${env.BRANCH_NAME}'
                           """
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
