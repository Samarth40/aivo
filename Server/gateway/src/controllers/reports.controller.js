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
            // Compute average visibility score from actual simulation results
            let simScore = 0;
            if (s.results && typeof s.results === 'object') {
                const scores = Object.values(s.results)
                    .map(r => r?.visibilityScore)
                    .filter(v => typeof v === 'number');
                simScore = scores.length > 0
                    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                    : 0;
            }
            const simSize = s.results ? `${(Buffer.byteLength(JSON.stringify(s.results)) / 1024).toFixed(1)} KB` : '0 KB';
            reports.push({
                id: s._id,
                name: `Simulation: ${s.url ? safeHostname(s.url) : 'Raw Content'}`,
                engine: "AI Simulation",
                date: new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: simScore,
                size: simSize,
                type: "json",
                createdAt: s.createdAt
            });
        });

        // Map Competitor
        competitors.forEach(c => {
            const compScore = c.results?.target?.scores?.overall || 0;
            const compSize = c.results ? `${(Buffer.byteLength(JSON.stringify(c.results)) / 1024).toFixed(1)} KB` : '0 KB';
            reports.push({
                id: c._id,
                name: `Competitor Intel: ${safeHostname(c.targetUrl)} vs ${safeHostname(c.competitorUrl)}`,
                engine: "Competitor Intel",
                date: new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: compScore,
                size: compSize,
                type: "pdf",
                createdAt: c.createdAt
            });
        });

        // Map LlmsTxt
        llmstxts.forEach(l => {
            // Score based on completeness: has brand + tagline + description + sections
            let llmsScore = 0;
            if (l.results) {
                if (l.results.brandName) llmsScore += 25;
                if (l.results.tagline) llmsScore += 25;
                if (l.results.description) llmsScore += 25;
                if (l.results.sections?.length > 0) llmsScore += 25;
            }
            const llmsSize = l.results ? `${(Buffer.byteLength(JSON.stringify(l.results)) / 1024).toFixed(1)} KB` : '0 KB';
            reports.push({
                id: l._id,
                name: `LLMs.txt: ${safeHostname(l.url)}`,
                engine: "Content Extraction",
                date: new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                score: llmsScore,
                size: llmsSize,
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
