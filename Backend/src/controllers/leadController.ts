import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET ALL LEADS (Admin panel ke liye)
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY createdAt DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch leads error:", error);
    res.status(500).json({ success: false, message: 'Leads laane mein error aaya yr!' });
  }
};

// 2. CREATE A NEW LEAD (Ye tumhari Main Website use karegi)
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, service, message } = req.body;

    const [result] = await pool.query(
      `INSERT INTO leads (name, email, phone, service, message, status) 
      VALUES (?, ?, ?, ?, ?, 'new')`,
      [name, email, phone, service, message]
    );

    res.json({ success: true, message: 'Message successfully sent! 🚀' });
  } catch (error) {
    console.error("Save lead error:", error);
    res.status(500).json({ success: false, message: 'Lead save nahi hui yr!' });
  }
};

// 3. UPDATE LEAD STATUS (Admin panel se mark as read/replied karne ke liye)
export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const leadId = req.params.id;
    const { status } = req.body; // 'new', 'read', ya 'replied'

    const [result] = await pool.query(
      `UPDATE leads SET status=? WHERE id=?`,
      [status, leadId]
    );

    res.json({ success: true, message: 'Status update ho gaya!' });
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(500).json({ success: false, message: 'Status update nahi hua yr!' });
  }
};

// 4. DELETE LEAD
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const leadId = req.params.id;
    const [result] = await pool.query('DELETE FROM leads WHERE id = ?', [leadId]);
    res.json({ success: true, message: 'Lead delete ho gayi! 🗑️' });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(500).json({ success: false, message: 'Lead delete nahi hui yr!' });
  }
};