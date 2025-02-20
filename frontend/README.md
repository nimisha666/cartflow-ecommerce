# E-Commerce Web Application

This is a full-stack e-commerce web application built using React, Redux Toolkit, and Tailwind CSS for the frontend. The backend API is assumed to be implemented separately. The application includes features like user authentication, product listings, a shopping cart, and profile management.

## Features
- User authentication (Login, Logout, Profile Management)
- Admin dashboard for managing products and orders
- Shopping cart functionality
- Address management for user profiles
- Search functionality for products
- Responsive UI using Tailwind CSS
- Persisted user sessions using localStorage

## Tech Stack
- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **State Management:** Redux Toolkit
- **API Handling:** RTK Query

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
```
Ensure the backend API URL is correct before proceeding.

### 4. Start the Development Server
```sh
npm start
```
This will start the app on `http://localhost:3000`.

## Folder Structure
```
├── src
│   ├── components  # Reusable UI components
│   ├── features    # Redux slices & API services
│   ├── pages       # Application pages
│   ├── assets      # Static images and icons
│   ├── App.js      # Main app entry point
│   ├── index.js    # Renders the application
│
├── public          # Public assets
├── package.json    # Project dependencies and scripts
├── .env            # Environment variables
└── README.md       # Project documentation
```

## Redux Store Setup
We use Redux Toolkit for state management. The store is configured in `src/app/store.js`, and slices are created in `src/features`.

### Store Configuration
In `src/app/store.js`:
```js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
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

