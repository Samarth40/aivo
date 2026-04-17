import User from '../models/User.js';
import Analysis from '../models/Analysis.js';

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

        res.json({
            stats: {
                totalAnalyses,
                avgScore: Math.round(avgScore),
                domainsTracked: new Set(analyses.map(a => new URL(a.url).hostname)).size
            },
            recentAnalyses: analyses.slice(0, 5) // Return top 5 recent
        });

    } catch (error) {
        next(error);
    }
};
