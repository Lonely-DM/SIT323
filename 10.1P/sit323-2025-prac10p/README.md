
# SIT323 9.1P – MongoDB-Integrated Calculator App (Kubernetes)

This is an enhanced version of the bilingual (English/Chinese) web calculator, now extended to support persistent data storage using MongoDB. The application is deployed on a local Kubernetes cluster and supports arithmetic operations through RESTful endpoints, while saving each operation into a MongoDB database.

## Project Structure

- Dockerfile
- docker-compose.yml (for local testing)
- deployment.yaml (Node.js app)
- service.yaml (NodePort service)
- mongo-deployment.yaml
- mongo-service.yaml
- mongo-secret.yaml
- mongo-pv.yaml
- mongo-pvc.yaml
- server.js
- public/
  - index.html
  - style.css
- README.md
- screenshots/
  - pods-running.png
  - history-endpoint.png

## Steps to Run

### Docker (Local Testing)
1. Clone this repository.
2. Install dependencies (optional):
   ```bash
   npm install
   ```
3. Build the container:
   ```bash
   docker compose build
   ```
4. Start the container:
   ```bash
   docker compose up
   ```
5. Visit in browser:
   [http://localhost:3000](http://localhost:3000)

### Kubernetes (Production-Style Deployment)
Ensure Docker Desktop with Kubernetes is enabled.

1. Apply MongoDB configuration:
   ```bash
   kubectl apply -f mongo-secret.yaml
   kubectl apply -f mongo-pv.yaml
   kubectl apply -f mongo-pvc.yaml
   kubectl apply -f mongo-deployment.yaml
   kubectl apply -f mongo-service.yaml
   ```

2. Apply calculator deployment:
   ```bash
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

3. Port forward and access the app:
   ```bash
   kubectl port-forward service/calculator-service 3000:80
   ```

4. Open [http://localhost:3000](http://localhost:3000) in browser

## Features

- Basic operations: addition, subtraction, multiplication, division
- Advanced operations: exponentiation, modulo, square root
- Bilingual UI toggle: English / 中文
- MongoDB database integration (via Mongoose)
- Stores all operation records in `calculator-db.calculations`
- `/history` API endpoint to return latest records
- Kubernetes deployed backend and database
- Persistent volume and Kubernetes secrets used