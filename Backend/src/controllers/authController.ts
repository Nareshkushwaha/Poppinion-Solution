import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || "MeraSecretKey123!@#";

// NAYI API: Check karne ke liye ki koi admin hai ya nahi
export const checkAdmins = async (req: Request, res: Response): Promise<any> => {
    try {
        const [rows]: any = await pool.query('SELECT COUNT(*) as count FROM admins');
        const exists = rows[0].count > 0;
        res.json({ success: true, exists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Database error" });
    }
};

export const signup = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;

    try {
        // SECURITY LOCK: Check karo ki kya pehle se koi admin exist karta hai?
        const [adminCount]: any = await pool.query('SELECT COUNT(*) as count FROM admins');
        if (adminCount[0].count > 0) {
            return res.status(403).json({ 
                success: false, 
                message: "System locked! Ek admin pehle se majood hai. Naya account nahi ban sakta." 
            });
        }

        const [existingUsers]: any = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ success: false, message: "Ye email pehle se use ho chuka hai!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result]: any = await pool.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        
        const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '1d' });
        
        res.json({ success: true, message: "Pehla Admin Account ban gaya!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error aa gaya yr" });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const [users]: any = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ success: false, message: "Galat email ya password!" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Galat email ya password!" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        
        res.json({ success: true, message: "Login successful!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error aa gaya yr" });
    }
};