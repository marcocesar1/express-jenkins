pipeline {
  agent any
    
  stages {
    stage('Clone Repository') {
      steps {
            git branch: "main",
            credentialsId: 'toys',
            url: "https://github.com/marcocesar1/express-jenkins.git"
      }
    }
    stage('Postgres volume dir') {
      steps {
        sh 'mkdir -p postgres'
      }
    }
    stage('Docker stop container') {
      steps {
        sh 'docker-compose down'
      }
    }
    stage('Docker build container') {
      steps {
        sh 'docker-compose up --build'
      }
    }
  }
}