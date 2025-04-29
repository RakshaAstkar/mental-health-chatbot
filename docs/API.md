# 📘 API Documentation - AI Mental Healthcare Chatbot

Base URL: `http://localhost:8000`

---

## 📍 Auth Endpoints

### `POST /api/auth/register`
Registers a new user.

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
- **201 Created**: User successfully registered.
- **400 Bad Request**: Validation error or user already exists.

---

### `POST /api/auth/login`
Logs in an existing user and returns a JWT token.

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
- **200 OK**: Returns an access token.
  ```json
  {
    "access_token": "your_jwt_token",
    "token_type": "bearer"
  }
  ```
- **401 Unauthorized**: Invalid username or password.

---

## 📍 Chat Endpoints

### `POST /api/chat`
Sends a message to the chatbot and receives a response.

**Request Body:**
```json
{
  "message": "Hello, I need help."
}
```

**Response:**
- **200 OK**: Returns the chatbot's response.
  ```json
  {
    "reply": "How can I assist you today?"
  }
  ```

---

## 📍 Crisis Detection

### `POST /api/chat`
Detects crisis-related messages and sends an alert if necessary.

**Request Body:**
```json
{
  "message": "I feel like ending it all."
}
```

**Response:**
- **200 OK**: Returns a crisis response if a crisis is detected.
  ```json
  {
    "reply": "We have detected a potential crisis. Please reach out to someone you trust or call a crisis hotline for immediate help."
  }
  ```
- **200 OK**: Returns a normal chatbot response if no crisis is detected.
  ```json
  {
    "reply": "How can I assist you today?"
  }
  ```

---

## 📍 WebSocket Endpoints

### `GET /ws/chat`
Establishes a WebSocket connection for real-time chat.

**Usage:**
- Send a message through the WebSocket.
- Receive a real-time response from the chatbot.

---

## 📍 Error Responses

- **400 Bad Request**: Invalid input or missing fields.
- **401 Unauthorized**: Authentication failed or token is invalid.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## 📍 Notes
- Ensure you include the `Authorization` header with the Bearer token for protected endpoints:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- Replace `localhost` with your server's IP or domain in production.
