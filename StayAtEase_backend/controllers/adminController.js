const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models");

// Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.admin_id, userType: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ 
      token, 
      admin: {
        id: admin.admin_id,
        email: admin.email,
        name: admin.fullName,
        userType: "admin",
        profile_pic: admin.profile_pic
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const { admin_id } = req.user; // from JWT
//     const { fullName, phone, profile_pic } = req.body;

//     const admin = await Admin.findByPk(admin_id);
//     if (!admin) return res.status(404).json({ error: "Admin not found" });

//     admin.fullName = fullName || admin.fullName;
//     admin.phone = phone || admin.phone;
//     admin.profile_pic = profile_pic || admin.profile_pic;

//     await admin.save();

//     res.status(200).json({ message: "Profile updated", admin });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



exports.getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id; // Get admin ID from auth middleware
    console.log('Fetching profile for admin:', adminId);

    const admin = await Admin.findOne({
      where: { admin_id: adminId }, // Match admin using admin_id
      attributes: { exclude: ['password'] } // Exclude password from response
    });

    if (!admin) {
      console.log('Admin not found for ID:', adminId);
      return res.status(404).json({ error: 'Admin not found' });
    }

    console.log('Admin found, sending profile data');
    res.json({
      success: true,
      admin: {
        id: admin.admin_id,       // admin_id mapped here
        fullName: admin.fullName,  // fullName mapped here
        email: admin.email,        // email mapped here
        phone: admin.phone,        // phone mapped here
        profile_pic: admin.profile_pic, // profile_pic mapped here
      }
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ error: 'Failed to fetch admin profile' });
  }
};




exports.updateAdminDetails = async (req, res) => {
  try {
    const { id } = req.user;  // assuming `req.user` has `admin_id`
    const { fullName, email, phone } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Update the admin's details
    admin.fullName = fullName || admin.fullName;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;

    await admin.save();

    res.status(200).json({ message: "Admin details updated successfully" });
  } catch (error) {
    console.error("Error updating admin details:", error);
    res.status(500).json({ error: "Failed to update admin details" });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const { id } = req.user; // Assuming admin_id is in the token payload
    const { currentPassword, newPassword } = req.body;

    // Validate passwords
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

// Get the currently logged-in admin's data
exports.getCurrentAdmin = async (req, res) => {
  try {
    const adminId = req.user.id; // Assuming admin's ID is in JWT token

    // Find admin by ID (you can fetch specific fields or all data)
    const admin = await Admin.findOne({
      where: { admin_id: adminId },
      attributes: ['admin_id', 'fullName', 'email', 'phone', 'profile_pic'], // Modify as needed
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};