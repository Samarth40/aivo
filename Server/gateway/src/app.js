import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { requireAuth, clerkMiddleware } from '@clerk/express';

// Load Environment Config — MUST be before any other imports that need process.env
dotenv.config({ path: '../.env' });

// Import Middleware
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter, heavyTaskLimiter } from './middleware/rateLimiter.js';

// Import Controllers
import { startAnalysis, getAnalysisResult } from './controllers/analysis.controller.js';
import { getDashboardStats, syncUser } from './controllers/user.controller.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Clerk middleware — explicitly pass both keys so it never falls back to env lookup failure
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
}));

// General API Rate Limiting
app.use('/api', apiLimiter);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AIVO Application API Gateway' });
});

// User Routes
app.post('/api/user/sync', requireAuth(), syncUser);
app.get('/api/user/stats', requireAuth(), getDashboardStats);

// Analysis Routes
app.post('/api/analyze', requireAuth(), heavyTaskLimiter, startAnalysis);
app.get('/api/analyze/:id', requireAuth(), getAnalysisResult);

// Global Error Handler (must be last)
app.use(errorHandler);

// Database Connection & Server Start
if (!process.env.MONGODB_URI) {
  console.error('FATAL: MONGODB_URI is not set. Check Server/.env');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB via Mongoose');
    app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
