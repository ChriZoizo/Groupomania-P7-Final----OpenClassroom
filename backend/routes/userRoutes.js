/* Importation des modules */
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
console.log('USERROUTES')
router.get('/', userController.getAllUsers)

module.exports = router