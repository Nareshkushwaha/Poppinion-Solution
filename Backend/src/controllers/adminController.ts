import { Request, Response } from 'express';
import { AdminModel } from '../models/AdminModel';

// Profile fetch karne ke liye (Login hone ke baad)
export const getProfile = async (req: any, res: Response): Promise<void> => {
  try {
    // Auth middleware se email aayega
    const email = req.user.email; 
    const rows = await AdminModel.getByEmail(email);

    if (rows && rows.length > 0) {
      res.json({ success: true, data: rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Profile nahi mila!' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error aaya yr!' });
  }
};

// Profile update karne ke liye
export const saveProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, phone, designation, bio, photo } = req.body;
    const email = req.user.email; 

    await AdminModel.updateProfile(name, phone, designation, bio, photo, email);
    res.json({ success: true, message: 'Profile update ho gaya! 🚀' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Save nahi hua yr!' });
  }
};