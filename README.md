
# To-Do Application GUI

## Overview
This is the front-end application for the To-Do application, built using Angular. It provides a user interface for managing tasks, including creating, updating, and deleting tasks.

## Features
- Responsive design with Bootstrap and Angular Material integration
- Task management interface (Create, Update, Delete)
- Docker setup for deployment

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd todo-gui
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application Locally**
   ```bash
   ng serve
   ```

4. **Docker Deployment**
   Use the `Dockerfile` to containerize the GUI and deploy on any Docker-supported platform.
   ```bash
   docker build -t todo-gui .
   docker run -p 80:80 todo-gui
   ```

## Configuration
- **Environment Settings:** Modify settings in `src/environments/` for different environments.

## Additional Information
This project uses `nginx.conf` to serve the production build and manage API proxying.
