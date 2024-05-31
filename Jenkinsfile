pipeline {
    agent any
    environment {
        IMAGE_NAME = "shawchandankumar20/localmongo"
        IMAGE_TAG = "latest"
        K8S_HOST_IP = "100.25.146.127"
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 1, unit: 'HOURS') {
                        waitForQualityGate abortPipeline: true
                    }
                }
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
                    sh 'scp -o StrictHostKeyChecking=no spatial-deployment.yaml ubuntu@${K8S_HOST_IP}:/home/ubuntu'
                    script{
                        try{
                            sh 'ssh ubuntu@${K8S_HOST_IP} "sudo kubectl apply -f .; export KUBECONFIG="$(sudo k3d kubeconfig write mycluster)"; sudo k3d node edit k3d-mycluster-serverlb --port-add 8081:30036;"'
                        }catch(error) {
                            sh 'ssh ubuntu@${K8S_HOST_IP} sudo kubectl create -f .'
                        }
                    }
                }
            }
        }
    }
}
