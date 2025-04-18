# 📘 API Documentation - AI Mental Healthcare Chatbot

Base URL: `http://localhost:8000/api`

---

## 📍 Auth

### `POST /api/auth/register`
Registers a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
