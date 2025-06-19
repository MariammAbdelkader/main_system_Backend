pipeline {
    agent any

    environment {
        IMAGE_NAME = 'main_system:latest'                          
        DOCKER_HUB_IMAGE = 'mariammohamed1112/maim_system:latest'  
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        MAKEFILE_PATH = 'Makefile'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo ' Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo ' Building Docker image...'
                sh 'make build'
                sh 'docker images'
            }
        }


        stage('Push Docker Image') {
            steps {
                echo ' Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker tag ${IMAGE_NAME} ${DOCKER_HUB_IMAGE}"
                    sh "docker push ${DOCKER_HUB_IMAGE}"
                }
            }
        }


        stage('Start Application') {
            steps {
                echo ' Starting application using docker-compose...'
                sh 'make up'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
            sh 'docker-compose logs'
        }
        failure {
            echo ' Pipeline failed. Cleaning up resources...'
            sh 'make down'
        }
        success {
            echo ' Pipeline executed successfully!'
        }
    }
}
