import express from 'express';
import { getProfile, saveProfile } from '../controllers/profileController';

const router = express.Router();

// Route 1: Get data (e.g., GET /api/profile/admin@poppinion.com)
router.get('/:email', getProfile);

// Route 2: Update data (e.g., POST /api/profile/update)
router.post('/update', saveProfile);

export default router;