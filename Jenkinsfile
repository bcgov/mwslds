node('maven') {

    stage('checkout') {
       echo "checking out source"
       echo "Build: ${BUILD_ID}"
       checkout scm
    }
}

node('master') {
	
    stage ('build')
    {
	openshiftBuild(buildConfig: 'mwslds-build', showBuildLogs: 'true')
    }
    
    stage ('dev deploy')
    {
	openshiftTag destStream: 'mwslds', verbose: 'true', destTag: 'dev', srcStream: 'mwslds', srcTag: 'latest'
	openshiftVerifyDeployment depCfg: 'mwslds', namespace: 'empr-mwslds-dev ', replicaCount: 1, verbose: 'false'
    }

}


