import Analysis from '../models/Analysis.js';
import { redisClient } from '../middleware/rateLimiter.js';

export const startAnalysis = async (req, res, next) => {
    try {
        const { url } = req.body;
        const userId = req.auth?.userId;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 1. Create a Pending Analysis Record in MongoDB
        const newAnalysis = new Analysis({
            userId,
            url,
            status: 'Pending'
        });
        
        await newAnalysis.save();

        // 2. Prepare payload for the Python Worker
        const jobData = {
            jobId: newAnalysis._id.toString(),
            url,
            userId,
            timestamp: new Date().toISOString()
        };

        // 3. Push to Redis queue
        await redisClient.rpush('aivo_tasks', JSON.stringify(jobData));

        res.status(202).json({ 
            message: 'Analysis job properly queued', 
            analysis: newAnalysis 
        });

    } catch (error) {
        next(error);
    }
};

export const getAnalysisResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth?.userId;

        const analysis = await Analysis.findOne({ _id: id, userId });

        if (!analysis) {
            return res.status(404).json({ error: 'Analysis not found' });
        }

        res.json(analysis);

    } catch (error) {
        next(error);
    }
};
