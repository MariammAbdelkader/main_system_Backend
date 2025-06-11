
# Docker image name for the main backend service
IMAGE_NAME=main_system:latest

# Build the Docker image using the Dockerfile
build:
	docker build -t $(IMAGE_NAME) .

# Run the containers in detached mode
up:
	docker-compose up -d

# Stop and remove the containers
down:
	docker-compose down

# Clean up dangling images, containers, volumes, and networks
clean:
	docker system prune -f

# Rebuild and restart the services
restart:
	make down
	make build
	make up

# View logs of all containers
logs:
	docker-compose logs -f

# Stop, remove, and clean everything
reset:
	make down
	docker volume rm $$(docker volume ls -q --filter "dangling=false")
	make clean
