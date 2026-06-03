import express from 'express';
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController'; 

const router = express.Router();

router.get('/', getServices);
router.post('/', createService);
router.put('/:id', updateService); // <-- Edit karne ka route
router.delete('/:id', deleteService); // <-- Delete karne ka route

export default router;