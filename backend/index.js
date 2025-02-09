const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true })); // Fixed parentheses issue
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// ✅ Import Routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

// ✅ MongoDB Connection
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ MongoDB successfully connected.");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message); // Improved logging
        process.exit(1);
    }
}

main();

// ✅ Define Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
