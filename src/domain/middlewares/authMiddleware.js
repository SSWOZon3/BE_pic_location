import jwt from "jsonwebtoken";
import { getUserById } from "../repository/userRepository.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // TODO: env variable secret key
    const tokenDecoded = jwt.verify(token, 'random_private_key');

    const user = await getUserById(tokenDecoded._id);
    req.user = user;

    next();
} 