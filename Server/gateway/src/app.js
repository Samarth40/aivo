import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import { getAuth, clerkMiddleware } from '@clerk/express';

// ─── Resolve absolute path to Server/.env regardless of CWD ───────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __dirname = e:/AIVO_PROJECT/Server/gateway/src
// Server/.env is 2 levels up from src/: src/ -> gateway/ -> Server/.env
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

console.log('🔑 ENV Check — CLERK_PUBLISHABLE_KEY:', process.env.CLERK_PUBLISHABLE_KEY ? '✅ Loaded' : '❌ MISSING');
console.log('🔑 ENV Check — CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? '✅ Loaded' : '❌ MISSING');
console.log('🔑 ENV Check — MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ MISSING');
console.log('🔑 ENV Check — REDIS_URL:', process.env.REDIS_URL ? '✅ Loaded' : '❌ MISSING');

// Import Middleware (after dotenv so env vars are available)
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter, heavyTaskLimiter } from './middleware/rateLimiter.js';

// Import Controllers
import { startAnalysis, getAnalysisResult } from './controllers/analysis.controller.js';
import { getDashboardStats, syncUser } from './controllers/user.controller.js';
import { startSimulation, getSimulationResult } from './controllers/simulation.controller.js';
import { startCompetitorAnalysis, getCompetitorResult } from './controllers/competitor.controller.js';
import { startLlmsGeneration, getLlmsResult } from './controllers/llmstxt.controller.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// Clerk middleware — explicitly pass both keys so it never falls back to env lookup failure
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
}));

// General API Rate Limiting (exclude heavy analysis endpoints)
app.use('/api', (req, res, next) => {
  const isHeavyTask = req.path.startsWith('/analyze') || 
                      req.path.startsWith('/simulate') || 
                      req.path.startsWith('/competitor') || 
                      req.path.startsWith('/llmstxt');
  if (isHeavyTask) return next();
  return apiLimiter(req, res, next);
});

// Middleware to manually check Auth instead of relying on deprecated requireAuth()
const checkAuth = (req, res, next) => {
  const authState = getAuth(req);
  if (!authState || !authState.userId) {
    console.warn('⚠️ Unauthorized request to', req.path, '- token:', req.headers.authorization ? 'Present' : 'Missing', 'authState:', authState);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Ensure we place the user ID somewhere accessible for the rest of the app
  req.auth = authState; // In case other routes expect req.auth
  next();
};

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AIVO Application API Gateway' });
});

// User Routes
app.post('/api/user/sync', checkAuth, syncUser);
app.get('/api/user/stats', checkAuth, getDashboardStats);

// Analysis Routes
app.post('/api/analyze', checkAuth, heavyTaskLimiter, startAnalysis);
app.get('/api/analyze/:id', checkAuth, getAnalysisResult);

// Simulation Routes
app.post('/api/simulate', checkAuth, startSimulation);
app.get('/api/simulate/:id', checkAuth, getSimulationResult);

// Competitor Intelligence Routes
app.post('/api/competitor', checkAuth, heavyTaskLimiter, startCompetitorAnalysis);
app.get('/api/competitor/:id', checkAuth, getCompetitorResult);

// LLMs.txt Generation Routes
app.post('/api/llmstxt', checkAuth, heavyTaskLimiter, startLlmsGeneration);
app.get('/api/llmstxt/:id', checkAuth, getLlmsResult);

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
