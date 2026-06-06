import express from 'express';
import { getProfile, saveProfile } from '../controllers/adminController';
import { verifyToken } from '../middlewares/authMiddleware'; // Tumhare paas ye middleware hona chahiye

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, saveProfile);

export default router;