/* Importation des modules */
const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth') /* Authorize */

const commentController = require('../controllers/commentController') /* Controller Comment */

/* Get All (GET) */
router.get('/', commentController.getAllComments)
/* Get One (GET) */
router.get('/:id', auth, commentController.getOneComment)
/* Create (POST) */
router.post('/', auth, commentController.createComment)
/* Update (PUT) */
router.put('/:id', auth, commentController.updateComment)
/* Delete (DELETE) */
router.delete('/:id', auth, commentController.deleteComment)

module.exports = router
