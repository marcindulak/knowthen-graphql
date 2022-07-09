# Test

echo "exec server: hello" && docker-compose -f docker-compose.yml exec -T server node src/server.js "{ hello }"
