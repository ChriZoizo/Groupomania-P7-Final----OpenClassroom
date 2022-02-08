/* Importation des modules */
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

const postController = require('../controllers/postController')

router.get('/', auth, postController.getAllPosts)
router.get('/:id', auth, postController.getOnePost)

router.post('/', auth, multer, postController.createPost)
router.put('/:id', auth, multer, postController.updatePost)

router.delete('/:id', auth, postController.deletePost)

router.post('/like', auth, postController.likeOrDislikePost)

router.get('/author/:id', auth, postController.findByAuthor)

module.exports = router