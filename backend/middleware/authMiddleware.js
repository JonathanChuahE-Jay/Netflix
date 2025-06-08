const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
