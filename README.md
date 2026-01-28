# Prysm Labs – Mini CRM Backend API

Backend Developer Intern Assignment

A production-ready backend system built using **Node.js, Express, PostgreSQL, Prisma, JWT Authentication, Swagger, Zod validation, and bcrypt**.

This project implements a **Mini CRM System** with:

* Authentication (JWT)
* Role-based Authorization (ADMIN / EMPLOYEE)
* Users Management
* Customers Management
* Tasks Management
* Swagger API Documentation

---

## 🚀 Tech Stack

* Node.js (Express)
* PostgreSQL
* Prisma ORM
* JWT Authentication
* bcrypt (password hashing)
* Zod (validation)
* Swagger (API documentation)

---

## 📦 Project Modules

### ✅ Authentication Module

* User Registration
* User Login
* JWT-based authentication
* Role-based authorization

### ✅ Users Module (Admin Only)

* View all users
* View user by ID
* Update user role

### ✅ Customers Module

* Create customer (ADMIN)
* View customers (ADMIN + EMPLOYEE)
* Update customer (ADMIN)
* Delete customer (ADMIN)
* Pagination support

### ✅ Tasks Module

* Create tasks (ADMIN)
* View tasks (ADMIN = all, EMPLOYEE = only assigned)
* Update task status

---

# 📁 Project Structure

```
prysm-node-backend/
│
├── Controller/
├── router/
├── middleware/
├── prisma/
├── validation/
├── docs/
├── app.js
├── package.json
└── .env
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/chauhanmuskan291980-wq/Prysm_labs_backend_assignments.git
cd Prysm_labs_backend_assignments/prysm-node-backend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Environment Variables

Create `.env` file:

```env
PORT=5002
DATABASE_URL=postgresql://username:password@localhost:5432/prysm_labs
JWT_SECRET=your_super_secret_key
```

---

## 4️⃣ Prisma Setup

```bash
npx prisma generate
npx prisma migrate deploy
```

---

## 5️⃣ Start Server

```bash
npm start
```

Server will run on:

```
http://localhost:5002
```

---

# 📄 Swagger API Documentation

Swagger UI:

```
http://localhost:5002/api-docs
```

JWT Token Support:

* Click **Authorize**
* Enter:

```
Bearer <your_token>
```

---

# 🔐 Authentication APIs

## POST /auth/register

```json
{
  "name": "Muskan",
  "email": "muskan@test.com",
  "password": "password123",
  "role": "ADMIN"
}
```

Response:

```json
{
  "id": 1,
  "name": "Muskan",
  "email": "muskan@test.com",
  "role": "ADMIN"
}
```

---

## POST /auth/login

```json
{
  "email": "muskan@test.com",
  "password": "password123"
}
```

Response:

```json
{
  "accessToken": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Muskan",
    "email": "muskan@test.com",
    "role": "ADMIN"
  }
}
```

---

# 👤 Users APIs (ADMIN Only)

## GET /users

Response:

```json
[
  {
    "id": 1,
    "name": "Muskan",
    "email": "muskan@test.com",
    "role": "ADMIN"
  }
]
```

---

## GET /users/:id

---

## PATCH /users/:id

```json
{
  "role": "EMPLOYEE"
}
```

---

# 🧾 Customers APIs

## POST /customers (ADMIN)

```json
{
  "name": "HealthPlus",
  "email": "contact@healthplus.com",
  "phone": "9999999999",
  "company": "HealthPlus Pvt Ltd"
}
```

---

## GET /customers?page=1&limit=10

Response:

```json
{
  "page": 1,
  "limit": 10,
  "totalRecords": 20,
  "totalPages": 2,
  "data": []
}
```

---

# 📋 Tasks APIs

## POST /tasks (ADMIN)

```json
{
  "title": "Support setup",
  "description": "Setup support system",
  "assignedTo": 3,
  "customerId": 2,
  "status": "PENDING"
}
```

---

## GET /tasks

ADMIN → all tasks
EMPLOYEE → only assigned tasks

---

## PATCH /tasks/:id/status

```json
{
  "status": "IN_PROGRESS"
}
```

---

# 🔒 Security

All protected routes require JWT token:

Header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📬 Deployment

* Deployed on VPS (Ubuntu)
* PostgreSQL running locally
* API served on custom port

---

# 📌 Bonus Features Implemented

✅ Pagination
✅ Role-based access
✅ JWT auth
✅ Swagger docs
✅ Validation

---

# 🧪 Testing

All APIs tested using:

* Swagger UI
* Postman

---

# 📎 Submission Info

Repository:

```
https://github.com/chauhanmuskan291980-wq/Prysm_labs_backend_assignments
```

Swagger:

```
http://31.97.230.36:5002/api-docs/
```

---

# 👩‍💻 Developer

**Muskan Chauhan**
Backend Developer Intern Candidate

---

# ✅ Status

✔ Assignment Completed
✔ Deployed on VPS
✔ API Documented
✔ Production Ready

---
## 🚀 Deployment

This backend application is **already deployed on a VPS server**.

**Live Server IP:**  
http://31.97.230.36:5002

**Swagger API Docs:**  
http://31.97.230.36:5002/api-docs

### Deployment Stack
- VPS (Ubuntu Server)
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- PM2 (Process Manager)
- Swagger API Documentation

The application is running in production mode and fully accessible via the VPS IP address.
