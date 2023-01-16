import express from 'express';
import { login, signup, logout } from '../controllers/auth.js';

const router = express.Router();

// CREATE A USER
router.post('/signup', signup);

// SIGN IN
router.post('/login', login);

// LOGOUT
router.get('/logout', logout);

export default router;