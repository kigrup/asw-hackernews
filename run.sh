docker build --rm -t raulplesa/hackernews .
docker stop hackernews
echo y | docker system prune
docker run -d -p 13001:13001 --name hackernews raulplesa/hackernews
