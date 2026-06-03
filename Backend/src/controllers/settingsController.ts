import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET SETTINGS
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM website_settings WHERE id = 1');
    if (rows.length > 0) {
      // MySQL booleans ko 1 or 0 mein deta hai, usko true/false mein badal rahe hain
      const settings = {
        ...rows[0],
        maintenance: rows[0].maintenance === 1,
        analytics: rows[0].analytics === 1,
      };
      res.json({ success: true, data: settings });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (error) {
    console.error("Fetch settings error:", error);
    res.status(500).json({ success: false, message: 'Settings laane mein error aaya yr!' });
  }
};

// 2. SAVE OR UPDATE SETTINGS (Upsert)
export const saveSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { siteName, siteUrl, maintenance, analytics } = req.body;

    const query = `
      INSERT INTO website_settings (id, siteName, siteUrl, maintenance, analytics)
      VALUES (1, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      siteName = VALUES(siteName),
      siteUrl = VALUES(siteUrl),
      maintenance = VALUES(maintenance),
      analytics = VALUES(analytics)
    `;

    // true/false ko wapas 1/0 banakar save karenge
    await pool.query(query, [siteName, siteUrl, maintenance ? 1 : 0, analytics ? 1 : 0]);

    res.json({ success: true, message: 'Website settings mast save ho gayi bhai! 🚀' });
  } catch (error) {
    console.error("Save settings error:", error);
    res.status(500).json({ success: false, message: 'Settings save nahi hui yr!' });
  }
};