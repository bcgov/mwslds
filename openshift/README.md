
## Templates

there are seperate templates for a build, deployment, and service

to actually use the templates run
```sh
oc process -f <path-to-template> | oc create -f -
```

oc process will process the template and print it to stdout,
oc create reads from stdin and creates the objects it sees
