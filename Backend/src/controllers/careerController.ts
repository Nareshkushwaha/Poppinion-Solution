import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET ALL JOBS
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM careers ORDER BY createdAt DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch career error:", error);
    res.status(500).json({ success: false, message: 'Jobs laane mein error aaya yr!' });
  }
};

// 2. CREATE A NEW JOB
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title, department, location, employmentType, experience, salary,
      shortDescription, fullDescription, responsibilities, requirements,
      benefits, applicationEmail, featuredImage, status
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO careers 
      (title, department, location, employmentType, experience, salary, shortDescription, fullDescription, responsibilities, requirements, benefits, applicationEmail, featuredImage, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, department, location, employmentType, experience, salary,
        shortDescription, fullDescription, 
        JSON.stringify(responsibilities || []), 
        JSON.stringify(requirements || []), 
        JSON.stringify(benefits || []), 
        applicationEmail, featuredImage, status
      ]
    );

    res.json({ success: true, message: 'Job mast post ho gayi bhai! 🚀' });
  } catch (error) {
    console.error("Save career error:", error);
    res.status(500).json({ success: false, message: 'Job save nahi hui yr!' });
  }
};

// 3. UPDATE JOB (EDIT)
export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;
    const {
      title, department, location, employmentType, experience, salary,
      shortDescription, fullDescription, responsibilities, requirements,
      benefits, applicationEmail, featuredImage, status
    } = req.body;

    const [result] = await pool.query(
      `UPDATE careers SET 
      title=?, department=?, location=?, employmentType=?, experience=?, salary=?, 
      shortDescription=?, fullDescription=?, responsibilities=?, requirements=?, 
      benefits=?, applicationEmail=?, featuredImage=?, status=?
      WHERE id=?`,
      [
        title, department, location, employmentType, experience, salary,
        shortDescription, fullDescription, 
        JSON.stringify(responsibilities || []), 
        JSON.stringify(requirements || []), 
        JSON.stringify(benefits || []), 
        applicationEmail, featuredImage, status, jobId
      ]
    );

    res.json({ success: true, message: 'Job mast edit ho gayi bhai! 🚀' });
  } catch (error) {
    console.error("Update career error:", error);
    res.status(500).json({ success: false, message: 'Job update nahi hui yr!' });
  }
};

// 4. DELETE JOB
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;
    const [result] = await pool.query('DELETE FROM careers WHERE id = ?', [jobId]);
    res.json({ success: true, message: 'Job safa-chat delete ho gayi! 🗑️' });
  } catch (error) {
    console.error("Delete career error:", error);
    res.status(500).json({ success: false, message: 'Job delete nahi hui yr!' });
  }
};