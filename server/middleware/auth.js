import JWT from 'jsonwebtoken'
import User from "../models/User.js"

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ success: false, message: "not authorized" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET); // ✅ verify instead of decode
    req.user = await User.findById(decoded.id).select("-password"); // ✅ use decoded.id
    next();
  } catch (error) {
    return res.json({ success: false, message: "not authorized" });
  }
};
