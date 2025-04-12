const { Inquiry } = require("../models");

exports.createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getInquiriesByProperty = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({ where: { p_id: req.params.p_id } });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
