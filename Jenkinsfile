pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build and Push Docker image') {
            steps {
                script {
                    sh 'BuildAndPushDockerImage.sh'
                }
            }
        }
    }
}