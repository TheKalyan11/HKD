const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Enable Helmet to set security-focused HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Apply Rate Limiting to prevent brute-force attacks and abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Max 200 requests per IP per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Capture raw body for Razorpay webhook validation BEFORE parsing JSON
app.post(
  '/api/payments/verify-webhook',
  express.raw({ type: 'application/json' }),
  (req, res, next) => {
    next();
  }
);

// Standard JSON and form parsing for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup global request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
const paymentRoutes = require('./routes/payments');
const cmsRoutes = require('./routes/cms');

app.use('/api/payments', paymentRoutes);
app.use('/api/cms', cmsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[HKD Backend Server] Securely running on port ${PORT}`);
});
