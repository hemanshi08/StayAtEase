// middleware/roleMiddleware.js
exports.requireRole = (expectedRole) => {
    return (req, res, next) => {
      const actualRole = req.user.role || req.user.userType;
  
      if (actualRole !== expectedRole) {
        return res.status(403).json({ error: "Access denied" });
      }
  
      next();
    };
  };
  
  
  