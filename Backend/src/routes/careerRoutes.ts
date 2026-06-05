import express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/careerController';
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.get('/', getJobs); // Main website ke liye public
router.post('/', verifyToken, createJob);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);

export default router;