import express from 'express'
import { commentDownvote, commentUpvote, createCommentOnPost, createPost, createReply, delCommentController, editComment, getAllComments, getPosts, getSavedPosts, postDownvote, postUpvote } from "../controllers/post.js"
import { jwtAuth, validation } from '../middleware/validator.js';
import { Validator } from "express-json-validator-middleware";
import { post, near, comment, reply, getComments, delComment, vote, getPostsSchema } from "../json-schema/post.js"
import { commentAuthorisation } from '../middleware/comment.js';

const router = express.Router();
const { validate } = new Validator();

router.post("/create", validate({ body: post }), validation, jwtAuth, createPost)
router.post("/near", validate({ body: near }), validation, jwtAuth, getPosts)
router.post("/getComments", validate({ body: getComments }), validation, jwtAuth, getAllComments)
router.post("/createComment", validate({ body: comment }), validation, jwtAuth, createCommentOnPost)
router.post("/createReply", validate({ body: reply }), validation, jwtAuth, createReply)
router.patch("/comment/edit", validate({ body: reply }), validation, jwtAuth, commentAuthorisation, editComment)
router.delete("/comment/delete", validate({ body: delComment }), validation, jwtAuth, commentAuthorisation, delCommentController)
router.post("/upvote", validate({ body: vote }), validation, jwtAuth, postUpvote)
router.post("/downvote", validate({ body: vote }), validation, jwtAuth, postDownvote)
router.post("/comment/upvote", validate({ body: vote }), validation, jwtAuth, commentUpvote)
router.post("/comment/downvote", validate({ body: vote }), validation, jwtAuth, commentDownvote)
router.post("/getPosts", validate({ body: getPostsSchema }), validation, jwtAuth, getSavedPosts)
export default router;

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: The Post managing API
 */

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: The Comment managing API
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  
*/

/**
 * @swagger
 * security:
 *  - bearerAuth: []
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
 *                   
 */

/**
 * @swagger
 * components:
 *  responses:
 *      NotAuthorized:
 *          description: The requester is unauthorized.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
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
 *   schemas:
 *     CommentOnPost:
 *       type: object
 *       required:
 *         - msg
 *         - postID
 *       properties:
 *         msg:
 *           type: string
 *           description: content of the comment
 *         postID:
 *           type: string
 *           description: id of the post being commented on   
 *       example:
 *          msg: F
 *          postID: 61f77a6dd026f91cfd499ba4
 *                   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reply:
 *       type: object
 *       required:
 *         - msg
 *         - commentID
 *       properties:
 *         msg:
 *           type: string
 *           description: content of the comment
 *         commentID:
 *           type: string
 *           description: id of the comment being replied to   
 *       example:
 *          msg: F 
 *          commentID: 61f79165a81d8041b42a599c
 *                   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Del:
 *       type: object
 *       required:
 *         - commentID
 *       properties:
 *         commentID:
 *           type: string
 *           description: id of the comment being deleted 
 *       example:
 *          commentID: 61f79165a81d8041b42a599c
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
 *                  comments:
 *                      type: array
 *                      description:
 *                          top level comments on the post
 *                  upvotes:
 *                      type: array
 *                      description: array of upvote ids
 *                  downvotes:
 *                      type: array
 *                      description: array of downvote ids
 *              example:
 *                  upvotes: []
 *                  downvotes: []
 *                  _id: 61f127501c891617c898ce35
 *                  location:
 *                      type: Point
 *                      coordinates: [-73.9667, 40.78]
 *                  title: new post
 *                  image: /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhMSEhIVFRUXExoYGBcYGBgYFxUWFRUYHxcVFRcYH
 *                  createdAt: 2022-01-26T10:35:49.072Z
 *                  comments: ["61f79165a81d8041b42a599c"]
 *                  __v: 0
 */

/**
 * @swagger
 * components:
 *     schemas:
 *          CommentDetails:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      description: content of the comment
 *                  comments:
 *                      type: array
 *                      description: replies
 *                  userID:
 *                      type: string
 *                      description: id of commentor
 *                  topID:
 *                      type: string
 *                      description: id of top could be post or comment
 *                  topType: 
 *                      type: string
 *                      description: top type post or comment
 *                  upvotes:
 *                      type: array
 *                      description: array of upvote ids
 *                  downvotes:
 *                      type: array
 *                      description: array of downvote ids 
 *              example:
 *                  comments: []
 *                  _id: 61f79387c88ee324d8950f8d
 *                  message: F
 *                  upvotes: ["61f11b6dca7a2a49c4e3fb30"]
 *                  downvotes: ["61f11b6dca7a2a49c4e3fb30"]
 *                  userID: 61f11b6dca7a2a49c4e3fb30
 *                  topID: 61f79165a81d8041b42a599c
 *                  topType: comment
 *                  createdAt: 2022-01-31T07:45:11.331Z
 *                  __v: 0
 */

