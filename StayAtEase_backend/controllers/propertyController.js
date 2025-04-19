const { Property, User , Review, Inquiry } = require("../models");
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Upload images to Cloudinary
exports.uploadImages = async (req, res) => {
  try {
    console.log('Upload Images - Request received:', {
      files: req.files ? req.files.length : 0,
      body: req.body
    });

    if (!req.files || req.files.length === 0) {
      console.log('No files uploaded');
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            resource_type: 'auto',
            folder: 'stayatease-properties',
            use_filename: true,
            unique_filename: true
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              console.log('Image uploaded successfully:', {
                url: result.secure_url,
                folder: result.folder,
                public_id: result.public_id
              });
              resolve(result.secure_url);
            }
          }
        );
        
        const bufferStream = require('stream').Readable.from(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    console.log('All images uploaded successfully:', imageUrls);
    
    res.status(200).json({ 
      success: true,
      urls: imageUrls 
    });
  } catch (err) {
    console.error('Error in uploadImages:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to upload images' 
    });
  }
};

// Owner creates property
exports.createProperty = async (req, res) => {
  try {
    console.log('Create Property - Request received:', {
      body: req.body,
      user: req.user,
      headers: req.headers
    });

    // Validate required fields
    const requiredFields = ['title', 'price', 'sq_ft', 'address', 'no_of_beds', 'no_of_bathrooms', 'property_type'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ 
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Validate numeric fields
    if (isNaN(parseFloat(req.body.price)) || parseFloat(req.body.price) <= 0) {
      console.log('Invalid price:', req.body.price);
      return res.status(400).json({ 
        success: false,
        error: 'Please enter a valid price' 
      });
    }
    if (isNaN(parseFloat(req.body.sq_ft)) || parseFloat(req.body.sq_ft) <= 0) {
      console.log('Invalid square footage:', req.body.sq_ft);
      return res.status(400).json({ 
        success: false,
        error: 'Please enter a valid square footage' 
      });
    }
    if (isNaN(parseInt(req.body.no_of_beds)) || parseInt(req.body.no_of_beds) <= 0) {
      console.log('Invalid number of beds:', req.body.no_of_beds);
      return res.status(400).json({ 
        success: false,
        error: 'Please enter a valid number of bedrooms' 
      });
    }
    if (isNaN(parseInt(req.body.no_of_bathrooms)) || parseInt(req.body.no_of_bathrooms) <= 0) {
      console.log('Invalid number of bathrooms:', req.body.no_of_bathrooms);
      return res.status(400).json({ 
        success: false,
        error: 'Please enter a valid number of bathrooms' 
      });
    }

    // Validate property type
    const validPropertyTypes = ['Apartment', 'Villa', 'Condo'];
    if (!req.body.property_type) {
      console.log('Property type is missing');
      return res.status(400).json({ 
        success: false,
        error: 'Property type is required' 
      });
    }

    // Convert property type to title case for consistency
    const propertyType = req.body.property_type.charAt(0).toUpperCase() + 
                        req.body.property_type.slice(1).toLowerCase();
    
    if (!validPropertyTypes.includes(propertyType)) {
      console.log('Invalid property type:', req.body.property_type);
      return res.status(400).json({ 
        success: false,
        error: `Invalid property type. Must be one of: ${validPropertyTypes.join(', ')}` 
      });
    }

    // Update the property type in the request body
    req.body.property_type = propertyType;

    // Validate user is a property owner
    const user = await User.findByPk(req.body.u_id);
    console.log('User found:', user ? {
      u_id: user.u_id,
      userType: user.userType
    } : 'User not found');

    if (!user || user?.userType !== 'Property_Owner') {
      console.log('User not authorized to create property');
      return res.status(403).json({ 
        success: false,
        error: 'Only property owners can add properties' 
      });
    }

    // Prepare property data
    const propertyData = {
      title: req.body.title.trim(),
      price: parseFloat(req.body.price),
      sq_ft: parseFloat(req.body.sq_ft),
      address: req.body.address.trim(),
      no_of_beds: parseInt(req.body.no_of_beds),
      no_of_bathrooms: parseInt(req.body.no_of_bathrooms),
      property_type: req.body.property_type,
      amenities: Array.isArray(req.body.amenities) ? req.body.amenities : [],
      property_images: Array.isArray(req.body.property_images) ? req.body.property_images : [],
      about: req.body.about ? req.body.about.trim() : null,
      status: 'Available',
      u_id: req.body.u_id || req.user.u_id,
      is_deleted: false
    };

    console.log('Property data prepared:', propertyData);

    
    // Create property
    const property = await Property.create(propertyData);

    console.log('Property created successfully:', property.toJSON());
    
    // Fetch the created property with user details
    const createdProperty = await Property.findByPk(property.p_id, {
      include: [{
        model: User,
        attributes: ['u_id', 'full_name', 'email']
      }]
    });

    console.log('Created property with user details:', createdProperty.toJSON());

    res.status(201).json({
      success: true,
      message: 'Property added successfully',
      property: createdProperty
    });
  } catch (err) {
    console.error('Error in createProperty:', err);
    res.status(400).json({ 
      success: false,
      error: err.message || 'Failed to create property'
    });
  }
};



// Get property by ID with associations
// exports.getPropertyById = async (req, res) => {
//   try {
//     console.log('Fetching property with id:', req.params.id);
    
//     const property = await Property.findOne({
//       where: { p_id: req.params.id, is_deleted: false },
//       include: [
//         {
//           model: User,
//           attributes: ['u_id', 'full_name', 'email', 'phone', 'profile_pic']
//         },
//         {
//           model: Review,
//           include: [{
//             model: User,
//             attributes: ['u_id', 'full_name', 'profile_pic']
//           }],
//           limit: 5
//         },
//         {
//           model: Inquiry,
//           include: [{
//             model: User,
//             attributes: ['u_id', 'full_name', 'email', 'profile_pic']
//           }],
//           limit: 5
//         }
//       ]
//     });

//     if (!property) {
//       return res.status(404).json({ success: false, message: 'Property not found' });
//     }

//     res.json({ success: true, property });
//   } catch (error) {
//     console.error('Error fetching property:', error.message, error.stack);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findOne({
      where: { p_id: id, is_deleted: false },
      include: [
        {
          model: User,
          attributes: ["u_id", "fullName", "email", "phone", "profile_pic"]
        },
        {
          model: Review,
          include: [
            {
              model: User,
              attributes: ["u_id", "fullName", "email"]
            }
          ]
        },
        {
          model: Inquiry,
          include: [
            {
              model: User,
              attributes: ["u_id", "fullName", "email"]
            }
          ]
        }
      ]
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.status(200).json(property);
  } catch (error) {
    console.error("Error in getPropertyById:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
// Get reviews for a property
exports.getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { p_id: req.params.id },
      include: [{
        model: User,
        attributes: ['u_id', 'name', 'profileImage']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get inquiries for a property
exports.getPropertyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      where: { p_id: req.params.id },
      include: [{
        model: User,
        attributes: ['u_id', 'name', 'email', 'phone']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error' });
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
    const { id } = req.user;
    const properties = await Property.findAll({ where: { u_id:id } });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
