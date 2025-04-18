const { Inquiry, Property, User } = require('../models');



exports.createInquiry = async (req, res) => {
  try {
    const { p_id, message } = req.body;

    if (!p_id || !message) {
      return res.status(400).json({ error: "Property ID and message are required" });
    }

    // Fetch user details from DB using token-based user ID
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const inquiry = await Inquiry.create({
      u_id: req.user.id,
      p_id,
      message,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
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
