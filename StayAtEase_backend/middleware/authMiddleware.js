const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Standardize the user ID field
    req.user = {
      id: decoded.id,
      userType: decoded.userType,
      role: decoded.userType // Use userType as role for consistency
    };
    
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };