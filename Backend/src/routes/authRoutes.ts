import { Router } from 'express';
import { login, signup, checkAdmins } from '../controllers/authController';

const router = Router();

router.get('/check-admins', checkAdmins); 
router.post('/signup', signup);
router.post('/login', login);

export default router;