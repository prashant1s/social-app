const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "No token" });

  const token = header.split(" ")[1];
//qweeeerrt
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username }
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
