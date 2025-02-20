# E-Commerce Web Application

This is a full-stack e-commerce web application built using React, Redux Toolkit, Tailwind CSS for the frontend, and Node.js, Express, and MongoDB for the backend. The application includes features like user authentication, product listings, a shopping cart, and profile management.

## Features
- User authentication (Login, Logout, Profile Management)
- Admin dashboard for managing products and orders
- Shopping cart functionality
- Address management for user profiles
- Search functionality for products
- Responsive UI using Tailwind CSS
- Persisted user sessions using localStorage
- Secure backend API using Node.js and Express
- MongoDB database for storing user, product, and order data

## Tech Stack
- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** Redux Toolkit
- **API Handling:** RTK Query, Express API
- **Database:** MongoDB with Mongoose

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo-url.git
cd your-repo-folder
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```sh
REACT_APP_API_URL=http://your-backend-api-url
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
Ensure the backend API URL and database credentials are correct before proceeding.

### 4. Start the Backend Server
```sh
cd backend
npm install
npm start
```
This will start the backend API server.

### 5. Start the Frontend Development Server
```sh
cd frontend
npm start
```
This will start the app on `http://localhost:3000`.

## Folder Structure
```
├── backend        # Backend server (Node.js, Express, MongoDB)
│   ├── models    # Mongoose models
│   ├── routes    # Express routes
│   ├── controllers # API controllers
│   ├── config    # Configuration files
│   ├── server.js # Entry point for backend
│
├── frontend       # React application
│   ├── components  # Reusable UI components
│   ├── features    # Redux slices & API services
│   ├── pages       # Application pages
│   ├── assets      # Static images and icons
│   ├── App.js      # Main app entry point
│   ├── index.js    # Renders the application
│
├── public         # Public assets
├── package.json   # Project dependencies and scripts
├── .env           # Environment variables
└── README.md      # Project documentation
```

## Backend Setup
We use Express.js for the backend API and Mongoose for MongoDB interactions.

### Example Express API (`backend/routes/auth.js`):
```js
const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
```

### MongoDB Connection (`backend/config/db.js`):
```js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## API Integration
The app interacts with the backend via Redux Toolkit Query (`authApi.js`).

### Example API Service (`src/features/auth/authApi.js`):
```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
```

## Running the Production Build
To create a production-ready build, run:
```sh
npm run build
```
This will generate an optimized version of the application in the `build` folder.

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Create a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any queries or issues, feel free to reach out via GitHub Issues or email: `your-email@example.com`. 

