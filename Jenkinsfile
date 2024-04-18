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
        stage('Stop previous container') {
            steps {
                script {
                    sh 'docker-compose down'
                }
            }
        }
        stage('Start application container') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}