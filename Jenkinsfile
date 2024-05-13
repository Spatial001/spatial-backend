pipeline {
    agent any
    environment {
        IMAGE_NAME = "shawchandankumar20/localmongo"
        IMAGE_TAG = "latest"
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push image to registry') { 
            steps {
                script {
                    // Push the Docker image to the registry
                    withDockerRegistry(credentialsId: 'docker-hub-credentials') {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
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
