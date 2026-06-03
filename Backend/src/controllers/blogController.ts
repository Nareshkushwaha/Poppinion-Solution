import { Request, Response } from 'express';
import pool from '../config/db';

// 1. GET ALL BLOGS
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM blogs ORDER BY createdAt DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch blog error:", error);
    res.status(500).json({ success: false, message: 'Blogs laane mein error aaya yr!' });
  }
};

// 2. CREATE A NEW BLOG
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title, slug, category, tags, featuredImage, content,
      metaTitle, metaDescription, keywords, status
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO blogs 
      (title, slug, category, tags, featuredImage, content, metaTitle, metaDescription, keywords, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, slug, category, JSON.stringify(tags || []), featuredImage, content,
        metaTitle, metaDescription, keywords, status
      ]
    );

    res.json({ success: true, message: 'Blog mast publish ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Save blog error:", error);
    res.status(500).json({ success: false, message: 'Blog save nahi hua yr!' });
  }
};

// 3. UPDATE BLOG (EDIT)
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogId = req.params.id;
    const {
      title, slug, category, tags, featuredImage, content,
      metaTitle, metaDescription, keywords, status
    } = req.body;

    const [result] = await pool.query(
      `UPDATE blogs SET 
      title=?, slug=?, category=?, tags=?, featuredImage=?, content=?, 
      metaTitle=?, metaDescription=?, keywords=?, status=?
      WHERE id=?`,
      [
        title, slug, category, JSON.stringify(tags || []), featuredImage, content,
        metaTitle, metaDescription, keywords, status, blogId
      ]
    );

    res.json({ success: true, message: 'Blog mast edit ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ success: false, message: 'Blog update nahi hua yr!' });
  }
};

// 4. DELETE BLOG
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogId = req.params.id;
    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [blogId]);
    res.json({ success: true, message: 'Blog safa-chat delete ho gaya! 🗑️' });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ success: false, message: 'Blog delete nahi hua yr!' });
  }
};