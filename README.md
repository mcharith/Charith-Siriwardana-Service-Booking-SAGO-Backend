# 🛠️ Service Booking & Management Platform – Backend API

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0%2B-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT Authentication](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

> A robust RESTful backend service connecting customers with service providers. Features role-based access control (RBAC), service discovery, availability schedules, booking state management, file uploads, and complete user administration.

---

## 📌 Features & User Roles

| Role | Key Capabilities |
| :--- | :--- |
| 🧑‍💼 **Customer** | • Register & Authenticate<br>• Browse & search services (by category or keyword)<br>• View real-time provider availability<br>• Request, track, and cancel bookings |
| 🛠️ **Service Provider** | • Manage service listings (CRUD)<br>• Configure weekly availability slots<br>• Process incoming booking requests (Confirm / Reject)<br>• Mark active bookings as completed |
| 👑 **Admin** | • Comprehensive user management<br>• Inspect user profiles & activity<br>• Toggle user active/inactive account status |

---

## 🛠️ Technology Stack

* **Core Engine:** Node.js, Express.js, TypeScript
* **Database & ODM:** MongoDB, Mongoose
* **Auth & Security:** JSON Web Tokens (JWT), bcryptjs
* **File Processing:** Multer (Profile Image Uploads)
* **Environment Configuration:** dotenv
* **Dev Tooling:** `ts-node-dev`, Postman

---

## 📋 Prerequisites

Ensure your environment meets the following requirements before setup:

| Tool | Minimum Version | Verification Command |
| :--- | :--- | :--- |
| **Node.js** | `v18.0.0+` | `node -v` |
| **npm** | `v9.0.0+` | `npm -v` |
| **MongoDB** | `v7.0.0+` | `mongosh` |
| **Git** | Any recent version | `git --version` |

---

## 🚀 Quick Start Guide

### 1. Repository Setup
```bash
# Clone the repository
git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)

# Enter backend directory
cd backend

# Install project dependencies
npm install