const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to DB and start server
app.listen(PORT, async () => {
  try {
    await sequelize.sync(); // use { force: true } to drop/recreate tables
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to sync DB:', error);
  }
});
