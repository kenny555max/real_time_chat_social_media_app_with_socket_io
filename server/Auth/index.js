import jwt from 'jsonwebtoken';

export const middleware = (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    let decoded = jwt.verify(token, 'secret');

    if (decoded) {
        req.userId = decoded._id;
    }

    next();
}

export default middleware;