import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// ─── Resolve absolute path to Server/.env ────────────────────────────────────
// rateLimiter.js: Server/gateway/src/middleware/rateLimiter.js
// Server/.env is 3 levels up: middleware/ -> src/ -> gateway/ -> Server/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

if (!process.env.REDIS_URL) {
  console.warn('⚠️  REDIS_URL is not set. Falling back to localhost:6379');
}

// ioredis client — no lazyConnect so it connects immediately on startup
const redisClient = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
});

redisClient.on('connect', () => console.log('✅ Redis connected'));
redisClient.on('ready', () => console.log('✅ Redis ready'));
redisClient.on('error', (err) => console.error('❌ Redis error:', err.message));

// Standard API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
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
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  message: { error: 'Analysis quota exceeded. Please try again in an hour.' }
});

// Export client so controllers can use the same connection to push jobs
export { redisClient };
