import { Router, Express } from 'express';
import TeamController from '../controllers/teamController';
import authRouter from './auth';
import authMiddleware from '../middleware/auth';

const router = Router();
const teamController = new TeamController();

// Protect /teams routes with auth middleware
router.use('/teams', authMiddleware);

router.post('/teams', teamController.createTeam.bind(teamController));
router.get('/teams/:id', teamController.getTeam.bind(teamController));
router.put('/teams/:id', teamController.updateTeam.bind(teamController));

export default function setRoutes(app: Express) {
    // auth routes mounted separately
    app.use('/api/auth', authRouter);
    app.use('/api', router);
}