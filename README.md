Service Booking and Management Platform – Backend

A backend REST API for a Service Booking and Management Platform. The system connects customers with service providers and allows customers to discover services, request bookings, and manage their appointments.

Service providers can manage their services, availability, and booking requests, while administrators can manage users.

⸻

📌 Project Overview

The Service Booking and Management Platform supports three main user roles:

* Customer
    * Register and login
    * Browse available services
    * Search services by category or keyword
    * View provider availability
    * Request service bookings
    * View and cancel bookings
* Service Provider
    * Register and login
    * Create and manage services
    * Manage availability
    * View customer booking requests
    * Confirm or reject bookings
    * Mark confirmed bookings as completed
* Admin
    * Manage users
    * View user details
    * Update user information
    * Activate or deactivate users

⸻

🛠 Technologies Used

Backend

* Node.js
* Express.js
* TypeScript

Database

* MongoDB
* Mongoose

Authentication & Security

* JSON Web Token (JWT)
* bcryptjs

File Upload

* Multer

Environment Configuration

* dotenv

Development Tools

* ts-node-dev
* npm
* Postman

⸻

📋 Prerequisites

Before running the project, make sure the following are installed:

1. Node.js

Node.js version 18 or higher is recommended.

Check your installed version:

node -v

2. npm

Check npm:

npm -v

3. MongoDB

MongoDB must be installed and running locally.

Check MongoDB:

mongosh

The application uses the following local MongoDB database:

sago_service_booking

4. Git

Git is required to clone the repository.

Check Git:

git --version

⸻

📥 Installation

1. Clone the Repository

git clone <YOUR_REPOSITORY_URL>

Navigate to the backend directory:

cd backend

⸻

2. Install Dependencies

Run:

npm install

This will install all required dependencies from package.json.

⸻

🔐 Environment Variable Configuration

Create a .env file in the root of the backend project:

backend/
├── src/
├── uploads/
├── .env
├── package.json
└── tsconfig.json

Add the following configuration:

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/sago_service_booking
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

Environment Variables

Variable	Description	Example
PORT	Port used by the backend server	3000
MONGO_URI	MongoDB connection URL	mongodb://127.0.0.1:27017/sago_service_booking
JWT_SECRET	Secret key used to sign JWT tokens	your_super_secret_jwt_key
JWT_EXPIRES_IN	JWT token expiration time	7d

Important: Do not commit the .env file to Git. It is already included in .gitignore.

⸻

🗄 Database Setup

The project uses MongoDB with Mongoose.

Local MongoDB

Make sure MongoDB is running before starting the backend.

For macOS with Homebrew:

brew services start mongodb-community@7.0

Check the MongoDB service:

brew services list | grep mongodb

You can also test the MongoDB connection:

mongosh

The application will automatically connect to:

mongodb://127.0.0.1:27017/sago_service_booking

Database Creation

You do not need to manually create the database.

MongoDB will create the sago_service_booking database automatically when the application first writes data.

The required collections are also created automatically through Mongoose models.

Main collections:

users
services
availabilities
bookings

⸻

▶️ Running the Backend

Development Mode

Run:

npm run dev

The server will start on:

http://localhost:3000

You should see messages similar to:

MongoDB connected successfully
Server running on http://localhost:3000

⸻

🏗 Build the Project

To compile the TypeScript project:

npm run build

The compiled JavaScript files will be generated in the dist directory.

⸻

🚀 Production Mode

After building the project, run:

npm start

Make sure the start script in package.json points to the compiled server.

Example:

{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}

⸻

❤️ Health Check

After starting the server, open:

GET http://localhost:3000/

Expected response:

{
  "success": true,
  "message": "SAGO Service Booking API is running"
}

⸻

🔑 Authentication

The API uses JWT Bearer Authentication.

After successful login, the API returns a JWT token.

For protected endpoints, add the token to the request:

Authorization: Bearer <YOUR_JWT_TOKEN>

In Postman:

1. Open the request.
2. Go to Authorization.
3. Select Bearer Token.
4. Enter the JWT token.

⸻

📡 Main API Endpoints

Base URL:

http://localhost:3000/api

Authentication

Method	Endpoint	Description
POST	/auth/register	Register a new customer
POST	/auth/login	Login
POST	/auth/logout	Logout
GET	/auth/me	Get current user
PUT	/auth/profile	Update own profile
PUT	/auth/change-password	Change password
PUT	/auth/profile-image	Upload profile image

