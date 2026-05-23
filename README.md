# 🛠️ Job Board Application - Backend

This is the **backend API** for the Job Board Application, built with **Node.js, Express.js, and MongoDB**.

---

## 🔧 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens), bcrypt

---

## 🔐 Authentication Features
- User registration and login
- JWT-based authentication
- Passwords are hashed with bcrypt
- Protected routes for job and application management

---

## 💼 Job Features
- Create, Read, Update, and Delete (CRUD) job listings
- Job model fields:
  - `title`
  - `description`
  - `company`
  - `location`
  - `salary`
  - `createdBy` (User ID)
- Only job creators can edit/delete their jobs

---

## 📝 Application Features
- Logged-in users can apply with a **cover letter**
- Job creators can view applications for their jobs
- Application model fields:
  - `jobId`
  - `applicantId`
  - `coverLetter`

---

## 🚀 Setup Instructions

### 1. Navigate to Backend
```bash
cd backend
