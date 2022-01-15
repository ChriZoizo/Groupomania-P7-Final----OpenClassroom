/* Importation des modules */
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/signup', userController.signup) /* POST Create new User */
router.post('/login', userController.login) /* Login User Route 'login' en POST pour raison de securité (GET met en cache les données)  */

router.get('/', userController.getAllUsers) /* GET get all users */
router.get('/:id', userController.getOneUser) /* GET one user */
router.get('/findByName', userController.findByName)

router.put('/:id', userController.updateUserProfil) /* PUT modify user */
router.delete('/:id', userController.deleteUser) /* DELETE delete user */


module.exports = router