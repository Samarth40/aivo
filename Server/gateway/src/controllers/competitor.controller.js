import Competitor from '../models/Competitor.js';
import { redisClient } from '../middleware/rateLimiter.js';

export const startCompetitorAnalysis = async (req, res, next) => {
    try {
        const { targetUrl, competitorUrl } = req.body;
        const userId = req.auth?.userId;

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        if (!targetUrl || !competitorUrl)
            return res.status(400).json({ error: 'Both targetUrl and competitorUrl are required' });

        const newJob = new Competitor({ userId, targetUrl, competitorUrl, status: 'Pending' });
        await newJob.save();

        await redisClient.rpush('aivo_tasks', JSON.stringify({
            jobId: newJob._id.toString(),
            type: 'competitor',
            targetUrl,
            competitorUrl,
            userId,
            timestamp: new Date().toISOString()
        }));

        res.status(202).json({ message: 'Competitor analysis queued', competitor: newJob });
    } catch (error) {
        next(error);
    }
};

export const getCompetitorResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth?.userId;

        const job = await Competitor.findOne({ _id: id, userId });
        if (!job) return res.status(404).json({ error: 'Job not found' });

        res.json(job);
    } catch (error) {
        next(error);
    }
};
