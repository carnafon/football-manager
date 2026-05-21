"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = __importDefault(require("../controllers/teamController"));
const router = (0, express_1.Router)();
const teamController = new teamController_1.default();
router.post('/teams', teamController.createTeam.bind(teamController));
router.get('/teams/:id', teamController.getTeam.bind(teamController));
router.put('/teams/:id', teamController.updateTeam.bind(teamController));
function setRoutes(app) {
    app.use('/api', router);
}
exports.default = setRoutes;
