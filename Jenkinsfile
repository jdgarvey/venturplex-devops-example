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
          sh "make install-node-modules"
        }
      }
    }
    stage('Lint') {
      steps {
        container('nodejs') {
          echo 'Linting client Application'
          sh "make lint"
        }
      }
    }
    stage('Unit Test') {
      steps {
        container('nodejs') {
          echo 'Unit Testing'
          sh "make test"
        }
      }
    }
    stage('E2E Testing') {
      steps {
        container('nodejs') {
          echo "E2E Testing"
          sh "make e2e"
        }
      }
    }
  }
}
