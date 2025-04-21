const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Admin } = require('../models');

const generateTokens = (id, userType) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign({ id, userType }, process.env.JWT_SECRET, {
      expiresIn: '25m', // Access token expires in 25 minutes
    });

    // Use JWT_SECRET for refresh token if JWT_REFRESH_SECRET is not available
    const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    const refreshToken = jwt.sign({ id, userType }, refreshSecret, {
      expiresIn: '7d', // Refresh token expires in 7 days
    });

    return { token, refreshToken };
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
};

// Common login for user (tenant/owner) and admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, hasPassword: !!password });

  if (!email || !password) {
    console.log('Missing credentials:', { email: !!email, password: !!password });
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    console.log('Attempting login for email:', email);
    
    // Check if it's an admin login
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      console.log('Admin found, checking password');
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        console.log('Admin password matched, generating tokens');
        const { token, refreshToken } = generateTokens(admin.admin_id, 'admin');
        return res.json({ 
          token, 
          refreshToken,
          user: {
            id: admin.admin_id,
            userType: 'admin',
            name: admin.fullName,
            email: admin.email,
            profile_pic: admin.profile_pic
          }
        });
      }
      console.log('Admin password did not match');
    }

    // Else check if user exists
    console.log('Checking for regular user');
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    console.log('User found, checking password');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('User password did not match');
      return res.status(400).json({ error: 'Invalid password' });
    }

    console.log('User password matched, generating tokens');
    const { token, refreshToken } = generateTokens(user.u_id, user.userType);
    
    res.json({ 
      token, 
      refreshToken,
      user: {
        id: user.u_id,
        userType: user.userType,
        name: user.fullName,
        email: user.email,
        profile_pic: user.profile_pic
      }
    });
  } catch (error) {
    console.error('Login error details:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Login failed. Please try again.',
      details: error.message 
    });
  }
};

// Refresh token endpoint
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(refreshToken, refreshSecret);
    const { token, refreshToken: newRefreshToken } = generateTokens(decoded.id, decoded.userType);
    
    res.json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};