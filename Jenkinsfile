pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_COMMAND = "docker compose"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                // Code is checked out automatically by Jenkins pipeline
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker images...'
                sh "${DOCKER_COMPOSE_COMMAND} build"
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here, e.g.:
                // sh "${DOCKER_COMPOSE_COMMAND} run --rm backend npm test"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Restarting containers to ensure they use the new images
                sh "${DOCKER_COMPOSE_COMMAND} up -d"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
