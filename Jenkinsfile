pipeline {
    agent any

    environment {
        // Deployment directories on the VPS according to branch
        DEVELOP_DIR = 'tip_top_game'
        PREPROD_DIR  = 'tip_top_game_preprod'
        MAIN_DIR     = 'tip_top_game_main'
        // These variables will be defined dynamically in the "Set Environment" stage
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
            // Run the deploy stage on the deploy agent
            agent { label 'deploy' }
            steps {
                script {
                    // Since the deploy agent is on the VPS, commands are local.
                    // Ensure the deployment script is executable and then run it.
                    sh "chmod +x /var/www/${env.DEPLOY_DIR}/deployment.sh"
                    sh "cd /var/www/${env.DEPLOY_DIR} && ./deployment.sh ${env.BRANCH_NAME}"
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
