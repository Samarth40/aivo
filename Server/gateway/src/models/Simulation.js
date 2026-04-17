import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  url: {
    type: String, // Can be empty if inputMode was raw content
  },
  content: {
    type: String, // Can be empty if inputMode was URL
  },
  selectedModels: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  results: {
    // Dynamic object representing JSON tree of simulated AI responses
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Simulation = mongoose.model('Simulation', simulationSchema);

export default Simulation;
