pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        IMAGE_NAME = "hoanghiep4298shop/gateway"
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    url: 'git@github.com:hoanghiep4298/ggcl-gateway.git',
                    branch: 'main',
                    credentialsId: 'github-ssh'
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", 'dockerhub-cred') {
                        dockerImage.push("${BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Docker image pushed: ${IMAGE_NAME}:${BUILD_NUMBER}"
        }
        failure {
            echo "Build failed!"
        }
    }
}
