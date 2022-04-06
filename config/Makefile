

help:
	@echo "build-dev                  build dev image (based on local code)"
	@echo "release-dev             build production image and push as dev tag to docker hub"

rm-container:
	@docker ps -a | grep frontend:dev |  awk '{ print $1 }'| xargs -I {} docker rm {}

rm-image:
	@docker rmi unicef/drips-frontend:dev --force

build:
	cd .. && docker build --no-cache \
			-t unicef/drips-frontend .
	docker tag unicef/drips-frontend:latest unicef/drips-frontend:dev

push:
	docker push unicef/drips-frontend:dev

build-dev:
	cd .. && docker build \
		-t unicef/drips-frontend -f ./Dockerfile-dev .
	docker tag unicef/drips-frontend:latest unicef/drips-frontend:dev

release-dev:
	$(MAKE) rm-container
	$(MAKE) build
	$(MAKE) push

