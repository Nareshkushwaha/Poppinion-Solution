import express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { verifyToken } from '../middlewares/authMiddleware'; 
const router = express.Router();

// Route ke beech mein 'verifyToken' laga diya
router.get('/', verifyToken, getBlogs);
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

export default router;