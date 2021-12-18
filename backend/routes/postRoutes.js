/* Importation des modules */
const express = require('express')
/* const { user } = require('../../../../P7_boyer_christopher/backend/config/db.config') */
const router = express.Router()
const postController = require('../controllers/postController')

router.get('/', postController.getAllPosts)
router.get('/:id', postController.getOnePost)
router.post('/:id', postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.post('/:id/like', postController.likeOrDislikePost)
router.post('/:id/vote', postController.upvotePost)

module.exports = router