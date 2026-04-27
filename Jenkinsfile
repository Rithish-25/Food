pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_COMMAND = "docker-compose"
        COMPOSE_PROJECT_NAME = "food"
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
                // Force remove any conflicting containers with these names
                sh "docker rm -f food-backend food-frontend food-prometheus food-grafana food-node-exporter || true"
                // Remove existing project containers
                sh "${DOCKER_COMPOSE_COMMAND} down --remove-orphans"
                // Start fresh containers
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
