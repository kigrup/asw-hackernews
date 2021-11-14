docker stop hackernews
git pull
./run-detached.sh
clear
docker logs hackernews -f
