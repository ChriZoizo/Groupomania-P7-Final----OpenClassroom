/* Importation des modules */
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const commentController = require('../controllers/commentController')

router.get('/', auth, commentController.getAllComments)
router.get('/:id', auth, commentController.getOneComment)

router.post('/', auth, commentController.createComment)
router.put('/:id', auth, commentController.updateComment)

router.delete('/:id', auth, commentController.deleteComment)
module.exports = router