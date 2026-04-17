import LlmsTxt from '../models/LlmsTxt.js';
import { redisClient } from '../middleware/rateLimiter.js';

export const startLlmsGeneration = async (req, res, next) => {
    try {
        const { url } = req.body;
        const userId = req.auth?.userId;

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        if (!url) return res.status(400).json({ error: 'URL is required' });

        const newJob = new LlmsTxt({ userId, url, status: 'Pending' });
        await newJob.save();

        await redisClient.rpush('aivo_tasks', JSON.stringify({
            jobId: newJob._id.toString(),
            type: 'llmstxt',
            url,
            userId,
            timestamp: new Date().toISOString()
        }));

        res.status(202).json({ message: 'LLMs.txt generation queued', job: newJob });
    } catch (error) {
        next(error);
    }
};

export const getLlmsResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth?.userId;

        const job = await LlmsTxt.findOne({ _id: id, userId });
        if (!job) return res.status(404).json({ error: 'Job not found' });

        res.json(job);
    } catch (error) {
        next(error);
    }
};
