import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "MeraSecretKey123!@#";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer TOKEN" format

  if (!token) {
    res.status(401).json({ success: false, message: 'Access Denied! Pehle login karo yr.' });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as any).user = verified; // User ka data request mein daal diya
    next(); // Sab theek hai, aage jane do
  } catch (error) {
    res.status(403).json({ success: false, message: 'Token expire ho gaya ya galat hai!' });
  }
};