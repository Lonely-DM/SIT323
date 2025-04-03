SIT323 5.1P - Dockerised Calculator App (Bilingual)

This is a bilingual (English/Chinese) web calculator containerised using Docker and Docker Compose.

---

Project Structure:

- Dockerfile  
- docker-compose.yml  
- package.json  
- server.js  
- public/  
  - index.html  
  - style.css  

---

Steps to Run:

1. Clone the repository or place files in a folder.

2. (Optional) Run `npm install` to install dependencies locally.

3. Build the Docker image:
   docker compose build

4. Start the application:
   docker compose up

5. Open browser at:
   http://localhost:3000

6. To stop the app:
   Press Ctrl + C  
   Or run: docker compose down

---

Features:

- Basic operations: add, subtract, multiply, divide  
- Advanced: power, modulo, square root  
- English/Chinese interface toggle
