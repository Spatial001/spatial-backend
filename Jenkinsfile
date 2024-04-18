pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }
        stage('Push image to registry') {
            steps {
                script {
                    sh 'docker-compose push'
                }
            }
        }
    }
}