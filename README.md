# 📦 Category Management Admin Panel

A Node.js and EJS-based admin panel to manage product categories, subcategories, and extra categories with image upload, authentication, and full CRUD operations.

---

## 🚀 Features

- Admin authentication (Login/Register/Logout)
- Add, view, and delete:
  - 📁 Categories
  - 📂 Subcategories
  - 🗂️ Extra Categories
- Image upload using `multer`
- Flash messages for actions (add/delete/login/logout)
- Dashboard overview
- Organized EJS views

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS templating engine
- Bootstrap 5
- Multer (image uploads)
- Passport.js (authentication)
- Flash messages

---

## 📸 Screenshots

### 🔐 Login Page
![Login Screenshot](https://github.com/user-attachments/assets/ae08484d-0cb8-4310-aa78-436dc9da9880)

### 🧾 Dashboard
![Dashboard Screenshot](https://github.com/user-attachments/assets/1df2b55e-f6a4-44f0-9d86-aad8343f8c2d)

### ➕ Add Category Form
![Add Category Screenshot](https://github.com/user-attachments/assets/f0fdab34-a0fb-4aff-b998-de33f9ff5b46)

### 📋 View All Data
![View All Screenshot](https://github.com/user-attachments/assets/27ed76b6-a67f-41c8-a229-fe6131cd480a)

### Client Home Page
![image](https://github.com/user-attachments/assets/741dac90-3241-40e1-ba6b-3cb472babf77)

### Single Product Page
![image](https://github.com/user-attachments/assets/308b5de8-d552-4a3d-b7fd-b204443422c4)


---

## 🌐 Live Demo

🔗 [View Live Project](https://pr-8-product-e-commerce.onrender.com)

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install
```

## Configuration

- Create a .env file in the root with your MongoDB connection:

```bash
MONGO_URI=mongodb://localhost:27017/your-database-name
SESSION_SECRET=your-session-secret
```

## 🧪 Folder Structure

```bash
├── model/
│   ├── adminAuthModel.js
│   ├── catagoryModel.js
│   ├── subcatagoryModel.js
│   └── extracatagoryModel.js
├── middleware/
│   └── passport-local.js
├── routes/
│   └── adminRoutes.js
├── views/
│   ├── pages/
│   │   ├── AdminHome.ejs
│   │   ├── form.ejs
│   │   ├── viewAllData.ejs
│   │   ├── loginForm.ejs
│   │   └── registerForm.ejs
│   └── partials/
├── public/
│   └── (static assets, CSS, uploads)
├── app.js / server.js
```

## ✍️ Author

- **Name**: Jainam Pokal
- **GitHub**: [!Github](https://github.com/pokaljainam24)
