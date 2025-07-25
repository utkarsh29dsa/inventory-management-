// Made with AI
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { errorHandler } = require('./utils/errorHandler');
const connectDB = require('./config/db');

// Route files
const auth = require('./routes/authRoutes');
const products = require('./routes/productRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/products', products);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler middleware
app.use(errorHandler);

module.exports = app;
