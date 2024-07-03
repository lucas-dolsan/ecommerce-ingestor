docker login

echo "Building images..."

docker build -t lucasdolsan/auth:latest ./auth
docker build -t lucasdolsan/ingestion-api:latest ./ingestion-api
docker build -t lucasdolsan/ingestion-worker:latest ./ingestion-worker
docker build -t lucasdolsan/ingestion-ui:latest ./ingestion-ui
docker build -t lucasdolsan/report-and-alerts:latest ./report-and-alerts

echo "Pushing images..."
docker push lucasdolsan/auth:latest
docker push lucasdolsan/ingestion-api:latest
docker push lucasdolsan/ingestion-worker:latest
docker push lucasdolsan/ingestion-ui:latest
docker push lucasdolsan/report-and-alerts:latest
