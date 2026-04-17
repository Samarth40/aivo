import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';

console.log("process.cwd() in rateLimiter:", process.cwd());
dotenv.config({ path: '../.env' });
console.log("rateLimiter.js REDIS_URL:", process.env.REDIS_URL);

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Standard API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, 
  legacyHeaders: false, 
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

// Stricter Rate Limiter for heavy endpoints (like starting an Analysis)
export const heavyTaskLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 analysis tasks per hour
  standardHeaders: true, 
  legacyHeaders: false, 
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  message: { error: 'Analysis quota exceeded. Please try again in an hour.' }
});

// Export client so controllers can use the same connection to push jobs
export { redisClient };
