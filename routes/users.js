import express from 'express'
import { jwtAuth, validation } from '../middleware/validator.js';
import { Validator } from "express-json-validator-middleware";
import { login, signup , home } from '../controllers/users.js';
import { loginSchema, signupSchema } from "../json-schema/user.js";

const router = express.Router();
const { validate } = new Validator();
router.post('/login', validate({ body: loginSchema }), validation, login)
router.post('/signup', validate({ body: signupSchema }), validation, signup)
router.post('/home', jwtAuth, home)

export default router;