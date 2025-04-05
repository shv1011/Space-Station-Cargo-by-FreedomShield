import Waste from '../models/Waste.js';

export const createWaste = async (req, res) => {
  try {
    const waste = new Waste(req.body);
    await waste.save();
    res.status(201).json(waste);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllWaste = async (req, res) => {
  try {
    const waste = await Waste.find();
    res.json(waste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWaste = async (req, res) => {
  try {
    const waste = await Waste.findById(req.params.id);
    if (!waste) {
      return res.status(404).json({ message: 'Waste entry not found' });
    }
    res.json(waste);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWaste = async (req, res) => {
  try {
    const waste = await Waste.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!waste) {
      return res.status(404).json({ message: 'Waste entry not found' });
    }
    res.json(waste);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWaste = async (req, res) => {
  try {
    const waste = await Waste.findByIdAndDelete(req.params.id);
    if (!waste) {
      return res.status(404).json({ message: 'Waste entry not found' });
    }
    res.json({ message: 'Waste entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 