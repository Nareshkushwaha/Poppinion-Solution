import express from 'express';
import { getLeads, createLead, updateLeadStatus, deleteLead } from '../controllers/leadController';

const router = express.Router();

router.get('/', getLeads);
router.post('/', createLead); // Main website is par POST request bhejegi
router.put('/:id/status', updateLeadStatus); // Status update ka route
router.delete('/:id', deleteLead);

export default router;