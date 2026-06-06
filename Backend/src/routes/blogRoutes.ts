import express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

// 1. PUBLIC ROUTE: Blogs dekhne ke liye kisi token ki zaroorat nahi hai
router.get('/', getBlogs);

// 2. SECURE ROUTES: Add, Edit aur Delete karne ke liye 'verifyToken' zaroori hai
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

export default router;