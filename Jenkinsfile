// Declare shared variables outside the pipeline block so they persist
def sharedVersion = ""
def sharedDeployDir = ""

pipeline {
    agent any

    environment {
        // Deployment directories on the VPS according to branch
        DEVELOP_DIR = 'tip_top_game'
        PREPROD_DIR  = 'tip_top_game_preprod'
        MAIN_DIR     = 'tip_top_game_main'
        // (Do not attempt to modify these global environment variables later)
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
                    // Trim and assign branch name
                    def branchName = env.BRANCH_NAME ? env.BRANCH_NAME.trim() : ''
                    echo "BRANCH_NAME (trimmed): '${branchName}'"

                    // Set shared variables based on branch
                    if (branchName == 'develop') {
                        sharedVersion = 'test'
                        sharedDeployDir = env.DEVELOP_DIR
                    } else if (branchName == 'preprod') {
                        sharedVersion = 'preprod'
                        sharedDeployDir = env.PREPROD_DIR
                    } else if (branchName == 'main') {
                        sharedVersion = 'prod'
                        sharedDeployDir = env.MAIN_DIR
                    } else {
                        echo "Branch '${branchName}' is a feature branch; skipping deployment."
                        currentBuild.result = 'SUCCESS'
                        error("Not a deployment branch. Exiting pipeline.")
                    }
                    echo "Environment mapped: VERSION=${sharedVersion}, DEPLOY_DIR=${sharedDeployDir}"
                }
            }
        }

// stage('Test-Backend') {
//     agent {
//         docker {
//             image 'node:18'
//             args '-u root:root'
//         }
//     }
//     steps {
//         dir('backend') {
//             sh "npm install"
//             sh "npm test"
//         }
//     }
// }

stage('Test-Frontend') {
    agent {
        docker {
            image 'node:18'
            args '-u root:root'
        }
    }
    steps {
        dir('frontend') {
            sh "npm install"
            sh "npm test"
        }
    }
}

        stage('Deploy') {
            // Run the deploy stage on the deploy agent (which is our VPS)
            agent { label 'deploy' }
            steps {
                script {
                    echo "Deploying on agent with directory: ${sharedDeployDir}"
                    // Use the shared variable instead of env.DEPLOY_DIR
                    sh "chmod +x /var/www/${sharedDeployDir}/deployment.sh"
                    sh "cd /var/www/${sharedDeployDir} && ./deployment.sh ${env.BRANCH_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment for branch '${env.BRANCH_NAME}' (${sharedVersion}) completed successfully."
        }
        failure {
            echo "Deployment for branch '${env.BRANCH_NAME}' failed. Please check the Jenkins log."
        }
    }
}