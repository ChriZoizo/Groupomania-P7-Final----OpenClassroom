/* Importation des modules */
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth') /*  Authorize */
const multer = require('../middlewares/multer-config') /*  Multer */

const postController = require('../controllers/postController') /* Post Controller */

router.get('/', auth, postController.getAllPosts) /* GET get all Post */
router.get('/:id', auth, postController.getOnePost) /* GET get one Post */

router.post('/', auth, multer, postController.createPost) /*  POST Create Post */
router.put('/:id', auth, multer, postController.updatePost) /*  PUT Update Post */
 
router.delete('/:id', auth, postController.deletePost) /* DELETE Delete Post */

router.post('/like', auth, postController.likeOrDislikePost) /*  POST Like and Dislike Post */

router.get('/author/:id', auth, postController.findByAuthor) /* GET Find By Author */

module.exports = router