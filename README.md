# Docker Flask Containerization

## Overview

This project demonstrates how to containerize a simple Flask web application using Docker. The application is packaged with its Python dependencies into a Docker image and then run as a container with port mapping.

## Technologies Used

- Python
- Flask
- Docker
- Git & GitHub

## Project Structure

```
devops-for-dummies/
├── app.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── templates/
├── screenshots/
└── README.md
```

## Dockerfile Overview

The Dockerfile uses a lightweight Python image and installs the dependencies from requirements.txt.

### Key Docker Instructions Used

- **FROM** - Selects the Python base image
- **WORKDIR** - Sets the working directory inside the container
- **COPY** - Copies application files into the image
- **RUN** - Installs the required Python packages
- **EXPOSE** - Documents the Flask port
- **CMD** - Starts the Flask application

## Docker Optimization

The Dockerfile was optimized by:

- Using the lightweight `python:3.12-slim` base image
- Installing dependencies with `--no-cache-dir`
- Copying `requirements.txt` before the application files to take advantage of Docker layer caching
- Using `.dockerignore` to prevent unnecessary files from being copied into the image

## Build the Docker Image

From the project directory:

```bash
docker build -t flask-devops-app .
```

Verify the image:

```bash
docker images
```

## Run the Container

The Flask application uses port 5000 inside the container. I mapped it to port 8080 on my host machine:

```bash
docker run -d --name flask-devops-container -p 8080:5000 flask-devops-app
```

The application can then be accessed at: `http://localhost:8080`

**Port mapping explanation:**
- Host port 8080 → Container port 5000

## Container Management

**Check running containers:**
```bash
docker ps
```

**View all containers:**
```bash
docker ps -a
```

**View application logs:**
```bash
docker logs flask-devops-container
```

**Stop the container:**
```bash
docker stop flask-devops-container
```

**Start the container again:**
```bash
docker start flask-devops-container
```

**Remove the container:**
```bash
docker rm flask-devops-container
```

## Troubleshooting

### Port 5000 Already in Use

When I first tried to run the Flask container using port 5000, Docker returned an error:

```
bind: address already in use
```

**Problem:** Port 5000 was already being used by another Docker project running my WordPress application.

**Solution:** Instead of stopping the other application, I changed the host port to 8080 while keeping Flask's internal port at 5000:

```bash
docker run -d --name flask-devops-container -p 8080:5000 flask-devops-app
```

The Flask application was then successfully accessed through: `http://localhost:8080`

## Screenshot

The Flask application was successfully accessed through the mapped host port at `http://localhost:8080`. A screenshot of the running application is included in the `screenshots/` directory.

## Project Outcome

The Flask application was successfully containerized using Docker. This project demonstrates:

- Docker image creation
- Container creation and management
- Port mapping
- Application logs
- Container troubleshooting
- Docker image optimization
- GitHub project submission
