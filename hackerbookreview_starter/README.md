# Test

```sh
bash ../bin/project-restart.sh
echo "exec server: hello" && docker-compose -f docker-compose.yml exec -T server node src/server.js "{ hello }"
```
