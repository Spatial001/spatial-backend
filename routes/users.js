import express from 'express'
import { jwtAuth, validation } from '../middleware/validator.js';
import { login, signup , home } from '../controllers/users.js'
const router = express.Router();
router.post('/login', login)
router.post('/signup', signup)
router.post('/home', jwtAuth, home)
export default router;