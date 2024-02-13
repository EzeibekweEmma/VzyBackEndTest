import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

export default auth;
