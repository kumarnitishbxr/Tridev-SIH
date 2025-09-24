# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



rbac-system/
│── backend/                      # Server-side code (API + Auth + DB)
│   ├── src/
│   │   ├── config/               # Configurations
│   │   │   ├── db.js             # Database connection
│   │   │   └── roles.js          # Role definitions + hierarchy
│   │   ├── models/               # Database models
│   │   │   ├── User.js
│   │   │   └── Role.js
│   │   ├── middleware/           # Middlewares
│   │   │   ├── authMiddleware.js # JWT/Auth check
│   │   │   └── roleMiddleware.js # Role-based access check
│   │   ├── controllers/          # Business logic
│   │   │   ├── authController.js
│   │   │   └── userController.js
│   │   ├── routes/               # API endpoints
│   │   │   ├── authRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/                # Utility functions
│   │   │   └── logger.js
│   │   └── server.js             # Express app entry
│   └── package.json
│
│── frontend/                     # Client-side (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MDPage.jsx
│   │   │   ├── DirectorPage.jsx
│   │   │   ├── EMPage.jsx
│   │   │   ├── GMPage.jsx
│   │   │   ├── ManagerPage.jsx
│   │   │   └── WorkerPage.jsx
│   │   ├── services/
│   │   │   ├── api.js            # Axios/Fetch setup
│   │   │   └── auth.js           # Login/Logout helpers
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   └── App.jsx
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── README.md

