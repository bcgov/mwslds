
node {
	
    stage ('build')
    {
	openshiftBuild(buildConfig: 'mwslds-build', showBuildLogs: 'true')
    }
    
    stage ('dev deploy')
    {
	openshiftTag destStream: 'mwslds', verbose: 'true', destTag: 'dev', srcStream: 'mwslds', srcTag: 'latest'
	openshiftVerifyDeployment depCfg: 'mwslds-deploy', namespace: 'empr-mwslds-dev ', replicaCount: 1, verbose: 'false'
    }

}


