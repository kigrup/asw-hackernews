docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
echo y | docker image prune -a