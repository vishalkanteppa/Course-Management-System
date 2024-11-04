# Course Management API

## Overview
This project is a Node.js application that provides a RESTful API for managing courses. The API allows users to create, read, update, and delete course data stored in JSON format. It uses Express.js as the server framework and is designed with simplicity and scalability in mind. Supports basic caching, logging and can be run inside a Docker container for easy deployment.

## Prerequisites
* [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
* [Docker](https://docs.docker.com/get-started/)

## Installation
1. Clone the repository:
```bash 
git clone https://github.com/vishalkanteppa/
```

2. Navigate to project folder:
```bash 
cd 
```

3. Install Dependencies
```bash
npm install
```

## Running the Application
### Locally

1. Start the application using:
```bash 
npm start
```

2. Running tests:

    Ensure the server is stopped before running tests to avoid conflicts.

```bash
npm test
```

### With Docker
1. Build the docker image:
```bash
docker build -t course-api-image .
```

2. Run the docker container. Ensure that the app is not running locally
```bash 
docker run -d -p 3000:3000 --name course-api-container course-api-image
```

3. Run tests with the container:
```bash 
docker exec -it course-api-container npm test
```
    
- Ensure above container is running. If it is not, run the below command: 
```bash
    docker start course-api-container
```


