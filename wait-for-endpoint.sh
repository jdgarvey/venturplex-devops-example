# !/bin/bash
while [ -z "$ENDPOINT" ]
do
  echo "Endpoint not set, waiting for 1s"
  export ENDPOINT=`kubectl get service server-release -o jsonpath={.status.loadBalancer.ingress[0].hostname}`
  # Give up after 1 minute
  ((c++)) && ((c==60)) && break
  sleep 1
done
echo "ENDPOINT successfully set to $ENDPOINT"
