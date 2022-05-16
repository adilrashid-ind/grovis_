const jwt = require("jsonwebtoken");
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization Required" });
  }
  next();
};
exports.customMiddleware = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "manager") {
    next();
  } else {
    return res.status(400).json({ message: "Access Denied" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "admin Access Denied" });
  }
  next();
};
exports.managerMiddleware = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(400).json({ message: "manager Access Denied" });
  }
  next();
};

exports.staffMiddleware = (req, res, next, error) => {
  if (req.user.role !== "staff") {
    return res.status(400).json({ error });
  }
  next();
};
