import { Request, Response } from 'express';
import { AdminModel } from '../models/AdminModel';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Yahan 'as string' laga diya taaki TS ko confirm ho jaye
    const email = req.params.email as string;

    const rows: any[] = await AdminModel.getByEmail(email);

    if (rows && rows.length > 0) {
      res.json({ success: true, data: rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Profile nahi mila yr!' });
    }
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ success: false, message: 'Profile laane mein error aaya yr!' });
  }
};

export const saveProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, designation, bio, photo, originalEmail } = req.body;

    // Yahan bhi originalEmail ko 'as string' kar diya
    const result: any = await AdminModel.updateProfile(
      name as string, 
      phone as string, 
      designation as string, 
      bio as string, 
      photo as string, 
      originalEmail as string
    );

    if (result && result.affectedRows > 0) {
      res.json({ success: true, message: 'Profile ekdum mast update ho gaya bhai! 🚀' });
    } else {
      res.status(404).json({ success: false, message: 'Admin email match nahi hua!' });
    }
  } catch (error) {
    console.error("Save profile error:", error);
    res.status(500).json({ success: false, message: 'Profile save nahi hua yr!' });
  }
};