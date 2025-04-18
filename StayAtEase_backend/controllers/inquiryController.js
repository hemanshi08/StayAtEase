const { Inquiry, Property, User } = require('../models');

exports.createInquiry = async (req, res) => {
  try {
    const { p_id, message, name, email, phone } = req.body;

    if (!p_id || !message || !name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const inquiry = await Inquiry.create({
      u_id: req.user.id, // from auth middleware
      p_id,
      message,
      name,
      email,
      phone,
    });

    res.status(201).json({ message: "Inquiry submitted successfully", inquiry });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ error: "Internal server error" });
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
