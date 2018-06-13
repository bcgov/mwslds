
## Templates
The MWSLDS Openshift Environment is setup as 2 projects. The empr-mwslds-tools and the empr-mwslds-<env>, where env are dev, test or prod.
There are 3 templates the are provided: the build, deploy and service. The build configuration are configured in the empr-mwslds-tools project. The deploy and service are to be configured in the empr-mwslds-<env> project.

To actually use the templates run

```sh
oc process -f <path-to-template> | oc create -f -
```
oc process will process the template and print it to stdout,
oc create reads from stdin and creates the objects it sees

The Openshift Webconsole can also be used to use the templates.

### Build Template
The Build Template needs to be executed in the the empr-mwslds-tools project.

Go to project empr-mwslds-<env>. 

```sh
oc project empr-mwslds-dev
```

The build template configures the build pipeline. The build pipeline uses the Jenkins build mechanism. The Jenkins user need to be given an edit access to the empr-mwslds-<env> project.


Go to project empr-mwslds-tools. 

```sh
oc project empr-mwslds-tools
```

Assign access to Jenkins user
```sh

oc policy add-role-to-user edit system:serviceaccount:empr-mwslds-tools:jenkins --namespace=empr-mwslds-<env>
```

Run the build config
oc process -f  | oc create -f openshift-build.json -v SOURCE_REPOSITORY_URL=<repository_of_url_of_mwslds_project>,GITHUB_SECRET=<github_secret_use_in_webhook>  | oc create -f -


### Deployment Template
To setup the deployment config 

The DeploymentConfig requires access to the Image which are stored in empr-mwslds-tools project. Go to project empr-mwslds-tools inorder to give access on the DeploymentConfig

```sh
oc project empr-mwslds-tools
```


Configure the empr-mwslds-<env> user to have access with the image created in empr-mwslds-tools project

```sh
oc policy add-role-to-user system:image-pullers system:serviceaccount:empr-mwslds-<env>:default --namespace=empr-mwslds-tools
```

Go to project empr-mwslds-<env>. 

```sh
oc project empr-mwslds-dev
```

Run the deployment config
oc process -f  | oc create -f openshift-deploy.json -v MWSL_USER=<mwsl_service_account>,MWSL_PASS=<mwsl_service_password>  | oc create -f -







