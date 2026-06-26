import Analysis from '../models/Analysis.js';
import Simulation from '../models/Simulation.js';
import Competitor from '../models/Competitor.js';
import LlmsTxt from '../models/LlmsTxt.js';

export const getReports = async (req, res, next) => {
    try {
        const { userId } = req.auth;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Fetch from all collections
        const [analyses, simulations, competitors, llmstxts] = await Promise.all([
            Analysis.find({ userId }).sort({ createdAt: -1 }),
            Simulation.find({ userId }).sort({ createdAt: -1 }),
            Competitor.find({ userId }).sort({ createdAt: -1 }),
            LlmsTxt.find({ userId }).sort({ createdAt: -1 }),
        ]);

        // Helper to safely get hostname
        const safeHostname = (urlStr) => {
            if (!urlStr) return 'Unknown';
            try {
                return new URL(urlStr).hostname;
            } catch (e) {
                return urlStr; // Fallback to raw string if invalid URL
            }
        };

        const reports = [];

        // Map Analysis
        analyses.forEach(a => {
            reports.push({
                id: a._id,
                name: `Analysis: ${safeHostname(a.url)}`,
                engine: "Semantic Scoring",
                date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: a.scoreInfo?.aiVisibilityScore || 0,
                size: "1.2 MB",
                type: "pdf",
                createdAt: a.createdAt
            });
        });

        // Map Simulation
        simulations.forEach(s => {
            reports.push({
                id: s._id,
                name: `Simulation: ${s.url ? safeHostname(s.url) : 'Raw Content'}`,
                engine: "AI Simulation",
                date: new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: 85, // Mock score for simulation
                size: "2.4 MB",
                type: "json",
                createdAt: s.createdAt
            });
        });

        // Map Competitor
        competitors.forEach(c => {
            reports.push({
                id: c._id,
                name: `Competitor Intel: ${safeHostname(c.targetUrl)} vs ${safeHostname(c.competitorUrl)}`,
                engine: "Competitor Intel",
                date: new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: 72, // Mock
                size: "3.1 MB",
                type: "pdf",
                createdAt: c.createdAt
            });
        });

        // Map LlmsTxt
        llmstxts.forEach(l => {
            reports.push({
                id: l._id,
                name: `LLMs.txt: ${safeHostname(l.url)}`,
                engine: "Content Extraction",
                date: new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: 95, // Mock
                size: "512 KB",
                type: "txt",
                createdAt: l.createdAt
            });
        });

        // Sort by date descending
        reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({ reports });

    } catch (error) {
        next(error);
    }
};

export const deleteReport = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        const { engine, id } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let Model;
        switch (engine) {
            case 'Semantic Scoring': Model = Analysis; break;
            case 'AI Simulation': Model = Simulation; break;
            case 'Competitor Intel': Model = Competitor; break;
            case 'Content Extraction': Model = LlmsTxt; break;
            default: return res.status(400).json({ error: 'Invalid engine type' });
        }

        const result = await Model.findOneAndDelete({ _id: id, userId });

        if (!result) {
            return res.status(404).json({ error: 'Report not found' });
        }

        res.json({ message: 'Report deleted successfully' });

    } catch (error) {
        next(error);
    }
};
