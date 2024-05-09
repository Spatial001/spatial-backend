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
        stage('Deployment to K8S cluster') { 
            steps {
                sshagent(['kubernetes-cluster']) {
                    sh 'scp -o StrictHostKeyChecking=no spatial-deployment.yaml ubuntu@52.91.174.13:/home/ubuntu'
                    script{
                        try{
                            sh 'ssh ubuntu@52.91.174.13 sudo kubectl apply -f .'
                        }catch(error) {
                            sh 'ssh ubuntu@52.91.174.13 sudo kubectl create -f .'
                        }
                    }
                }
            }
        }
    }
}
