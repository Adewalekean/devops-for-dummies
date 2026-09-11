##Docker Flask Containerization

##Overview
This project demonstrates how to containerize a simple Flask web application using Docker.
The application is packaged with its Python dependencies into a Docker image and then run as a container with port mapping.

##Technologies Used
•Python
•Flask
•Docker
•Git & GitHub

##Project Structure
devops-for-dummies/
├── app.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── templates/
├── screenshots/
└── README.md

##Dockerfile
The Dockerfile uses a lightweight Python image and installs the dependencies from requirements.txt.

##Key Docker instructions used:

FROM - selects the Python base image
WORKDIR - sets the working directory inside the container
COPY - copies application files into the image
RUN - installs the required Python packages
EXPOSE - documents the Flask port
CMD - starts the Flask application

##Build the Docker Image
From the project directory:
docker build -t flask-devops-app .
Verify the image:
docker images

##Run the Container
The Flask application uses port 5000 inside the container.
I mapped it to port 8080 on my host machine:
docker run -d --name flask-devops-container -p 8080:5000 flask-devops-app
The application can then be accessed at:
http://localhost:8080
The port mapping means:
Host port 8080 → Container port 5000

##Container Management
Check running containers:
docker ps
View all containers:
docker ps -a
View application logs:
docker logs flask-devops-container
Stop the container:
docker stop flask-devops-container
Start the container again:
docker start flask-devops-container
Remove the container:
docker rm flask-devops-container

##Troubleshooting
Port 5000 Already in Use
When I first tried to run the Flask container using port 5000, Docker returned an error similar to:
bind: address already in use
The problem was that port 5000 was already being used by another Docker project running my WordPress application.
Instead of stopping the other application, I changed the host port to 8080 while keeping Flask's internal port at 5000.
I used:
docker run -d --name flask-devops-container -p 8080:5000 flask-devops-app
The Flask application was then successfully accessed through:
http://localhost:8080

##Docker Optimization
The Dockerfile was optimized by:
Using the lightweight python:3.12-slim base image.
Installing dependencies with --no-cache-dir.
Copying requirements.txt before the application files to take advantage of Docker layer caching.
Using .dockerignore to prevent unnecessary files from being copied into the image.

##Screenshot
The Flask application was successfully accessed through the mapped host port:

http://localhost:8080

A screenshot of the running application is included in the screenshots directory.

##Project Outcome
The Flask application was successfully containerized using Docker.
The project demonstrates:
Docker image creation
Container creation and management
Port mapping
Application logs
Container troubleshooting
Docker image optimization
GitHub project submission

