import express from 'express';
import { create, getTeam, getTeams } from '../controllers/team.js';

const router = express.Router();

// CREATE TEAM
router.post("/create", create);

// GET TEAMS
router.get("/", getTeams);

// GET TEAM
router.get("/:id", getTeam);

export default router;