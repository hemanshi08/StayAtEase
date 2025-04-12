const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, userType, user_address, bio } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      userType,
      user_address,
      bio,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ u_id: user.u_id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

