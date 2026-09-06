# Web_Project_330 Lab Final Task- Add User Activity Logging Feature


## 🎯 Task Overview: User Activity Logging Feature

The User Activity Logging system is designed to track and record all user activities within the Smart Waste Management platform. This feature provides transparency and accountability by maintaining detailed logs of:

### Key Activities Logged:
- **Login Events**: Records when a user successfully logs into the system
- **Logout Events**: Tracks when a user exits the application
- **Create Operations**: Logs when users create new content or submit requests (e.g., waste collection requests, recycling requests)

### Purpose:
- Maintain an audit trail of user actions
- Support administrative monitoring and analysis
- Enable troubleshooting and security investigations
- Provide insights into platform usage patterns

---

## 🏗️ Backend Implementation

### Architecture Overview

The backend is built using **Node.js with Express.js** and follows a structured MVC pattern with the following components:

#### Technology Stack:
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MySQL 2
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **Additional**: CORS, dotenv for environment configuration

### Key Backend Components

#### 1. **Database Schema** 

**Columns:**
- `id`: Unique identifier for each activity log entry
- `user_id`: Foreign key reference to the users table
- `timestamp`: Automatic timestamp of when the activity occurred
- `activity_type`: Type of activity (e.g., "login", "logout", "create")
- `description`: Detailed description of the activity


**Key Features:**
- Validates user credentials against stored password hash
- Generates JWT token for authenticated sessions
- **Automatically logs login activity** to the `activity_log` table
- Returns user information along with authentication token


---

### Branch Strategy

The task uses three main branches:

1. **`backend` branch**: Contains all backend server code and database setup
2. **`frontend` branch**: Contains all React frontend and UI components
3. **`exam` branch** (current): Merged version containing both backend and frontend

