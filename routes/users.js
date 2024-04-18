import express from 'express'
import { jwtAuth, validation } from '../middleware/validator.js';
import { Validator } from "express-json-validator-middleware";
import { login, signup, home, saveComment, savePost } from '../controllers/users.js'
import { loginSchema, signupSchema } from "../json-schema/user.js";
import { save } from "../json-schema/post.js"
const router = express.Router();
const { validate } = new Validator();

router.post('/login', validate({ body: loginSchema }), validation, login)
router.post('/signup', validate({ body: signupSchema }), validation, signup)
router.post('/home', jwtAuth, home)
router.post('/saveComment', validate({ body: save }), validation, jwtAuth, saveComment)
router.post('/savePost', validate({ body: save }), validation, jwtAuth, savePost)
export default router;


/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */

/**
 * @swagger
 * security:
 *  - bearerAuth: []
 */

/**
 * @swagger
 * components:
 *  responses:
 *       NotAuthorized:
 *          description: The requester is unauthorized.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *       NotFound:
 *          description: Resource not found
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Notfound'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: status code
 *         message:
 *           type: string
 *           description: jwt error message   
 *       example:
 *          code: 401 
 *          message: jwt must be provided 
 *     Notfound:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: status code
 *         message:
 *           type: string
 *           description: Resource not found  
 *       example:
 *          code: 404 
 *          message: User not found
 *          
 *                                   
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
 *             savedPosts: [61f11b6dca7a2a49c4e3fb32]
 *             savedComments: [61f11b6dca7a2a49c4e3fb31]  
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxZjExYjZkY2E3YTJhNDljNGUzZmIzMCIsImVtYWlsIjoic2FyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJFhNTjU5SkVsdVBibFR5QzRxUURId094STZjYXZ1ME0vbjhJQk5iRG9nSG5iQVN1NDNuUWI2IiwiY3JlYXRlZEF0IjoiMjAyMi0wMS0yNlQwOTo1OTowOS40MzdaIiwiX192IjowfSwiaWQiOiI2MWYxMWI2ZGNhN2EyYTQ5YzRlM2ZiMzAiLCJpYXQiOjE2NDMxOTE1NjYsImV4cCI6MTY0NTg2OTk2Nn0.zkXeirHZuxKgWCN8DiRGRnHmyaOrOlvCRaIGELENoTY
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Save:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: id of resource to save
 *       example:
 *         id: 61f11b6dca7a2a49c4e3fb30
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SavePostResponse:
 *       type: object
 *       properties:
 *         id:
 *           code: number
 *           description: status code
 *         savedPosts:
 *           type: array
 *           description: array of ids of saved posts
 *       example:
 *         code: 200
 *         savedPosts: ["61f79165a81d8041b42a599c"] 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SaveCommentResponse:
 *       type: object
 *       properties:
 *         id:
 *           code: number
 *           description: status code
 *         savedComments:
 *           type: array
 *           description: array of ids of saved comments
 *       example:
 *         code: 200
 *         savedComments: ["61f79165a81d8041b42a599c"] 
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

/**
 *  @swagger
 *  /saveComment:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: Returns the saved comment array 
 *          tags: [User]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Save'
 *          responses:
 *              200:
 *                  description: saved comments array
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/SaveCommentResponse'
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized'
 *              404:
 *                  $ref: '#/components/responses/NotFound'
 * */

/**
 *  @swagger
 *  /savePost:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: Returns the saved posts array 
 *          tags: [User]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Save'
 *          responses:
 *              200:
 *                  description: saved posts array 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/SavePostResponse'
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized'
 *              404:
 *                  $ref: '#/components/responses/NotFound'
 * */