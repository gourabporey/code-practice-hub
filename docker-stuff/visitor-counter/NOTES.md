## Docker Compose 

### Services
- Are basically containers

### Restart policies
- When to restart the container if stopped
  - `no` - Default 
  - `on-failure` - restart if exit code other than 0
  - `always` - restart container for any exit code
  - `unless-stopped` - similar to always except it doesn't start autmatically when the docker daemon starts, until we start it manually

### Important commands
- To get the containers up
  `docker-compose up`
- To build and get the containers up 
  `docker-compose up --build`
- To get the containers down
  `docker-compose down`