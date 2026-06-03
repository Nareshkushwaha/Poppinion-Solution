import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET ALL PORTFOLIO PROJECTS
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio ORDER BY projectOrder ASC, createdAt DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch portfolio error:", error);
    res.status(500).json({ success: false, message: 'Projects laane mein error aaya yr!' });
  }
};

// 2. CREATE A NEW PROJECT
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name, slug, category, client, shortDescription, caseStudy,
      coverImage, galleryImages, results, seoTitle, seoDescription, status, order
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO portfolio 
      (name, slug, category, client, shortDescription, caseStudy, coverImage, galleryImages, results, seoTitle, seoDescription, status, projectOrder) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, slug, category, client, shortDescription, caseStudy, coverImage,
        JSON.stringify(galleryImages || []),
        results, seoTitle, seoDescription, status, order || 0
      ]
    );

    res.json({ success: true, message: 'Project mast add ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Save portfolio error:", error);
    res.status(500).json({ success: false, message: 'Project save nahi hua yr!' });
  }
};

// 3. UPDATE PROJECT (EDIT KARNE KE LIYE)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.id; 
    const {
      name, slug, category, client, shortDescription, caseStudy,
      coverImage, galleryImages, results, seoTitle, seoDescription, status, order
    } = req.body;

    const [result] = await pool.query(
      `UPDATE portfolio SET 
      name=?, slug=?, category=?, client=?, shortDescription=?, caseStudy=?, 
      coverImage=?, galleryImages=?, results=?, seoTitle=?, seoDescription=?, status=?, projectOrder=?
      WHERE id=?`,
      [
        name, slug, category, client, shortDescription, caseStudy, coverImage,
        JSON.stringify(galleryImages || []),
        results, seoTitle, seoDescription, status, order || 0,
        projectId
      ]
    );

    res.json({ success: true, message: 'Project mast edit ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Update portfolio error:", error);
    res.status(500).json({ success: false, message: 'Project update nahi hua yr!' });
  }
};

// 4. DELETE PROJECT (NAYA FUNCTION)
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.id; // URL se ID aayegi
    const [result] = await pool.query('DELETE FROM portfolio WHERE id = ?', [projectId]);
    res.json({ success: true, message: 'Project safa-chat delete ho gaya! 🗑️' });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    res.status(500).json({ success: false, message: 'Project delete nahi hua yr!' });
  }
};