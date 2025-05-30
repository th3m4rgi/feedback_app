import mongoose from 'mongoose';

// This is for maintaining historical trail
const feedbackHistorySchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
    minlength: [5, 'Minimum length is 5'],
    maxlength: [1000, 'Maximum length is 1000']
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Lowest'],
    max: [5, 'Highest']
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Main feedback schema for User's feedback
const feedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is a required field'],
    trim: true,
    maxlength: [100, 'Maximum length is 100']
  },
  lastName: {
    type: String,
    required: [true, 'lastName is a required field'],
    trim: true,
    maxlength: [100, 'Maximum length is 100']
  },
  email: {
    type: String,
    required: [true, 'email is a required field'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Check email']
  },
  feedback: {
    type: String,
    required: [true, 'feedback is a required field'],
    minlength: [5, 'Minimum length is 5'],
    maxlength: [1000, 'Maximum length is 1000']
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Lowest'],
    max: [5, 'Highest']
  },
  history: [feedbackHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically maintain history of changes for the feedback
feedbackSchema.pre('save', function(next) {
  if (this.isModified('feedback') || this.isModified('rating')) {
    if (!this.history) {
      this.history = [];
    }
    
    this.history.push({
      feedback: this.feedback,
      rating: this.rating,
      updatedAt: new Date()
    });
  }
  
  this.updatedAt = new Date();
  next();
});

feedbackSchema.methods.getLastChange = function() {
  return this.history && this.history.length > 0 
    ? this.history[this.history.length - 1] 
    : null;
};

export default mongoose.model('Feedback', feedbackSchema);