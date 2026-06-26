import User from '../models/User.js';
import Analysis from '../models/Analysis.js';
import Simulation from '../models/Simulation.js';
import Competitor from '../models/Competitor.js';
import LlmsTxt from '../models/LlmsTxt.js';

export const syncUser = async (req, res, next) => {
    try {
        const clerkUser = req.auth;
        
        if (!clerkUser?.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Ideally req.user data would flow from a webhook or body, 
        // but for now we'll just upsert the user based on the Clerk ID
        const email = req.body?.email || 'unknown@aivo.com'; // Fallback if no body passed
        
        const user = await User.findOneAndUpdate(
            { clerkId: clerkUser.userId },
            { 
                $setOnInsert: { email },
                $set: { lastLoginAt: new Date() }
            },
            { new: true, upsert: true }
        );

        res.json({ message: 'User synced successfully', user });
    } catch (error) {
        next(error);
    }
};

export const getDashboardStats = async (req, res, next) => {
    try {
        const { userId } = req.auth;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Aggregate analysis data for the user
        const analyses = await Analysis.find({ userId }).sort({ createdAt: -1 });
        
        const totalAnalyses = analyses.length;
        const completed = analyses.filter(a => a.status === 'Completed');
        
        const avgScore = completed.length > 0 
            ? completed.reduce((sum, a) => sum + (a.scoreInfo?.aiVisibilityScore || 0), 0) / completed.length 
            : 0;

        // Fetch recent from other engines
        const [simulations, competitors, llmstxts] = await Promise.all([
            Simulation.find({ userId }).sort({ createdAt: -1 }).limit(5),
            Competitor.find({ userId }).sort({ createdAt: -1 }).limit(5),
            LlmsTxt.find({ userId }).sort({ createdAt: -1 }).limit(5),
        ]);

        let recent = [];
        analyses.slice(0, 5).forEach(a => recent.push({...a.toObject(), engine: 'Semantic Scoring'}));
        simulations.forEach(s => recent.push({...s.toObject(), engine: 'AI Simulation', url: s.url || 'Raw Content'}));
        competitors.forEach(c => recent.push({...c.toObject(), engine: 'Competitor Intel', url: c.targetUrl}));
        llmstxts.forEach(l => recent.push({...l.toObject(), engine: 'Content Extraction', url: l.url}));

        recent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            stats: {
                totalAnalyses,
                avgScore: Math.round(avgScore),
                domainsTracked: new Set(analyses.map(a => {
                    try { return new URL(a.url).hostname } catch(e) { return a.url }
                })).size
            },
            recentAnalyses: recent.slice(0, 5) // Return top 5 recent across all engines
        });

    } catch (error) {
        next(error);
    }
};
