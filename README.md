# Product UI

## To Run the app locally:
- Install Node js 16.13.0
- npm start
- Browse to http://localhost:4200

## To run the app in a container:
### Everytime code gets checked in a docker image gets pushed to the docker hub
- Docker hub: https://hub.docker.com/r/gyaniscool/product-ui/tags
- Start the app: docker run -p -d 4200:80 gyaniscool/product-ui:[insert_latest_tag_from_docker_hub]
- For now the UI would only run if ui and backend server are on same servers
- Backend Repository: https://github.com/gyansatapathy/product-service
