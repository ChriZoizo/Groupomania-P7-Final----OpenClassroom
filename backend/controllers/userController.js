const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')


console.log('USERCONTROLLER')


exports.getAllUsers = (req, res) => {
models.User.findAll()
.then(users => {
    console.log(users)
})
.catch(err => console.log(err))
}