import Cargo from '../models/Cargo.js';

export const createCargo = async (req, res) => {
  try {
    const cargo = new Cargo(req.body);
    await cargo.save();
    res.status(201).json(cargo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCargo = async (req, res) => {
  try {
    const cargo = await Cargo.find();
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCargo = async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCargo = async (req, res) => {
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

export const deleteCargo = async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndDelete(req.params.id);
    if (!cargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    res.json({ message: 'Cargo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 