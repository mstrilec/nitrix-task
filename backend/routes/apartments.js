const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment');

router.post('/', async (req, res) => {
  try {
    const apartment = new Apartment(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { price, rooms } = req.query;
    const filters = {};
    if (price) filters.price = { $lte: Number(price) };
    if (rooms) filters.rooms = Number(rooms);
    const apartments = await Apartment.find(filters);
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Apartment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;