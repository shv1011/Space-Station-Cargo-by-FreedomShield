import Cargo from '../models/Cargo.js';

export const getInventorySummary = async (req, res) => {
  try {
    const summary = await Cargo.aggregate([
      {
        $group: {
          _id: '$type',
          totalQuantity: { $sum: '$quantity' },
          totalWeight: { $sum: '$weight' },
          items: { $sum: 1 }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.json(cargo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 