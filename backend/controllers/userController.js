const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const auth = require('../middlewares/auth')
const models = require('../models')
const User = models.User
dotenv.config()

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(err => res.status(500).json({ err }))
}

exports.signup = (req, res, next) => {
  bcrypt /* hashage du mots de passe - Promise */
    .hash(req.body.password, 10)
    .then(hash => {
      const newUser = User.create({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: false
      })
        .then(user => {
          res.json(user)
        })
        .catch(err => {
          res.status(500).json({ err })
        })
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    /* Check la presence de l'email et pass */
    if (!email || !password) {
        res.status(400).json({error: 'Paramétre(s) manquant(s)'})
    }

    User.findOne({ where: { email:  email }})
    .then(user => {
        /* Check si le user a ete trouvé */
        if (!user || user == null) {
            res.status(400).json({ error : 'Email non valide'})
        }
      bcrypt
      .compare( password, user.password)
      .then(validation => {
          console.log(validation) /* TESTING ! */
        if (validation != true) {
          return res.status(401).json({ error: 'Mot de passe incorrect' })
        }

        res.status(200).json({
            /* Voir avec le FRONT pour savoir qui en faire (envoyer dans le header des req et/ou params) */
          token: jwt.sign({ userId: user._id }, process.env.ILOVESALT, {
            expiresIn: '24h'
          })
        })
      })
      .catch(error => res.status(500).json({ error:'A' }))
    })
    .catch(error => res.status(500).json({ error:'B' }))
  
}



exports.updateUserProfil = (req, res, next) => {
console.log(req.headers)
    User.findByPk(req.headers.userid)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.json({ err })
    })
}


exports.findOne = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.json({ err })
    })
}

exports.findByEmail = (req, res, next) => {
  User.findOne({ where: { email: req.params.email } }).then(user => {
    res.json({ user }).catch(err => {
      res.json({ err })
    })
  })
}
