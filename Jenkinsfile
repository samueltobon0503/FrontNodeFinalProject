pipeline {
  agent any

  stages {
    stage ('Install dependencies') {
      steps {
        echo 'starting installing dependencies...'

        script {
          if (isUnix()) {
            sh 'npm install --legacy-peer-deps'
          } else {
            bat 'npm install --legacy-peer-deps'
          }
        }
      }
    }

    // stage ('Run tests') {
    //   steps {
    //     echo 'starting running tests...'

    //     script {
    //       if (isUnix()) {
    //         sh 'npx ng test --watch=false'
    //       } else {
    //         bat 'npx ng test --watch=false'
    //       }
    //     }
    //   }
    // }

    stage ('Down containers') {
      steps {
        script {
          if (isUnix()) {
            sh 'docker compose down -v'
          } else {
            bat 'docker compose down -v'
          }
        }
      }
    }

    stage ('Build and up containers') {
      steps {
        script {
          if (isUnix()) {
            sh 'docker compose up --build -d'
          } else {
            bat 'docker compose up --build -d'
          }
        }
      }
    }
  }
}
