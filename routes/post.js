import express from 'express'
import { createPost, getPosts } from "../controllers/post.js"
import { jwtAuth, validation } from '../middleware/validator.js';
import { Validator } from "express-json-validator-middleware";
import { post, near } from "../json-schema/post.js"

const router = express.Router();
const { validate } = new Validator();
router.post("/create", validate({ body: post }), validation, createPost)
router.post("/near", validate({ body: near }), validation, getPosts)

export default router;

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post managing API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - coords
 *       properties:
 *         title:
 *           type: string
 *           description: title of the post
 *         coords:
 *           type: array
 *           description: latitude,longitude
 *         image:
 *             type: string
 *             description: base64 converted image string   
 *       example:
 *          title: new post
 *          coords: [-73.9667, 40.78]
 *          image: /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhMSEhIVFRUXExoYGBcYGBgYFxUWFRUYHxcVFRcYH
 *                   
 */
/**
 * @swagger
 * components:
 *     schemas:
 *          PostDetails:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the post
 *                  coords:
 *                      type: array
 *                      description: latitude,longitude
 *                  image:
 *                      type: string
 *                      description: base64 converted image string
 *              example:
 *                  votes: []
 *                  _id: 61f127501c891617c898ce35
 *                  location:
 *                      type: Point
 *                      coordinates: [-73.9667, 40.78]
 *                  title: new post
 *                  image: /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhMSEhIVFRUXExoYGBcYGBgYFxUWFRUYHxcVFRcYH
 *                  createdAt: 2022-01-26T10:35:49.072Z
 *                  __v: 0
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Near:
 *       type: object
 *       required:
 *         - coords
 *       properties:
 *         coords:
 *           type: array
 *           description: latitude,longitude
 *         minD:
 *             type: number
 *             description: minimum distance of posts to exclude (in metres) default=0 
 *         maxD:
 *           type: number
 *           description: maximum distance of posts (in metres) default=20000
 *       example:
 *          coords: [-73.9667, 40.78]
 *          minD: 0
 *          maxD: 20000 
 *                   
 */
/**
 *  @swagger
 *  /post/create:
 *      post:
 *          summary: Creates a new post
 *          tags: [Post]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          responses:
 *              200:
 *                  description: created post
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/PostDetails'
 *              400:
 *                  description: Bad request
 * */
/**
 *  @swagger
 *  /post/near:
 *      post:
 *          summary: Fetches nearby posts sorted by distance
 *          tags: [Post]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Near'
 *          responses:
 *              200:
 *                  description: Fetched posts sorted by distance
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/PostDetails'
 *              400:
 *                  description: Bad request
 * */