node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
//   stage('Quality Gate') {
//     timeout(time: 1, unit: 'HOURS') {
//       waitForQualityGate abortPipeline: true
//     }
//   }
//   stage('Build') {
//     sh 'echo "Building the project..."'
//   }
//   stage('Test') {
//     sh 'echo "Running tests..."'
//   }
//   stage('Deploy') {
//     sh 'echo "Deploying the application..."'
//   }
// }
//   stage('Post-build Actions') {
//     sh 'echo "Performing post-build actions..."'
//   }
// }
//   stage('Cleanup') {
//     sh 'echo "Cleaning up..."'
//   }
// }
//   stage('Notifications') {
//     sh 'echo "Sending notifications..."'
//   }
// }
//   stage('End') {
//     sh 'echo "Pipeline completed."'
//   }
// }