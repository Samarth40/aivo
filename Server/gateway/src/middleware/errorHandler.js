import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Write error.log to gateway root for easy access
const logPath = path.resolve(__dirname, '../../error.log');

export const errorHandler = (err, req, res, next) => {
    const log = `[ERROR] ${req.method} ${req.url} - ${err.message}\n${err.stack}\n`;
    console.error(log);
    try {
        fs.appendFileSync(logPath, log);
    } catch (_) { /* ignore fs errors */ }

    // Clerk — Publishable key missing (config error, not user error)
    if (err.message && err.message.includes('Publishable key is missing')) {
        console.error('⚠️  CLERK CONFIG ERROR: CLERK_PUBLISHABLE_KEY not loaded. Check Server/.env');
        return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
    }

    // Clerk Authentication Errors
    if (err.message && err.message.includes('Unauthenticated')) {
        return res.status(401).json({ error: 'Unauthorized. Please login.' });
    }

    // Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ error: 'Validation Error', details: messages });
    }

    // Mongoose CastError (bad ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format.' });
    }

    // Default 500 error
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : err.message
    });
};
