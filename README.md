# Smart Waste Management System

A full-stack **Smart Waste Management System** designed to make waste collection and recycling operations more efficient, organized, and transparent by connecting **citizens, waste workers, and administrators** on a single platform.

The system enables citizens to submit waste collection and recycling requests, allows workers to manage and complete assigned tasks, and provides administrators with tools to monitor requests and manage overall system operations.

---

## Features

### Citizen

* Secure user registration and login
* Submit waste collection and recycling requests
* Upload images/files with waste requests
* Provide relevant request information
* Track request status
* Rate and provide feedback on completed services
* Earn reward points for responsible waste management
* Receive role-based notifications

### Worker

* Secure worker authentication
* View available and assigned waste collection tasks
* Accept assigned tasks
* Update task/request status
* Mark completed tasks
* Receive ratings and feedback ⭐
* Worker leaderboard based on performance
* Receive task-related notifications 🔔

### Administrator

* Monitor waste collection and recycling requests
* Manage users and workers
* Assign and manage worker tasks
* Track request statuses 🔎 
* Monitor feedback and ratings ⭐
* Monitor worker performance and leaderboard
* Manage role-based system notifications 🔔
* Manage overall system operations

---

## Core Functionalities

* **JWT-Based Authentication** — Secure authentication using JSON Web Tokens
* **Role-Based Access Control** — Different permissions for Citizens, Workers, and Admins
* **Waste & Recycling Requests** — Citizens can easily report waste and request recycling services
* **Task Management** — Workers can accept, manage, and complete assigned tasks
* **File/Image Upload** — Supports request-related image and file uploads
* **OTP Verification** — Email-based OTP verification for enhanced account security
* **Reward Points** — Encourages citizens to participate in responsible waste management
* **Feedback & Rating System** — Improves service quality through user feedback
* **Worker Leaderboard** — Encourages worker efficiency and accountability
* **Role-Based Notifications** — Keeps users informed about relevant activities
* **Password Security** — Passwords are securely hashed using bcrypt

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │      Citizens       │
                    │                     │
                    │ • Submit Requests   │
                    │ • Track Requests    │
                    │ • Give Feedback     │
                    │ • Earn Rewards      │
                    └──────────┬──────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────┐
│                 Express.js Backend                   │
│                                                      │
│  • JWT Authentication      • Role-Based Access      │
│  • Request Management      • Task Management        │
│  • Notifications           • Reward System          │
│  • Feedback & Ratings      • File Upload            │
│  • OTP Verification        • Worker Leaderboard     │
└─────────────────────────┬────────────────────────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │      MySQL       │
                 │                  │
                 │ • Users          │
                 │ • Requests       │
                 │ • Tasks          │
                 │ • Rewards        │
                 │ • Feedback       │
                 │ • Notifications  │
                 └──────────────────┘
                          ▲
                          │
              ┌───────────┴───────────┐
              │                       │
              │                       │
       ┌──────┴──────┐         ┌─────┴──────┐
       │   Workers   │         │   Admins   │
       │             │         │            │
       │ • Tasks     │         │ • Monitor  │
       │ • Status    │         │ • Manage   │
       │ • Ratings   │         │ • Control  │
       └─────────────┘         └────────────┘
```

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcrypt
* Multer
* Nodemailer

### Technologies & Libraries

| Technology | Purpose                        |
| ---------- | ------------------------------ |
| HTML       | Application structure          |
| CSS        | User interface and styling     |
| JavaScript | Frontend functionality         |
| Node.js    | Backend runtime                |
| Express.js | REST API and server framework  |
| MySQL      | Database management            |
| JWT        | Authentication & authorization |
| bcrypt     | Password hashing               |
| Multer     | Image & file uploads           |
| Nodemailer | Email & OTP verification       |

---

## Project Structure

```text
smart-waste-management/
│
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

> **Note:** The folder structure may vary depending on the final project implementation.

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/sadianusratmunny51/Web_Project_330.git
```

### 2. Navigate to the Project

```bash
cd smart-waste-management
```

### 3. Install Dependencies

```bash
npm install
```

If the backend has a separate `package.json`:

```bash
cd backend
npm install
```

---

## Database Setup

Make sure **MySQL** is installed and running on your system.

Create a new database:

```sql
CREATE DATABASE smart_waste_management;
```

Then import the provided database schema:

```bash
mysql -u root -p smart_waste_management < database/schema.sql
```

Or import `schema.sql` using **MySQL Workbench**.

---

## Environment Variables

Create a `.env` file inside the backend directory and configure the required environment variables.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_waste_management

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
```

> ⚠️ Never commit your `.env` file or expose sensitive credentials in a public repository.

---

## Run the Application

Start the backend server:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend will typically run on:

```text
http://localhost:5000
```

Open the frontend in your browser or serve it through your preferred development server.

---

## Authentication & Authorization

The system uses **JWT (JSON Web Token)** for authentication.

Users are divided into three primary roles:

```text
Citizen
   │
   ├── Submit requests
   ├── Track requests
   ├── Give feedback
   └── Earn rewards

Worker
   │
   ├── View tasks
   ├── Accept tasks
   ├── Update status
   └── Complete tasks

Admin
   │
   ├── Manage users
   ├── Manage workers
   ├── Monitor requests
   └── Manage system operations
```

Role-based middleware ensures that users can only access the resources and operations permitted for their role.

---

## Request Workflow

```text
Citizen
   │
   │ Submit Waste/Recycling Request
   ▼
System
   │
   │ Request Created
   ▼
Admin
   │
   │ Assign Worker
   ▼
Worker
   │
   │ Accept Task
   ▼
Worker
   │
   │ Complete Task
   ▼
Citizen
   │
   │ Give Feedback & Rating
   ▼
Reward Points / Worker Performance
```

---

## Reward & Leaderboard System

The system includes a reward mechanism to encourage users and workers to actively participate in waste management.

### Citizen Rewards

Citizens can earn points for responsible waste-management activities.

### Worker Leaderboard

Workers are ranked based on factors such as:

* Completed tasks
* Task efficiency
* User ratings
* Overall performance

This encourages healthy competition and improves service quality.

---

## Email & OTP Verification

The application uses **Nodemailer** to provide email-based services such as:

* Account verification
* OTP verification
* Authentication-related emails
* System notifications

---

## File Upload

Using **Multer**, citizens can attach images or files when submitting waste-related requests.

Example use cases:

* Waste condition images
* Recycling material images
* Supporting documents
* Other request-related files

---

## Security

The system implements several security practices:

* JWT-based authentication
* Password hashing with bcrypt
* Role-based authorization
* Protected API routes
* OTP-based email verification
* Environment variables for sensitive configuration
* Secure file upload handling

---
