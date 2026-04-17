import mongoose from 'mongoose';

const competitorSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  targetUrl: { type: String, required: true },
  competitorUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Extracting', 'Analyzing', 'Completed', 'Failed'],
    default: 'Pending'
  },
  results: { type: mongoose.Schema.Types.Mixed, default: null },
  error: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model('Competitor', competitorSchema);
