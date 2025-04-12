const { Property } = require('../models');

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      ownerId: req.userId // from auth middleware
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'available' } });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
