import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/portfolioController';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject); // <-- Delete ka naya route

export default router;