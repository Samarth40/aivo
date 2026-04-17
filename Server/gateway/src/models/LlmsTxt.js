import mongoose from 'mongoose';

const llmsTxtSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  url: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Crawling', 'Generating', 'Completed', 'Failed'],
    default: 'Pending'
  },
  results: { type: mongoose.Schema.Types.Mixed, default: null },
  error: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model('LlmsTxt', llmsTxtSchema);
