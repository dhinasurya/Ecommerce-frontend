# 🛍️ E-Commerce Frontend (React + Axios)

A clean and simple React frontend built for the E-Commerce backend API.  
Part of my full-stack learning project.

## 🚀 Features
- Product listing
- Add to cart
- Remove items / reduce quantity
- Cart expiry handling
- Checkout
- Orders page
- Axios services
- React Router navigation

## 📦 Tech Stack
- React (Vite)
- React Router
- Axios
- Modern Hooks-based React

## ▶ Run Locally

Install dependencies:
```bash
npm install
```

Start dev server:
```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## 📂 Folder Structure
```
src/
├── components/
├── pages/
├── services/
├── App.jsx
└── main.jsx
```

## 🧩 API Layer
All backend calls are inside:
```
src/services/api.js
```

## 📝 Notes
This frontend is intentionally simple so I can extend it later with:
- Authentication (JWT)
- Protected routes
- Global state (context)
- Better UI with Tailwind / Material UI
