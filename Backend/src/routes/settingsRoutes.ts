import express from 'express';
import { getSettings, saveSettings } from '../controllers/settingsController';
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.get('/', getSettings); // Main website (Header/Footer) ko data chahiye toh public
router.post('/', verifyToken, saveSettings); // Save sirf admin karega

export default router;