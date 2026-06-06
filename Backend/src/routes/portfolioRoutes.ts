import express from 'express';
// Controller se saare functions import kar rahe hain
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/portfolioController'; 
// Token verify karne wala middleware
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

// 1. GET: Saare projects dekhne ke liye (Website aur Admin dono ke liye, isliye bina token ke)
router.get('/', getProjects); 

// 2. POST: Naya project ADD/SAVE karne ke liye (Yahan error aa raha tha, ab theek ho gaya)
router.post('/', verifyToken, createProject);

// 3. PUT: Purana project EDIT/UPDATE karne ke liye
router.put('/:id', verifyToken, updateProject); 

// 4. DELETE: Project DELETE karne ke liye
router.delete('/:id', verifyToken, deleteProject); 

export default router;