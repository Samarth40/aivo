import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  preferences: {
    theme: { type: String, default: 'dark' },
    emailNotifications: { type: Boolean, default: true }
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
