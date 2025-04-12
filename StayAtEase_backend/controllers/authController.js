const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Admin } = require('../models');

const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Common login for user (tenant/owner) and admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if it's an admin login
    const admin = await Admin.findOne({ where: { email } });
    if (admin && password === admin.password) {
      const token = generateToken(admin.admin_id, 'admin');
      return res.json({ token, userType: 'admin', name: admin.name });
    }

    // Else check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = generateToken(user.u_id, user.userType);
    res.json({ token, userType: user.userType, name: user.fullName });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
