import express from 'express'
import { createPost, getPosts } from "../controllers/post.js"
const router = express.Router();
router.post("/create", createPost)
router.get("/near", getPosts)
export default router;