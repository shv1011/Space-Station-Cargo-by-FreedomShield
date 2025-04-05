const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const Cargo = require('../models/cargo.model');

const router = express.Router();

// Get all cargo items
router.get('/', auth, async (req, res) => {
  try {
    const query = {};
    
    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by location
    if (req.query.module) {
      query['location.module'] = req.query.module;
    }
    
    const cargo = await Cargo.find(query)
      .populate('updatedBy', 'username')
      .sort({ lastUpdated: -1 });
      
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cargo items' });
  }
});

// Get cargo item by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id)
      .populate('updatedBy', 'username');
      
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo item not found' });
    }
    
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cargo item' });
  }
});

// Create new cargo item
router.post(
  '/',
  [
    auth,
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('type').isIn(['food', 'equipment', 'supplies', 'scientific', 'waste'])
      .withMessage('Invalid cargo type'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive number'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    body('location.module').trim().notEmpty().withMessage('Module location is required'),
    body('location.rack').trim().notEmpty().withMessage('Rack location is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const cargo = new Cargo({
        ...req.body,
        updatedBy: req.user._id,
      });

      await cargo.save();
      res.status(201).json(cargo);
    } catch (error) {
      res.status(500).json({ message: 'Error creating cargo item' });
    }
  }
);

// Update cargo item
router.put(
  '/:id',
  [
    auth,
    body('quantity').optional().isInt({ min: 0 })
      .withMessage('Quantity must be a positive number'),
    body('weight').optional().isFloat({ min: 0 })
      .withMessage('Weight must be a positive number'),
    body('status').optional().isIn(['stored', 'in-use', 'depleted', 'waste'])
      .withMessage('Invalid status'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const cargo = await Cargo.findById(req.params.id);
      if (!cargo) {
        return res.status(404).json({ message: 'Cargo item not found' });
      }

      // Update fields
      Object.assign(cargo, {
        ...req.body,
        lastUpdated: Date.now(),
        updatedBy: req.user._id,
      });

      await cargo.save();
      res.json(cargo);
    } catch (error) {
      res.status(500).json({ message: 'Error updating cargo item' });
    }
  }
);

// Delete cargo item (admin only)
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo item not found' });
    }

    await cargo.remove();
    res.json({ message: 'Cargo item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cargo item' });
  }
});

// Search cargo items
router.get('/search/:query', auth, async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const cargo = await Cargo.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { type: { $regex: searchQuery, $options: 'i' } },
        { 'location.module': { $regex: searchQuery, $options: 'i' } },
        { 'location.rack': { $regex: searchQuery, $options: 'i' } },
      ],
    }).populate('updatedBy', 'username');

    res.json(cargo);
  } catch (error) {
    res.status(500).json({ message: 'Error searching cargo items' });
  }
});

module.exports = router; 