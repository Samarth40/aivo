import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// ─── Resolve absolute path to Server/.env ─────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

const REDIS_URL = process.env.REDIS_URL || null;

// ─── Redis Client (optional) ───────────────────────────────────────────────────
let redisClient = null;
let redisReady = false;

if (REDIS_URL) {
  try {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
      connectTimeout: 5000,
      retryStrategy: (times) => {
        if (times > 2) return null; // give up after 2 retries
        return Math.min(times * 500, 2000);
      },
    });

    redisClient.on('ready', () => {
      redisReady = true;
      console.log('✅ Redis connected and ready');
    });

    redisClient.on('error', (err) => {
      redisReady = false;
      // suppress repeated error noise — just warn once
      if (!redisClient._warnedOnce) {
        redisClient._warnedOnce = true;
        console.warn('⚠️  Redis unavailable (non-fatal), using in-memory rate limiting:', err.message);
      }
    });

    redisClient.on('close', () => { redisReady = false; });

    // Connect async — don't block server startup
    redisClient.connect().catch(() => {});
  } catch (e) {
    console.warn('⚠️  Failed to initialise Redis client:', e.message);
    redisClient = null;
  }
} else {
  console.warn('⚠️  REDIS_URL not set — using in-memory rate limiting.');
}

// ─── Store Factory ─────────────────────────────────────────────────────────────
// Returns a RedisStore if Redis is ready, otherwise falls back to default (memory)
const makeStore = () => {
  if (redisClient && redisReady) {
    return new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    });
  }
  return undefined; // express-rate-limit defaults to memory store
};

// ─── Standard API Rate Limiter ─────────────────────────────────────────────────
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_API, 10) || 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
});

// ─── Heavy Task Rate Limiter ───────────────────────────────────────────────────
export const heavyTaskLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.RATE_LIMIT_HEAVY, 10) || 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Analysis quota exceeded. Please try again in an hour.' },
});

// Export client so controllers can push jobs to the Redis queue
export { redisClient };
