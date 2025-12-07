#  Kubernetes Local Deployment
This will deploy an instance of MongoDB and expose it as a NodePort on port 27017. 

To work with Kubernetes locally, you need to install minikube. You can install it here https://minikube.sigs.k8s.io/docs/. Minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. 

After installing, start minikube to start a kubectl cluster

```minikube start ```

# Deploy Mongo
We need to create an instance of MongoDB.
## Create Secret

Create a secret to login to MongoDB instance:
```
kubectl create secret generic mongo-creds --from-literal=username='admin' --from-literal=password='password123'
```

To verify and manage the secret, refer to: https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/

## Deploy MongoDB

```
kubectl apply -f deploymongo.yml 
```

Verify deployment
```
kubectl get deployments
```

Verify services
```
kubectl get services
```

Verify that MongoDB is working

Go to the shell
```
 kubectl exec svc/mongodb-service --stdin --tty -- /bin/bash
```

Inside the shell type: 
```
mongosh
```

You should be inside MongoDB. Exit out of it by typing `exit`

## Docker Login
To pull from docker, you will need to setup the credentials. You can do that as follows:
```
kubectl create secret docker-registry regcred \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --docker-email=<your-email>
```






