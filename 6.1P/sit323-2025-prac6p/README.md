# SIT323 6.1P – Kubernetes-Deployed Calculator App (Bilingual)

This is a bilingual (English/Chinese) web calculator deployed on a local Kubernetes cluster. The app was containerised using Docker and supports arithmetic operations via RESTful endpoints.

---

## Project Structure

- Dockerfile  
- docker-compose.yml  
- deployment.yaml  
- service.yaml  
- package.json  
- server.js  
- .dockerignore  
- public/  
  - index.html  
  - style.css  
- README.md

---

## Steps to Run

### Docker (for local development)

1. Clone the repo or place files in a folder.
2. (Optional) Run `npm install` to install dependencies locally.
3. Build the image:
   ```bash
   docker compose build
   ```
4. Start the container:
   ```bash
   docker compose up
   ```
5. Open in browser:
   ```
   http://localhost:3000
   ```

---

### Kubernetes (for production-style deployment)

1. Ensure Kubernetes is enabled in Docker Desktop.
2. Apply configuration:
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```
3. Access the application:
   ```
   http://localhost:30036
   ```

4. If image is rebuilt:
   ```bash
   kubectl rollout restart deployment calculator-deployment
   ```

---

## Features

- Basic operations: addition, subtraction, multiplication, division  
- Advanced operations: exponentiation, modulo, square root  
- REST API for programmatic access  
- Toggle between English and Chinese interface  
- Dockerised for local use, Kubernetes-deployed for scalability  
- Lightweight and stateless architecture via Node.js + Express
