import mongoose from 'mongoose';

const wasteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['organic', 'recyclable', 'hazardous', 'other']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'disposed'],
    default: 'pending'
  },
  processingMethod: {
    type: String,
    required: true,
    enum: ['composting', 'recycling', 'incineration', 'landfill', 'other']
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Waste = mongoose.model('Waste', wasteSchema);

export default Waste; 