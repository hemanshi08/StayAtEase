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
exports.updateProfile = async (req, res) => {
  try {
    const { admin_id } = req.user; // from JWT
    const { fullName, phone, profile_pic } = req.body;

    const admin = await Admin.findByPk(admin_id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    admin.fullName = fullName || admin.fullName;
    admin.phone = phone || admin.phone;
    admin.profile_pic = profile_pic || admin.profile_pic;

    await admin.save();

    res.status(200).json({ message: "Profile updated", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { admin_id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findByPk(admin_id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Old password incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
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
