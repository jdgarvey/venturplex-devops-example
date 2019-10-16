pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh "cd client && yarn"
      }
    }
    stage('Lint') {
      steps {
        sh "cd client && yarn lint"
      }
    }
    stage('Unit Test') {
      steps {
        sh "cd client && yarn test"
      }
    }
    stage('E2E Testing') {
      steps {
        echo "E2E Testing"
        sh "cd client && yarn e2e"
      }
    }
    stage('Build Local') {
      steps {
        sh "make deploy-dev"
      }
    }
  }
}
