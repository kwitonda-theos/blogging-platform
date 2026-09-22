import { Router } from "express";
import { validatePost } from '../middleware/validate.js'
import { createPost,getAllPosts,getPost,updatePost,deletePost} from '../controllers/postsController.js'

const router = Router()

router.post('/', validatePost, createPost)
router.get('/',getAllPosts)
router.get('/:id', getPost)
router.put('/:id',validatePost,updatePost)
router.delete('/:id',deletePost)

export default router 