import express from 'express';
import { getProfile, saveProfile } from '../controllers/profileController';
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

// Profile ka data dekhna aur save karna dono locked hain
router.get('/:email', verifyToken, getProfile);
router.post('/update', verifyToken, saveProfile);

export default router;