/**
 * @swagger
 * components:
 *     schemas:
 *          getComments:
 *              type: object
 *              required: 
 *                  - comments
 *              properties:
 *                  comments:
 *                      type: array
 *                      description: comment id array            
 *              example:
 *                  comments: ["61f79165a81d8041b42a599c"]
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
 *         lim:
 *             type: number
 *             description: number of posts fetched (min=1,max=10,default=5) 
 *         skipTo:
 *           type: number
 *           description: skip this number of posts , to be used in conjunction with lim (min=0)
 *       example:
 *          coords: [-73.9667, 40.78]
 *          minD: 0
 *          maxD: 20000 
 *          lim: 5
 *          skipTo: 0
 *                   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GetPosts:
 *       type: object
 *       required:
 *         - postIDS
 *       properties:
 *         postIDS:
 *           type: array
 *           description: array of ids of posts to fetch
 *         lim:
 *             type: number
 *             description: number of posts fetched (min=1,max=10,default=5) 
 *         skipTo:
 *           type: number
 *           description: skip this number of posts , to be used in conjunction with lim (min=0)
 *       example:
 *          postIDS: [61f79165a81d8041b42a599c]
 *          lim: 5
 *          skipTo: 0
 *                   
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - voteID
 *       properties:
 *         voteID:
 *           type: string
 *           description: post or comment id to vote on
 *       example:
 *          voteID: 61f79165a81d8041b42a599c
 *                   
 */


/**
 *  @swagger
 *  /post/create:
 *      post:
 *          security:
 *              - bearerAuth: []
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
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  post:
 *                                      type: object
 *                                      $ref: '#/components/schemas/PostDetails'
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized'
 * */

/**
 *  @swagger
 *  /post/near:
 *      post:
 *          security:
 *              - bearerAuth: []
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
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  posts:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/PostDetails'
 *                                     
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized'
 * */

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
 *          security:
 *              - bearerAuth: []
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
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  post:
 *                                      type: object
 *                                      $ref: '#/components/schemas/PostDetails'
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/createComment:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: creates comment on post
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CommentOnPost'
 *          responses:
 *              200:
 *                  description: created comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  post:
 *                                      type: object
 *                                      $ref: '#/components/schemas/PostDetails'
 *                                     
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized'
 * */

/**
 *  @swagger
 *  /post/createReply:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: creates reply on a comment
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reply'
 *          responses:
 *              200:
 *                  description: created comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  reply:
 *                                      type: object
 *                                      $ref: '#/components/schemas/CommentDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/getComments:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: gets comments from an array of comment ids
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getComments'
 *          responses:
 *              200:
 *                  description: comments
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  comments:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/CommentDetails'      
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/comment/edit:
 *      patch:
 *          security:
 *              - bearerAuth: []
 *          summary: edits a comment
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reply'
 *          responses:
 *              200:
 *                  description: updated comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  comment:
 *                                      type: object
 *                                      $ref: '#/components/schemas/CommentDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized'
 * */

/**
 *  @swagger
 *  /post/comment/delete:
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          summary: deletes a comment (changes msg to Deleted)
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Del'
 *          responses:
 *              200:
 *                  description: updated comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  comment:
 *                                      type: object
 *                                      $ref: '#/components/schemas/CommentDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/comment/upvote:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: adds or removes an upvote on a comment
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Vote'
 *          responses:
 *              200:
 *                  description: upvote 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  comment:
 *                                      type: object
 *                                      $ref: '#/components/schemas/CommentDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/comment/downvote:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: adds or removes a downvote on a comment
 *          tags: [Comment]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Vote'
 *          responses:
 *              200:
 *                  description: upvote 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  comment:
 *                                      type: object
 *                                      $ref: '#/components/schemas/CommentDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/upvote:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: adds or removes an upvote on a post
 *          tags: [Post]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Vote'
 *          responses:
 *              200:
 *                  description: upvote 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  post:
 *                                      type: object
 *                                      $ref: '#/components/schemas/PostDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/downvote:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: adds or removes a downvote on a post
 *          tags: [Post]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Vote'
 *          responses:
 *              200:
 *                  description: upvote 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  post:
 *                                      type: object
 *                                      $ref: '#/components/schemas/PostDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */

/**
 *  @swagger
 *  /post/getPosts:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: get posts from an array of postids
 *          tags: [Post]
 *          requestBody:
 *              required : true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetPosts'
 *          responses:
 *              200:
 *                  description: fetched posts 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  code:
 *                                      type: integer
 *                                      example: 200
 *                                  posts:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/PostDetails'                   
 * 
 *              400:
 *                  description: Bad request
 *              401:
 *                   $ref: '#/components/responses/NotAuthorized' 
 * */