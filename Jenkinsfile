pipeline {
    agent any
    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/stutig123/Hotel-Booking.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t hotel-booking-app .'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                        sh "docker push hotel-booking-app"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Add Ansible or your custom deploy script here
                    echo 'Deploying app...'
                }
            }
        }
    }
}