⸻

User Management – Admin

Method	Endpoint	Description
GET	/users	Get all users
GET	/users/:id	Get user by ID
PUT	/users/:id	Update user
PUT	/users/:id/status	Activate/deactivate user

These endpoints require an ADMIN account.

⸻

Service Management

Method	Endpoint	Description
GET	/services	Get all services
GET	/services/:id	Get service by ID
POST	/services	Create a service
PUT	/services/:id	Update a service
DELETE	/services/:id	Deactivate a service

Service creation and management require a PROVIDER account.

Search Services

Search by category:

GET /api/services?category=tutoring

Search by keyword:

GET /api/services?search=math

⸻

Availability Management

Method	Endpoint	Description
GET	/availability/:providerId	Get provider availability
POST	/availability	Create availability
PUT	/availability/:id	Update availability
DELETE	/availability/:id	Delete availability

Creating, updating, and deleting availability require a PROVIDER account.

Example availability:

{
  "day": "MONDAY",
  "startTime": "09:00",
  "endTime": "17:00",
  "isAvailable": true
}

⸻

Booking Management

Method	Endpoint	Description
POST	/bookings	Create a booking
GET	/bookings/my-bookings	Get customer’s bookings
GET	/bookings/provider	Get provider’s bookings
PUT	/bookings/:id/confirm	Confirm booking
PUT	/bookings/:id/reject	Reject booking
PUT	/bookings/:id/cancel	Cancel booking
PUT	/bookings/:id/complete	Complete booking

Booking Status

Bookings can have the following statuses:

PENDING
CONFIRMED
REJECTED
CANCELLED
COMPLETED

⸻

📁 Project Structure

backend/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── service.controller.ts
│   │   ├── availability.controller.ts
│   │   └── booking.controller.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Service.ts
│   │   ├── Availability.ts
│   │   └── Booking.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── service.routes.ts
│   │   ├── availability.routes.ts
│   │   └── booking.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── upload.middleware.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── service.service.ts
│   │   ├── availability.service.ts
│   │   └── booking.service.ts
│   │
│   ├── utils/
│   │   └── jwt.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── uploads/
│   └── profiles/
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

⸻

🖼️ Profile Image Upload

Users can upload profile images through:

PUT /api/auth/profile-image

Supported image formats:

JPEG
PNG
WebP

Maximum file size:

5 MB

Uploaded profile images are stored in:

uploads/profiles/

The uploads directory is excluded from Git.

⸻

🧪 Testing with Postman

You can use Postman to test all API endpoints.

Recommended testing flow:

1. Register/Login a Provider

Get the provider JWT token.

2. Create a Service

POST /api/services

3. Create Provider Availability

POST /api/availability

4. Register/Login a Customer

Get the customer JWT token.

5. Create a Booking

POST /api/bookings

6. Provider Views Bookings

GET /api/bookings/provider

7. Provider Confirms or Rejects Booking

PUT /api/bookings/:id/confirm

or:

PUT /api/bookings/:id/reject

8. Customer Views Bookings

GET /api/bookings/my-bookings

⸻

🔒 Security Notes

* Passwords are hashed using bcryptjs.
* Authentication uses JWT.
* Protected endpoints require a valid JWT.
* Role-based authorization is implemented for Customer, Provider, and Admin operations.
* .env is excluded from Git.
* Uploaded files are excluded from Git.
* Password fields are excluded from user responses.

⸻

⚠️ Important Configuration

Before pushing the project to a public repository, make sure you do not commit:

.env
node_modules/
dist/
uploads/

These are already included in .gitignore.

For production, use a strong and unique JWT_SECRET instead of the development example.

⸻

👨‍💻 Developer

Charith Mihiranga Siriwardana

Software Engineering Project – Service Booking and Management Platform

⸻

### One important thing before you commit this
Your README says `npm run dev`, `npm run build`, and `npm start`, so make sure your `package.json` has these scripts:
```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

Also, replace:

git clone <YOUR_REPOSITORY_URL>

with your actual GitHub repository URL before submitting.

For the assessment, this README is enough to let another developer clone → install → configure MongoDB → create .env → run the backend → test the APIs with Postman.
