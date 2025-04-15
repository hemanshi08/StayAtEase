const { Property, User } = require("../models");

// Owner creates property
    exports.createProperty = async (req, res) => {
      try {
        const { u_id } = req.user; // from token
        const property = await Property.create({ ...req.body, u_id });
        res.status(201).json(property);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    };

// All available properties (visible to all users)
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: "Available" } });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Property owner sees all their properties (including Unavailable)
exports.getMyProperties = async (req, res) => {
  try {
    const { u_id } = req.user;
    const properties = await Property.findAll({ where: { u_id } });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin sees all properties
exports.getAllPropertiesAdmin = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Owner updates property
exports.updateProperty = async (req, res) => {
  try {
    const { p_id } = req.params;
    const { u_id } = req.user;

    const property = await Property.findOne({ where: { p_id, u_id } });
    if (!property) return res.status(403).json({ error: "Not authorized or property not found" });

    await property.update(req.body);
    res.status(200).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Owner soft-deletes (changes status)
exports.markPropertyUnavailable = async (req, res) => {
  try {
    const { p_id } = req.params;
    const { u_id } = req.user;

    const property = await Property.findOne({ where: { p_id, u_id } });
    if (!property) return res.status(403).json({ error: "Not authorized or property not found" });

    await property.update({ status: "Unavailable" });
    res.status(200).json({ message: "Property marked as Unavailable" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Owner marks property as Available
exports.markPropertyAvailable = async (req, res) => {
  try {
    const { p_id } = req.params;
    const { u_id } = req.user;

    const property = await Property.findOne({ where: { p_id, u_id } });
    if (!property) {
      return res.status(403).json({ error: "Not authorized or property not found" });
    }

    await property.update({ status: "Available" });
    res.status(200).json({ message: "Property marked as Available" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Admin permanently deletes property
exports.deletePropertyByAdmin = async (req, res) => {
  try {
    const { p_id } = req.params;

    const property = await Property.findByPk(p_id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    await property.destroy();
    res.status(200).json({ message: "Property deleted permanently" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
