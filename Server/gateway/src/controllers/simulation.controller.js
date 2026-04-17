import Simulation from '../models/Simulation.js';
import { redisClient } from '../middleware/rateLimiter.js';

export const startSimulation = async (req, res, next) => {
    try {
        const { url, content, selectedModels } = req.body;
        const userId = req.auth?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        if (!url && !content) {
            return res.status(400).json({ error: 'Either URL or raw content is required' });
        }
        
        if (!selectedModels || !Array.isArray(selectedModels) || selectedModels.length === 0) {
            return res.status(400).json({ error: 'Selected models are required' });
        }

        // 1. Create a Pending Simulation Record in MongoDB
        const newSimulation = new Simulation({
            userId,
            url: url || '',
            content: content || '',
            selectedModels,
            status: 'Pending'
        });
        
        await newSimulation.save();

        // 2. Prepare payload for the Python Worker
        const jobData = {
            jobId: newSimulation._id.toString(),
            type: 'simulation',
            url: url || '',
            content: content || '',
            selectedModels,
            userId,
            timestamp: new Date().toISOString()
        };

        // 3. Push to Redis queue
        await redisClient.rpush('aivo_tasks', JSON.stringify(jobData));

        res.status(202).json({ 
            message: 'Simulation job properly queued', 
            simulation: newSimulation 
        });

    } catch (error) {
        next(error);
    }
};

export const getSimulationResult = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.auth?.userId;

        const simulation = await Simulation.findOne({ _id: id, userId });

        if (!simulation) {
            return res.status(404).json({ error: 'Simulation not found' });
        }

        res.json(simulation);

    } catch (error) {
        next(error);
    }
};
