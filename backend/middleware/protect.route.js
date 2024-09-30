import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

export default protectRoute;
