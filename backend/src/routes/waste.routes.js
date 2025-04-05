const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const Cargo = require('../models/cargo.model');

const router = express.Router();

// Get all waste items
router.get('/', auth, async (req, res) => {
  try {
    const waste = await Cargo.find({ status: 'waste' })
      .populate('updatedBy', 'username')
      .sort({ lastUpdated: -1 });

    res.json(waste);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste items' });
  }
});

// Mark item as waste
router.post(
  '/mark-as-waste',
  [
    auth,
    body('cargoId').notEmpty().withMessage('Cargo ID is required'),
    body('reason').notEmpty().withMessage('Reason for waste is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { cargoId, reason } = req.body;
      const cargo = await Cargo.findById(cargoId);

      if (!cargo) {
        return res.status(404).json({ message: 'Cargo item not found' });
      }

      cargo.status = 'waste';
      cargo.notes = reason;
      cargo.lastUpdated = Date.now();
      cargo.updatedBy = req.user._id;

      await cargo.save();
      res.json(cargo);
    } catch (error) {
      res.status(500).json({ message: 'Error marking item as waste' });
    }
  }
);

// Get waste statistics
router.get('/statistics', auth, async (req, res) => {
  try {
    const statistics = await Cargo.aggregate([
      {
        $match: { status: 'waste' },
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalWeight: { $sum: '$weight' },
          items: {
            $push: {
              id: '$_id',
              name: '$name',
              weight: '$weight',
              reason: '$notes',
              lastUpdated: '$lastUpdated',
            },
          },
        },
      },
    ]);

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste statistics' });
  }
});

// Process waste (admin only)
router.post(
  '/process',
  [
    auth,
    isAdmin,
    body('cargoIds').isArray().withMessage('Cargo IDs must be an array'),
    body('processingMethod').notEmpty().withMessage('Processing method is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { cargoIds, processingMethod } = req.body;
      
      // Update all waste items
      await Cargo.updateMany(
        {
          _id: { $in: cargoIds },
          status: 'waste',
        },
        {
          $set: {
            notes: `Processed using ${processingMethod}`,
            lastUpdated: Date.now(),
            updatedBy: req.user._id,
          },
        }
      );

      // Delete processed waste items
      await Cargo.deleteMany({
        _id: { $in: cargoIds },
        status: 'waste',
      });

      res.json({ message: 'Waste items processed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error processing waste items' });
    }
  }
);

module.exports = router; 