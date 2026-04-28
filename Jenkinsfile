pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_COMMAND = "docker-compose"
        COMPOSE_PROJECT_NAME = "food-production"
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
                // Stop and remove existing containers for this project
                sh "${DOCKER_COMPOSE_COMMAND} down --remove-orphans || true"
                
                // Also cleanup any containers from manual runs that might be using the same ports (e.g. 9100)
                sh "docker rm -f food-backend-1 food-frontend-1 food-prometheus-1 food-grafana-1 food-node-exporter-1 || true"
                // Start the app in its own project
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
