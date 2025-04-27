# 🔩 Authentication System (Django + DRF + JWT + Frontend)

An advanced **Authentication System** built with **Django**, **Django Rest Framework (DRF)**, **JWT Authentication**, and a **responsive frontend** powered by **HTML/CSS/JavaScript**.  
It offers full user management including registration, login, profile viewing, password change, and password reset functionalities.

---

## 🚀 Project Overview

This project is divided into two major parts:

- **Backend (API):**  
  Built using Django Rest Framework (DRF) and JWT authentication.  
  Handles all user authentication logic like register, login, fetch profile, change password, reset password.

- **Frontend (Web Pages):**  
  Responsive pages using HTML, CSS, and JavaScript.  
  Communicates with backend APIs to perform authentication tasks in real-time.

✅ **Frontend and backend are connected via HTTP requests (Fetch API)**.

---

## 🌐 How It Works

1. **User Registration:**
   - Frontend sends a `POST` request to `/api/user/register/` with user details.
   - Backend validates and creates a user.
   - Backend returns JWT access and refresh tokens.

2. **User Login:**
   - Frontend sends a `POST` request to `/api/user/login/` with email and password.
   - Backend authenticates the user.
   - On success, JWT tokens are stored in **localStorage**.

3. **Accessing Protected Profile Page:**
   - Frontend attaches the **access token** in the `Authorization` header (`Bearer <token>`) while requesting `/api/user/profile/`.
   - Backend verifies the token and returns user data.

4. **Change Password:**
   - Authenticated user sends new password data to `/api/user/change-password/` with the access token.

5. **Forgot Password:**
   - User submits their email to `/api/user/reset-password-email/`.
   - Backend sends a reset link to their email.

6. **Reset Password (via Link):**
   - User opens the reset link.
   - Frontend captures `uid` and `token` from the URL.
   - Sends new password to `/api/user/reset-password/<uid>/<token>/`.

7. **Logout:**
   - Frontend clears JWT tokens from **localStorage**.
   - User is redirected to login page.

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Backend       | Django, Django Rest Framework (DRF) |
| API Security  | Simple JWT (JSON Web Tokens)         |
| Frontend      | HTML5, CSS3, JavaScript (Fetch API)  |
| Database      | SQLite (Default Django DB)           |
| Email Service | Django Email Backend                 |

---

## 📆 Folder Structure

```
project/
│
├── account/
│   ├── models.py            # Custom User Model
│   ├── views.py             # API & Page Views
│   ├── serializers.py       # DRF Serializers
│   ├── urls.py              # URL routing
│   ├── utils.py             # Email Sending Utility
│   └── templates/account/
│       ├── base.html
│       ├── login.html
│       ├── register.html
│       ├── profile.html
│       ├── change_password.html
│       ├── reset_password.html
│       └── reset_password_email.html
│
├── static/
│   ├── css/
│   │   └── style.css        # Styling for all pages
│   └── js/
│       ├── main.js          # Navigation & Token Management
│       ├── login.js
│       ├── register.js
│       ├── profile.js
│       ├── change_password.js
│       ├── reset_password.js
│       └── reset_password_email.js
│
└── manage.py
```

---

## 🔥 Installation Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

5. **Run the development server**
   ```bash
   python manage.py runserver
   ```

6. **Open your browser**
   - Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## ⚡ Frontend-Backend Communication Flow (Visually)

```plaintext
+-----------------------+                            +-----------------------+
|      Frontend         |                            |       Backend          |
|  (HTML, CSS, JS)       |                            |  (Django + DRF + JWT)   |
+-----------------------+                            +-----------------------+
          |                                                        |
          |  User visits site and loads UI (Home/Login/Register)    |
          | ------------------------------------------------------> |
          |                                                        |
          |  User submits login/register form (fetch API call)      |
          | ---------------- POST /api/user/login/ --------------> |
          |                                                        |
          |  Backend validates, generates JWT tokens               |
          | <--------------- Returns Access + Refresh Tokens ----- |
          |                                                        |
          |  Frontend stores tokens in localStorage                |
          |                                                        |
          |  User visits protected page (Profile, Change Password) |
          | --------- GET /api/user/profile/ (with Token) --------> |
          |                                                        |
          |  Backend validates token, returns user data            |
          | <--------------- User Profile Data ------------------- |
          |                                                        |
          |  User initiates Forgot Password                        |
          | -------- POST /api/user/reset-password-email/ --------> |
          |                                                        |
          |  Backend sends reset link via email                    |
          |                                                        |
          |  User resets password using link (uid & token)          |
          | -------- POST /api/user/reset-password/<uid>/<token>/->|
          |                                                        |
          |  Password reset successful                             |
          | <--------------- Success Response ------------------- |
          |                                                        |
          |  User logs out (tokens removed from localStorage)       |
          |                                                        |
```

---

## 📜 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/user/register/` | POST | Register new user |
| `/api/user/login/` | POST | Login existing user |
| `/api/user/profile/` | GET | Get user profile (Authenticated) |
| `/api/user/change-password/` | POST | Change password (Authenticated) |
| `/api/user/reset-password-email/` | POST | Send password reset link |
| `/api/user/reset-password/<uid>/<token>/` | POST | Reset password using email link |

---

---

## 🌟 Future Scope

- Social Authentication (Google, Facebook)
- Admin Panel Enhancements
- 2FA (Two Factor Authentication)
- Password History Check
- Dockerization for Deployment
- Deployment to Cloud (AWS/GCP/Heroku)

---

## 🙇‍♂️ Author

- **Deepak Yadav** - [My GitHub Profile](https://github.com/Blackbeardpir8)

---

## 📃 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute.

---

# 🎉 Thank you for checking out the project!

