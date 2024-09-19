import jwt from 'jsonwebtoken';
import { env } from '../configs/evironment.js';
export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (header && header.startsWith('Bearer ')) {
        const accessToken = header.split(' ')[1];

        if (!accessToken) throw new Error('No Access Token')
        try {
            const decoled = jwt.verify(accessToken, env.SECRET_KEY)

            if (!decoled) throw new Error("Verify Failed")
            next();
        } catch (error) {
            res.status(401).json({ message: error });

        }

    } else {
        // Nếu không có token hoặc token không hợp lệ, trả về lỗi 401
        res.status(401).json({ message: 'No token provided or token is invalid.' });
    }
};
