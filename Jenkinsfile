pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        IMAGE_NAME = "hoanghiep4298shop/ggcl-gateway"
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

        stage('Install & Build NestJS') {
            steps {
                sh 'npm install -f'
                sh 'npm run build'
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

        stage('Update Manifest') {
            steps {
                sh '''
                  # update deployment.yaml with new tag
                  sed -i "s#image: ${IMAGE_NAME}:.*#image: ${IMAGE_NAME}:${BUILD_NUMBER}#g" k8s/deployment.yaml

                  # commit & push back to GitHub so ArgoCD detects change
                  git config user.email "ci@jenkins"
                  git config user.name "Jenkins CI"
                  git add k8s/deployment.yaml
                  git commit -m "Update image to ${IMAGE_NAME}:${BUILD_NUMBER}"
                  git push origin main
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD pipeline completed. Image pushed and manifest updated."
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
