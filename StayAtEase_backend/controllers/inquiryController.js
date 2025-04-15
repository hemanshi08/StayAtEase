const { Inquiry, Property, User } = require('../models');

exports.addInquiry = async (req, res) => {
  try {
    const { p_id, message } = req.body;

    const newInquiry = await Inquiry.create({
      u_id: req.user.u_id,
      p_id,
      message,
    });

    res.status(201).json(newInquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
};

exports.getOwnerInquiries = async (req, res) => {
  try {
    const ownerId = req.user.u_id;

    const inquiries = await Inquiry.findAll({
      include: [
        {
          model: Property,
          where: { owner_id: ownerId }, // assumes Property has `owner_id`
          attributes: ['p_id', 'title', 'location'],
        },
        {
          model: User,
          attributes: ['name', 'email', 'phone'],
        },
      ],
    });

    res.status(200).json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch inquiries for owner' });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      include: [
        {
          model: Property,
          attributes: ['p_id', 'title', 'location'],
        },
        {
          model: User,
          attributes: ['name', 'email', 'phone'],
        },
      ],
    });

    res.status(200).json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all inquiries' });
  }
};
