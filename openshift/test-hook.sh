#! /bin/bash

curl -k https://192.168.42.131:8443/oapi/v1/namespaces/react-demo/buildconfigs/react-build/webhooks/MeohjqMYiuRduhcquMjMr5tli7Y7N4wRe6vyCi1q/generic -d @github-webhook-push.json -H "Content-Type: applictaion/json"
