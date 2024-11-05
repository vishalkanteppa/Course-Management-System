# Course Management API

## Overview
This project is a Node.js application that provides a RESTful API for managing courses. The API allows users to create, read, update, and delete course data stored in JSON format. It uses Express.js as the server framework and is designed with simplicity and scalability in mind. Supports basic caching, logging and can be run inside a Docker container for easy deployment.

## Prerequisites
* [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
* [Docker](https://docs.docker.com/get-started/)

## Installation
1. Clone the repository:
```bash 
git clone https://github.com/vishalkanteppa/Course-Management-System.git
```

2. Navigate to project folder:
```bash 
cd Course-Management-System
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

## API Documentation

The Course Management System API provides endpoints to manage courses. Below is a list of available endpoints:

### Base URL
```bash
http://localhost:3000
```

The `/courses` endpoint supports all CRUD operations for managing courses in the system.

### Endpoints
1. Get all courses
    - Method: `GET` 
    - Description: Obtains a list of all courses
    - Response:
        - **200 OK**: Returns JSON array
        - **204 No Content**: If no courses exist in the system
2. Create a new course
    - Method: `POST`
    - Description: Adds a new course.
    - Request Body (JSON):
        ```bash
        {
            title: title,
            description: description,
            module_name: module_name,
            lesson_name: lesson_name,
            lesson_description: lesson_description,
            lesson_topics: lesson_topics,
            content_type: content_type,
            content_text: content_text
        }
        ```
    - Response:
        - **201 Created**: Course created successfully
        - **409 Conflict**: Course with the same title already exists
3. Update a course
    - Method: `PUT`
    - Description: Updates an existing course.
    - Request Body (JSON): Same as `POST`
    - Response:
        - **200 OK**: Course updated successfully
        - **404 Not Found**: Course title to be updated does not exist
4. Delete a course
    - Method: `DELETE`
    - Description: Deletes a course.
    - Request Body (JSON): 
    ```bash
        { 
            coursetitle: course_title 
        }
    ```
    - Response:
        - **200 OK**: Course deleted successfully
        - **404 Not Found**: Course title to be deleted does not exist