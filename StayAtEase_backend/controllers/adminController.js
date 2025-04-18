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
