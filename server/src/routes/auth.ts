import { Router } from 'express';
import { register, login } from '../controllers/authController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user || null);
});

export default router;
