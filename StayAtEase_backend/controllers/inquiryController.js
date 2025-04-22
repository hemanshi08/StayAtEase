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

exports.getAllInquiriesForOwner =  async (req, res) => {
  try {
    const userId = req.user.id; // Auth middleware gives this
    console.log("User ID from token:", userId);
    // Step 1: Find all property IDs owned by this user
    const properties = await Property.findAll({
      where: { u_id: userId },
      attributes: ['p_id']
    });

    const propertyIds = properties.map((prop) => prop.p_id);

    if (propertyIds.length === 0) {
      return res.status(200).json({ message: 'No properties found for this user.', inquiries: [] });
    }

    // Step 2: Find all inquires for those properties
    const inquiry = await Inquiry.findAll({
      where: { p_id: propertyIds },
      include: [
        {
          model: Property,
          attributes: ['p_id'],
          required: true
        },
        {
          model: User,
          attributes: ['u_id', 'fullName', 'email','phone'],
          required: true
        }
      ],
      
    });

    res.status(200).json({ message: 'Inquiry fetched successfully.', inquiries: inquiry });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Server error while fetching inquiries.', error: error.message });
  }
};


// exports.getOwnerInquiries = async (req, res) => {
//   try {
//     const ownerId = req.user.u_id;

//     const inquiries = await Inquiry.findAll({
//       include: [
//         {
//           model: Property,
//           where: { owner_id: ownerId }, // assumes Property has `owner_id`
//           attributes: ['p_id', 'title', 'location'],
//         },
//         {
//           model: User,
//           attributes: ['name', 'email', 'phone'],
//         },
//       ],
//     });

//     res.status(200).json(inquiries);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch inquiries for owner' });
//   }
// };

// exports.getAllInquiries = async (req, res) => {
//   try {
//     const inquiries = await Inquiry.findAll({
//       include: [
//         {
//           model: Property,
//           attributes: ['p_id', 'title', 'location'],
//         },
//         {
//           model: User,
//           attributes: ['name', 'email', 'phone'],
//         },
//       ],
//     });

//     res.status(200).json(inquiries);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch all inquiries' });
//   }
// };


exports.getAllInquiries = async (req, res) => {
  try {
    // 1. Verify admin role
    if (!req.user || req.user.userType?.toLowerCase() !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // 2. Fetch all inquiries with associated user and property data
    const inquiries = await Inquiry.findAll({
      include: [
        {
          model: User,
          attributes: ['u_id', 'fullName', 'email', 'phone'],
          as: 'User'
        },
        {
          model: Property,
          attributes: ['p_id', 'title', 'address', 'price'],
          as: 'Property'
        }
      ],
      order: [['i_id', 'DESC']] // Newest inquiries first
    });

    

    res.status(200).json({message: 'Inquiry fetched successfully.', inquiries: inquiries});

  } catch (err) {
    console.error('Error fetching inquiries:', {
      message: err.message,
      stack: err.stack,
      original: err.original
    });
    
    res.status(500).json({ 
      error: 'Failed to fetch inquiries',
      ...(process.env.NODE_ENV === 'development' && {
        details: err.message
      })
    });
  }
};

exports.deleteInquiryByAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized: Only admin can delete inquiries." });
    }

    // Find the inquiry
    const inquiry = await Inquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    // Delete the inquiry
    await inquiry.destroy();

    res.status(200).json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ error: "Server error while deleting inquiry." });
  }
};