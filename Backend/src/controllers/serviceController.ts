import { Request, Response } from 'express';
import pool from '../config/db';

// 1. CREATE SERVICE API
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title, slug, shortDescription, fullDescription,
      featuredImage, galleryImages, benefits, features,
      faq, seoTitle, seoDescription, seoKeywords, status
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO services 
      (title, slug, shortDescription, fullDescription, featuredImage, galleryImages, benefits, features, faq, seoTitle, seoDescription, seoKeywords, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, slug, shortDescription, fullDescription, featuredImage,
        JSON.stringify(galleryImages || []),
        JSON.stringify(benefits || []),
        JSON.stringify(features || []),
        JSON.stringify(faq || []),
        seoTitle, seoDescription, seoKeywords, status
      ]
    );

    res.json({ success: true, message: 'Service completely add ho gayi bhai! 🚀' });
  } catch (error) {
    console.error("Database save error:", error);
    res.status(500).json({ success: false, message: 'Database error aaya yr!' });
  }
};

// 2. GET SERVICES API
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY createdAt DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: 'Data laane mein error aaya yr!' });
  }
};

// 3. UPDATE SERVICE API (Edit karne ke liye)
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId = req.params.id;
    const {
      title, slug, shortDescription, fullDescription,
      featuredImage, galleryImages, benefits, features,
      faq, seoTitle, seoDescription, seoKeywords, status
    } = req.body;

    const [result] = await pool.query(
      `UPDATE services SET 
      title=?, slug=?, shortDescription=?, fullDescription=?, featuredImage=?, 
      galleryImages=?, benefits=?, features=?, faq=?, seoTitle=?, seoDescription=?, seoKeywords=?, status=?
      WHERE id=?`,
      [
        title, slug, shortDescription, fullDescription, featuredImage,
        JSON.stringify(galleryImages || []),
        JSON.stringify(benefits || []),
        JSON.stringify(features || []),
        JSON.stringify(faq || []),
        seoTitle, seoDescription, seoKeywords, status,
        serviceId
      ]
    );

    res.json({ success: true, message: 'Service mast edit ho gayi bhai! 🚀' });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: 'Service update nahi hui yr!' });
  }
};

// 4. DELETE SERVICE API (Delete karne ke liye)
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId = req.params.id;
    const [result] = await pool.query('DELETE FROM services WHERE id = ?', [serviceId]);
    res.json({ success: true, message: 'Service safa-chat delete ho gayi! 🗑️' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: 'Service delete nahi hui yr!' });
  }
};