import express from 'express';
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController'; 
import { verifyToken } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.get('/', getServices); // Main website ke liye public
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, updateService); 
router.delete('/:id', verifyToken, deleteService); 

export default router;