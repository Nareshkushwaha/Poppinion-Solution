import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET ALL LEADS
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    // Column name ab 'created_at' hai
    const [rows]: any = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch leads error:", error);
    res.status(500).json({ success: false, message: 'Leads laane mein error aaya yr!' });
  }
};

// 2. CREATE A NEW LEAD
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, service, message } = req.body;
    await pool.query(
      `INSERT INTO leads (name, email, phone, service, message, status) VALUES (?, ?, ?, ?, ?, 'new')`,
      [name, email, phone, service, message]
    );
    res.json({ success: true, message: 'Message successfully sent! 🚀' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lead save nahi hui yr!' });
  }
};

// 3. UPDATE LEAD STATUS
export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const leadId = req.params.id as string;
    const { status } = req.body;
    await pool.query(`UPDATE leads SET status=? WHERE id=?`, [status, leadId]);
    res.json({ success: true, message: 'Status update ho gaya!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Status update nahi hua yr!' });
  }
};

// 4. DELETE LEAD
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const leadId = req.params.id as string;
    await pool.query('DELETE FROM leads WHERE id = ?', [leadId]);
    res.json({ success: true, message: 'Lead delete ho gayi! 🗑️' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lead delete nahi hui yr!' });
  }
};