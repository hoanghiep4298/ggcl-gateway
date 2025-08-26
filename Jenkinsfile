pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        DOCKER_CREDS = credentials('docker-hub')  // ID của Jenkins credentials
        IMAGE_NAME = "hoanghiep4298shop/gateway"
        BRANCH = "main"
        ARGOCMD = "/usr/local/bin/argocd"   // cần cài CLI vào Jenkins hoặc agent
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}", url: 'git@github.com:hoanghiep4298/ggcl-gateway.git', credentialsId: 'github-ssh'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh "echo ${DOCKER_CREDS_PSW} | docker login -u ${DOCKER_CREDS_USR} --password-stdin"
                sh "sudo docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                sh "sudo docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                sh "sudo docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
                sh "sudo docker push ${IMAGE_NAME}:latest"
            }
        }

        // stage('ArgoCD Deploy') {
        //     steps {
        //         // Cách 1: trigger ArgoCD CLI
        //         sh "${ARGOCMD} login argocd-server --username admin --password $ARGOCD_PASS --insecure"
        //         sh "${ARGOCMD} app set my-nestjs-app --revision ${IMAGE_NAME}:${BUILD_NUMBER}"
        //         sh "${ARGOCMD} app sync my-nestjs-app"

        //         // Cách 2: gọi API ArgoCD (REST) nếu không dùng CLI
        //         // sh "curl -k -H \"Authorization: Bearer $ARGOCD_TOKEN\" -X POST https://argocd-server/api/v1/applications/my-nestjs-app/sync"
        //     }
        // }
    }
}

