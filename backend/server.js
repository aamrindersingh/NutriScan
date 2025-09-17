const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { User, Profile, DailyGoal, FoodItem, ConsumptionLog } = require('./models/relations');

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dailyGoalRoutes = require('./routes/dailyGoalRoutes');
const foodItemRoutes = require('./routes/foodItemRoutes');
const consumptionLogRoutes = require('./routes/consumptionLogRoutes');
const publicRoutes = require('./routes/publicRoutes');
const barcodeRoutes = require('./routes/barcodeRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const geminiRoutes = require('./routes/gemini');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'https://moonlit-kulfi-8c4807.netlify.app', // Production frontend
    'http://moonlit-kulfi-8c4807.netlify.app' // In case HTTP is used
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet()); 
app.use(morgan('dev'));

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    // Sync all models without dropping existing data
    return sequelize.sync({ force: false }); // Use alter instead of force
  })
  .then(() => {
    // Database ready
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to NutriScan API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      goals: '/api/goals',
      food: '/api/food',
      logs: '/api/logs',
      recommendations: '/api/recommendations',
      barcode: '/api/barcode',
      gemini: '/api/gemini'
    }
  });
});


// Register API routes
app.use('/api/barcode', barcodeRoutes); // Public barcode routes (no auth required)
app.use('/api/public', publicRoutes); // Public routes first (no auth required)
app.use('/api/gemini', geminiRoutes); // Gemini AI routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/goals', dailyGoalRoutes);
app.use('/api/food', foodItemRoutes);
app.use('/api/logs', consumptionLogRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 