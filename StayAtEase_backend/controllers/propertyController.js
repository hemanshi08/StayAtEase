const { Property } = require("../models");

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: "Available" } });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
