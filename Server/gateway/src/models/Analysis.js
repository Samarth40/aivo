import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  userId: {
    type: String, // Clerk ID, allows joining with User model later
    required: true,
    index: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Extracting', 'Analyzing', 'Completed', 'Failed'],
    default: 'Pending',
  },
  scoreInfo: {
    aiVisibilityScore: { type: Number, default: 0 },
    aiEnginesAnalyzed: { type: Number, default: 6 },
    expectedCitations: { type: Number, default: 0 },
  },
  semanticDensity: {
    type: Number,
    default: 0, 
  },
  entitiesFound: [{
    type: String
  }],
  errorMessage: {
    type: String,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Analysis', analysisSchema);
