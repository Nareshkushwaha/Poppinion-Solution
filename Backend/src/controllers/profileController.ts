import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET PROFILE (Admin ki details laane ke liye)
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM profile_settings WHERE id = 1');
    if (rows.length > 0) {
      res.json({ success: true, data: rows[0] });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ success: false, message: 'Profile laane mein error aaya yr!' });
  }
};

// 2. SAVE OR UPDATE PROFILE
export const saveProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, designation, bio, photo } = req.body;

    // Ye magic query hai: Agar id 1 nahi hai toh banayegi, agar hai toh update kar degi
    const query = `
      INSERT INTO profile_settings (id, name, email, phone, designation, bio, photo)
      VALUES (1, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      email = VALUES(email),
      phone = VALUES(phone),
      designation = VALUES(designation),
      bio = VALUES(bio),
      photo = VALUES(photo)
    `;

    await pool.query(query, [name, email, phone, designation, bio, photo]);

    res.json({ success: true, message: 'Profile ekdum mast update ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Save profile error:", error);
    res.status(500).json({ success: false, message: 'Profile save nahi hua yr!' });
  }
};