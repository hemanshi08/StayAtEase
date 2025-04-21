const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, userType } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !password || !userType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          fullName: !fullName ? 'Full name is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          phone: !phone ? 'Phone number is required' : undefined,
          password: !password ? 'Password is required' : undefined,
          userType: !userType ? 'User type is required' : undefined
        }
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters long' });
    }

    // Validate phone number format (basic validation)
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      userType,
      user_address: req.body.user_address || 'Add your address here',
      bio: req.body.bio || 'Welcome to my profile! I am excited to be part of the StayAtEase community.',
      status: 'inactive' // Changed to match model's default value
    });

    // Return user data without sensitive information
    const userData = {
      id: newUser.u_id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      userType: newUser.userType,
      user_address: newUser.user_address,
      bio: newUser.bio,
      profile_pic: newUser.profile_pic
    };

    res.status(201).json({
      message: 'Registration successful',
      user: userData
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ 
      error: 'Registration failed',
      details: err.message 
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.u_id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { id: user.u_id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      refreshToken,
      user: {
        id: user.u_id,
        email: user.email,
        name: user.fullName,
        userType: user.userType,
        profile_pic: user.profile_pic
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from auth middleware
    console.log('Fetching profile for user:', userId);

    const user = await User.findOne({
      where: { u_id: userId },
      attributes: { exclude: ['password'] } // Exclude password from response
    });

    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found, sending profile data');
    res.json({
      success: true,
      user: {
        id: user.u_id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        profile_pic: user.profile_pic,
        user_address: user.user_address,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone, user_address, bio, profile_pic } = req.body;

    // Validate required fields
    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone number' });
    }

    const user = await User.findOne({ where: { u_id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    await user.update({
      fullName,
      phone,
      user_address: user_address || user.user_address,
      bio: bio || user.bio,
      profile_pic: profile_pic || user.profile_pic
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user.u_id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        profile_pic: user.profile_pic,
        user_address: user.user_address,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate password requirements
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const user = await User.findOne({ where: { u_id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};

// controllers/userController.js

exports.getAllTenants = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const tenants = await User.findAll({
      where: { userType: 'tenant' },
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(tenants);
  } catch (err) {
    console.error('Error fetching tenants:', err);
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
};

exports.getAllRoomOwners = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const roomOwners = await User.findAll({
      where: { userType: 'Property_Owner' },
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(roomOwners);
  } catch (err) {
    console.error('Error fetching room owners:', err);
    res.status(500).json({ error: 'Failed to fetch room owners' });
  }
};




