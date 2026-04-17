import fs from 'fs';
export const errorHandler = (err, req, res, next) => {
    const log = `[ERROR] ${req.method} ${req.url} - ${err.message}\n${err.stack}\n`;
    console.error(log);
    fs.appendFileSync('error.log', log);
    
    // Clerk Authentication Errors
    if (err.message && err.message.includes('Unauthenticated')) {
        return res.status(401).json({ error: 'Unauthorized. Please login.' });
    }

    // Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ error: 'Validation Error', details: messages });
    }

    // Default 500 error
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message
    });
};
