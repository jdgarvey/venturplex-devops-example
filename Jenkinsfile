pipeline {
  agent {
    label "jenkins-nodejs"
  }
  stages {
    stage('Install') {
      steps {
        container('nodejs') {
          echo 'Upgrading Yarn'
          sh 'npm config set unsafe-perm true'
          sh 'npm i -g yarn'
          sh "cd client && yarn"
        }
      }
    }
    stage('Lint') {
      steps {
        container('nodejs') {
          echo 'Linting client Application'
          sh "cd client && yarn lint"
        }
      }
    }
    stage('Unit Test') {
      steps {
        container('nodejs') {
          echo 'Unit Testing'
          sh "cd client && yarn test"
        }
      }
    }
    stage('E2E Testing') {
      steps {
        container('nodejs') {
          echo "E2E Testing"
          sh "cd client && yarn e2e"
        }
      }
    }
  }
}
