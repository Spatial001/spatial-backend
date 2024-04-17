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
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password with at least one capital letter, one number, one special char,one small letter and at least 8 chars long
 *       example:
 *         email: sar@gmail.com
 *         password: Test@pass0 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetails:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password with at least one capital letter, one number, one special char,one small letter and at least 8 chars long          
 *       example:
 *         result:
 *             _id: 61f11b6dca7a2a49c4e3fb30  
 *             email: sar@gmail.com
 *             password: hashedPassword
 *             createdAt: 2022-01-26T09:59:09.437Z
 *             __v : 0 
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxZjExYjZkY2E3YTJhNDljNGUzZmIzMCIsImVtYWlsIjoic2FyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJFhNTjU5SkVsdVBibFR5QzRxUURId094STZjYXZ1ME0vbjhJQk5iRG9nSG5iQVN1NDNuUWI2IiwiY3JlYXRlZEF0IjoiMjAyMi0wMS0yNlQwOTo1OTowOS40MzdaIiwiX192IjowfSwiaWQiOiI2MWYxMWI2ZGNhN2EyYTQ5YzRlM2ZiMzAiLCJpYXQiOjE2NDMxOTE1NjYsImV4cCI6MTY0NTg2OTk2Nn0.zkXeirHZuxKgWCN8DiRGRnHmyaOrOlvCRaIGELENoTY
 */
/**
 *  @swagger
 *  /login:
 *      post:
 *          summary: Returns the logged in user details with access token
 *          tags: [User]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: logged in user details with access token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserDetails'
 *              404:
 *                  description: User not found
 *              400:
 *                  description: Invalid Password or Bad request
 * */
/**
 *  @swagger
 *  /signup:
 *      post:
 *          summary: Returns the signed up user details with access token
 *          tags: [User]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: logged in user details with access token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserDetails'
 *              404:
 *                  description: User not found
 *              400:
 *                  description: Invalid Password or Bad request
 * */
