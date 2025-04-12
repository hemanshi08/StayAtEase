const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || !(await bcrypt.compare(password, admin.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ admin_id: admin.admin_id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
