# 🏗️ Architecture - AI-Powered Mental Healthcare Chatbot

This document provides an overview of the architecture for the AI-powered mental health chatbot project, including all major systems and how they interact.

---

## 🧠 Project Summary

An AI-driven chatbot platform designed for mental healthcare support. It includes features like:
- GPT-based chat responses
- Sentiment analysis and crisis detection
- Speech-to-text and text-to-speech
- OAuth and JWT-based user authentication
- Dashboard with analytics and chat history
- Real-time chat with WebSockets
- Deployment with Docker and CI/CD using GitHub Actions

---

## 🧰 Tech Stack

| Layer         | Technologies                              |
|---------------|-------------------------------------------|
| Frontend      | React.js, Web Speech API, WebSockets      |
| Backend       | FastAPI, Python, OpenAI API, JWT, OAuth   |
| Database      | MongoDB                                   |
| DevOps        | Docker, Docker Compose, NGINX, GitHub Actions |
| Hosting       | Heroku / Render / AWS                     |

---

## 🖼️ High-Level Architecture Diagram

---

## 🔄 Workflow

1. **User Interaction:**
   - Users interact with the chatbot via the frontend (React.js).
   - Speech-to-text and text-to-speech features enhance accessibility.

2. **Backend Processing:**
   - The backend (FastAPI) processes user messages.
   - Messages are analyzed for sentiment and crisis detection.
   - GPT-based responses are generated using the OpenAI API.

3. **Database Operations:**
   - User data, chat history, and analytics are stored in MongoDB.

4. **Real-Time Communication:**
   - WebSockets enable real-time chat functionality.

5. **Deployment:**
   - The application is containerized using Docker.
   - CI/CD pipelines (GitHub Actions) automate testing and deployment.

---

## 🚀 Deployment

### **Local Development**
1. **Backend:**
   - Activate the virtual environment:
     ```bash
     .\venv\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the backend:
     ```bash
     uvicorn backend.app.main:app --reload
     ```

2. **Frontend:**
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

### **Production Deployment**
- Use Docker Compose to deploy the application:
  ```bash
  docker-compose up --build

