import express from 'express';
import { getLeads, createLead, updateLeadStatus, deleteLead } from '../controllers/leadController';
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

// Sirf POST route public hai taaki user main website se form bhar sake
router.post('/', createLead); 

// Baaki sab admin ke liye locked
router.get('/', verifyToken, getLeads);
router.put('/:id/status', verifyToken, updateLeadStatus); 
router.delete('/:id', verifyToken, deleteLead);

export default router;