import express from 'express';
import { register, login, logout, isAuthenticated } from '../controller/authController.js';
// import { register} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/authenticated', isAuthenticated)

export default router;
