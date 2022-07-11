# Test

```sh
bash ../bin/project-restart.sh
echo "exec server: test" && docker-compose -f docker-compose.yml exec -T server curl -s http://localhost:4000/graphql -H 'Content-Type: application/json' --data-binary '{"query":"{ reviews { id book { id } user { id }}}"}'
```
