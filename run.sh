docker build -t raulplesa/hackernews .
docker run -d -p 13001:13001 --name hackernews raulplesa/hackernews