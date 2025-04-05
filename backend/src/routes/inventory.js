import express from 'express';
import { 
  getInventorySummary,
  updateInventory 
} from '../controllers/inventory.js';

const router = express.Router();

// Get inventory summary
router.get('/summary', getInventorySummary);

// Update inventory
router.put('/:id', updateInventory);

export default router; 