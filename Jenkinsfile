pipeline {
    agent any

    environment {
        APP_NAME = "ggcl-gateway"
        APP_DIR = "/srv/nest-app/ggcl-gateway"  // Thư mục trên VPS chứa app
        GIT_BRANCH = "main"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${GIT_BRANCH}", url: 'git@github.com:hoanghiep4298/ggcl-gateway.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install -f'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no hoanghiep4298_shop@104.154.226.56 << 'ENDSSH'
                cd ${APP_DIR}
                git pull origin ${GIT_BRANCH}
                npm install --production
                npm run build
                pm2 restart ${APP_NAME} || pm2 start dist/main.js --name ${APP_NAME}
                ENDSSH
                """
            }
        }
    }

    post {
        failure {
            echo "❌ Deploy failed for ${APP_NAME}"
        }
        success {
            echo "✅ Deploy success for ${APP_NAME}"
        }
    }
}
