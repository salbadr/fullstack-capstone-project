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

## Deploy Backend

Go to the backend server at `giftlink-backend` and run the command:
```
kubectl apply -f deployment.yml 
```

The expose the port 3060 using the command:
```
kubectl port-forward --address 0.0.0.0 svc/gift-app-service 3060:80
```
## Deploy Fontend

Go to the frontend client at `giftlink-front` and make the buikd:
```
npm run build
```

This will build the client in `giftwebsite`. Go to the folder and build a docker image and run it
```
docker build -t giftlink-website:latest .

docker run -d -p 9000:9000 --name giftlink-website
```












