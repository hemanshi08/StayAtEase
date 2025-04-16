// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Import all routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Import the Sequelize instance and models
const models = require('./models');
const sequelize = models.db; //  use db from models/index.js

// Middleware
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"], // Allow all frontend origins
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Sync the database and start the server
sequelize.sync({ alter: true }) // Temporarily using force: true to ensure default values are applied
  .then(() => {
    console.log('Database synced successfully with default values.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
  
