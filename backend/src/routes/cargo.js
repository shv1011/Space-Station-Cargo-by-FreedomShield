import express from 'express';
import { 
  createCargo, 
  getCargo, 
  updateCargo, 
  deleteCargo,
  getAllCargo 
} from '../controllers/cargo.js';

const router = express.Router();

// Create new cargo
router.post('/', createCargo);

// Get all cargo
router.get('/', getAllCargo);

// Get single cargo
router.get('/:id', getCargo);

// Update cargo
router.put('/:id', updateCargo);

// Delete cargo
router.delete('/:id', deleteCargo);

export default router; 