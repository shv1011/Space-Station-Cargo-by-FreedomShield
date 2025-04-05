const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const Cargo = require('../models/cargo.model');

const router = express.Router();

// Get inventory summary
router.get('/summary', auth, async (req, res) => {
  try {
    const summary = await Cargo.aggregate([
      {
        $group: {
          _id: '$type',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalWeight: { $sum: '$weight' },
          itemsByStatus: {
            $push: {
              status: '$status',
              quantity: '$quantity',
              weight: '$weight',
            },
          },
        },
      },
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory summary' });
  }
});

// Get inventory by location
router.get('/by-location', auth, async (req, res) => {
  try {
    const inventory = await Cargo.aggregate([
      {
        $group: {
          _id: {
            module: '$location.module',
            rack: '$location.rack',
          },
          items: {
            $push: {
              id: '$_id',
              name: '$name',
              type: '$type',
              quantity: '$quantity',
              weight: '$weight',
              status: '$status',
            },
          },
          totalItems: { $sum: 1 },
          totalWeight: { $sum: '$weight' },
        },
      },
      {
        $sort: {
          '_id.module': 1,
          '_id.rack': 1,
        },
      },
    ]);

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory by location' });
  }
});

// Get low stock items
router.get('/low-stock', auth, async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5;
    const lowStock = await Cargo.find({
      quantity: { $lte: threshold },
      status: { $ne: 'waste' },
    })
      .populate('updatedBy', 'username')
      .sort({ quantity: 1 });

    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock items' });
  }
});

// Get expiring items
router.get('/expiring', auth, async (req, res) => {
  try {
    const daysThreshold = parseInt(req.query.days) || 30;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysThreshold);

    const expiringItems = await Cargo.find({
      expirationDate: {
        $exists: true,
        $ne: null,
        $lte: expirationDate,
      },
      status: { $ne: 'waste' },
    })
      .populate('updatedBy', 'username')
      .sort({ expirationDate: 1 });

    res.json(expiringItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expiring items' });
  }
});

// Transfer items between locations
router.post(
  '/transfer',
  [
    auth,
    body('cargoId').notEmpty().withMessage('Cargo ID is required'),
    body('newLocation.module').notEmpty().withMessage('New module location is required'),
    body('newLocation.rack').notEmpty().withMessage('New rack location is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { cargoId, newLocation } = req.body;
      const cargo = await Cargo.findById(cargoId);

      if (!cargo) {
        return res.status(404).json({ message: 'Cargo item not found' });
      }

      cargo.location = newLocation;
      cargo.lastUpdated = Date.now();
      cargo.updatedBy = req.user._id;

      await cargo.save();
      res.json(cargo);
    } catch (error) {
      res.status(500).json({ message: 'Error transferring cargo item' });
    }
  }
);

module.exports = router; 