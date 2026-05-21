import { Router } from 'express';
import TeamController from '../controllers/teamController';

const router = Router();
const teamController = new TeamController();

router.post('/teams', teamController.createTeam.bind(teamController));
router.get('/teams/:id', teamController.getTeam.bind(teamController));
router.put('/teams/:id', teamController.updateTeam.bind(teamController));

export default function setRoutes(app) {
    app.use('/api', router);
}