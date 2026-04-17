import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { requireAuth, clerkMiddleware } from '@clerk/express';
import { Redis } from 'ioredis';

// Load config from the parent folder's .env file
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Initialize Redis 
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Basic Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AIVO API Gateway' });
});

// Protected Route Example
app.post('/api/analyze', clerkMiddleware(), requireAuth(), async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const userId = req.auth.userId;

    // TODO: Create a "Pending" record in MongoDB and get its ID
    const reportId = new mongoose.Types.ObjectId().toString(); // Placeholder

    const jobData = {
      jobId: reportId,
      url,
      userId,
      timestamp: new Date().toISOString()
    };

    // Push job to standard Redis List for Python to consume
    await redisClient.rpush('aivo_tasks', JSON.stringify(jobData));

    res.json({ message: 'Analysis started asynchronously', reportId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to enqueue analysis' });
  }
});

// Handle cases where .env variables are missing
if (!process.env.MONGODB_URI) {
  console.log("WAITING: MONGODB_URI is not set in ../.env");
} else {
  // Connect to MongoDB and start server
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB via Mongoose');
      app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      console.log('Ensure MONGODB_URI is correctly set and network is accessible.');
    });
}
