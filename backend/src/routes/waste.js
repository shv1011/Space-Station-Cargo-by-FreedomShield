import express from 'express';
import { 
  createWaste,
  getWaste,
  updateWaste,
  deleteWaste,
  getAllWaste
} from '../controllers/waste.js';

const router = express.Router();

// Create new waste entry
router.post('/', createWaste);

// Get all waste entries
router.get('/', getAllWaste);

// Get single waste entry
router.get('/:id', getWaste);

// Update waste entry
router.put('/:id', updateWaste);

// Delete waste entry
router.delete('/:id', deleteWaste);

export default router; 