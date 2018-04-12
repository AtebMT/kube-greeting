# Kube

Kubernetes test playground

## Overview

Creates two very simple services that can be deployed to K8s. Demonstrates K8s services, deployments, scaling and service to service communication.

The two services are:

* Hello - Returns the text `Hello` followed by the hostname of the service.
* Greeting - Calls hello and returns that greeting, also followed by the hostname of the service.

## Getting started

### Install kubectl on your local machine.

* Install using the instructions at https://kubernetes.io/docs/setup/independent/install-kubeadm/ which also incudes `kubectl`
* Setup `kubectl` to use the test k8s cluster:
 ```
 mkdir -p $HOME/.kube
 scp -r fh1-kubet01.dun.fh:~/admin.conf ~/.kube/config
 ```
 (This assumes you have ssh access into `fh1-kubet01`. If not, speak to Spanners.)

### Deploy servics to k8s

* Clone the repo
* We have two services, both of which need to be built separetly. The steps are the same for each.
* `cd` into the folder (greeting or hello)
* `usher run pubish version={version}` will build & publish the service image to the internal FMP docker repo.
* Edit the deployment YAML file and change the container image to use the version you just published
* `usher run create_service` will create the k8s proxy and load balancer for the service
* `usher run create_deployment` will deploy the service pods and manage other deployment aspects (like keeping track of the number of replicas)

Each service creates 3 replicas. Verify that the pods are created and running.

```
kubectl get pods
NAME                                       READY     STATUS    RESTARTS   AGE
kube-greeting-deployment-d9c9cbd95-4lk8m   1/1       Running   0          38m
kube-greeting-deployment-d9c9cbd95-js699   1/1       Running   0          37m
kube-greeting-deployment-d9c9cbd95-rfff4   1/1       Running   0          38m
kube-hello-deployment-5d5fdcbb84-b6h49     1/1       Running   0          31m
kube-hello-deployment-5d5fdcbb84-m9r4m     1/1       Running   0          31m
kube-hello-deployment-5d5fdcbb84-r9xl6     1/1       Running   0          31m
```

### Testing

We have no ingress into the cluster endpoint yet, so to access the service from outside the cluster you'll need to know the port number the service is listening on:

```
$ kubectl get svc
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kube-greeting-service   NodePort    10.103.52.221    <none>        6001:31023/TCP   2h
kube-hello-service      NodePort    10.104.189.120   <none>        6002:31628/TCP   2h
kubernetes              ClusterIP   10.96.0.1        <none>        443/TCP          3h
```

In this case the greeting service is listening on `31023`. Send a curl command to the cluster with that port to query the service.

```
$ curl http://fh1-kubet01.dun.fh:31023
Hello from kube-hello-deployment-5d5fdcbb84-b6h49 to you from kube-greeting-deployment-d9c9cbd95-rfff4!
```

Run this a few times and you should see that the host names will change.

```
$ curl http://fh1-kubet01.dun.fh:31023
Hello from kube-hello-deployment-5d5fdcbb84-m9r4m to you from kube-greeting-deployment-d9c9cbd95-4lk8m!
```
