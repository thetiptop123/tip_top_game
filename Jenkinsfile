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
                    // Change to the appropriate directory (if your repository structure demands it)
                    // If your repository already contains all code and the deployment.sh script is at the root,
                    // you may not need to change directories. If you need different directories per environment,
                    // then your deployment.sh should handle that too.
                    //
                    // Here, we assume that deployment.sh is at the root and works by itself, based on the branch.
                    //
                    // Make sure the deployment script is executable.
                    sh "chmod +x deployment.sh"
                    // Call the deployment script with the branch name as a parameter.
                    sh "./deployment.sh ${env.BRANCH_NAME}"
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
