import { Request, Response } from 'express';
import { BlogModel } from '../models/BlogModel'; // Direct pool.query nahi, Model use karenge

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows = await BlogModel.getAll();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch blog error:", error);
    res.status(500).json({ success: false, message: 'Blogs laane mein error aaya yr!' });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    await BlogModel.create(req.body);
    res.json({ success: true, message: 'Blog mast publish ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Save blog error:", error);
    res.status(500).json({ success: false, message: 'Blog save nahi hua yr!' });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    // Yahan 'as string' laga diya
    const blogId = req.params.id as string;
    await BlogModel.update(blogId, req.body);
    res.json({ success: true, message: 'Blog mast edit ho gaya bhai! 🚀' });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ success: false, message: 'Blog update nahi hua yr!' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    // Yahan bhi 'as string' laga diya
    const blogId = req.params.id as string;
    await BlogModel.delete(blogId);
    res.json({ success: true, message: 'Blog safa-chat delete ho gaya! 🗑️' });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ success: false, message: 'Blog delete nahi hua yr!' });
  }
};