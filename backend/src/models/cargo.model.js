const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['food', 'equipment', 'supplies', 'scientific', 'waste'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    module: {
      type: String,
      required: true,
    },
    rack: {
      type: String,
      required: true,
    },
    position: {
      x: Number,
      y: Number,
      z: Number,
    },
  },
  status: {
    type: String,
    enum: ['stored', 'in-use', 'depleted', 'waste'],
    default: 'stored',
  },
  expirationDate: {
    type: Date,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: String,
  },
});

// Index for efficient querying
cargoSchema.index({ type: 1, status: 1 });
cargoSchema.index({ 'location.module': 1, 'location.rack': 1 });

const Cargo = mongoose.model('Cargo', cargoSchema);

module.exports = Cargo; 