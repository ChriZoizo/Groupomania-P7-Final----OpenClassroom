/* Importation des modules */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const auth = require('../middlewares/auth')
const models = require('../models')

/* Importation de la table 'User' de la BDD */
const User = models.User

/* ---------------------------------- Fonctions C R U D --------------------------------------*/
/* GET ALL USERS (GET)
Fonction retournant tout les "Users" inscrit dans la BDD "User" */
exports.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(err => res.status(500).json({ err }))
}

/*GET ONE USER (GET)
 */
exports.getOneUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.json({ error: 'Request getOneUser have an issue ' + err })
    })
}


/* SIGNUP (POST) */
exports.signup = (req, res, next) => {
  console.log(req.body)
  bcrypt /* hashage du mots de passe - Promise */
    .hash(req.body.password, 10)
    .then(hash => {
      const newUser = User.create({
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin
      })
        .then(user => {
          res
            .status(200)
            .json({ message: /* 'User Signup was successfully created ' + */ user })
        })
        .catch(err => {
          res.status(500).json({ error: 'PROBLEME ' + err })
        })
    })
}

/* LOGIN (POST)
*/
exports.login = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  /* Check la presence de l'email et pass */
  if (!email || !password) {
    res.status(400).json({ error: 'Paramétre(s) manquant(s)' })
  }
  User.findOne({ where: { email: email } })
    .then(user => {
      /* Check si le user a ete trouvé */
      if (!user || user == null) {
        res.status(400).json({ error: 'Email non valide' })
      }
      bcrypt
        .compare(password, user.password)
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
        .catch(err =>
          res
            .status(500)
            .json({
              error:
                'Problem with bcrypt validation in user Login function' + err
            })
        )
    })
    .catch(err =>
      res.status(500).json({ error: 'Problem in user Login function' + err })
    )
}

/* UPDATE PROFIL (PUT)
*/
exports.updateUserProfil = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickname: req.body.nickname,
        bio: req.body.bio
      })
    })
    .then(val =>
      res.status(200).json({ message: 'User profil has been updated ' + val })
    )
    .catch(err =>
      res.json({ error: 'Problem with user updateProfil (PUT) function' + err })
    )

  /* -------------------------------- */
  /*  const user = User.findByPk(req.body.id)  
    if (req.file) {
    const imageToDelete = user.profilImageUrl.split('/user_upload/profil_images')[1]
    fs.unlink('user_upload/profil_images' + imageToDelete, function(){})
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    user.set(
      { where: req.body.id },
      { firstName: req.body.firstName },
      { lastName: req.body.lastName },
      { nickname: req.body.nickname },
      { bio: req.body.bio },
      { profilImageUrl: }
    )} else {
      user.set
    }
      .then(user => {
        user.save()
      })
      .then(user => {
        res.status(200).json({ user })
      })
      .catch(err => {
        res.json({ err })
      })
   */

  /* -------------------------------- */
  /* const user = User.findByPk(req.body.id) */
}

/* DELETE USER (DELETE)
*/
exports.deleteUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.destroy()
    })
    .then(val => {
      res.status(200).json({ message: val })
    })
    .catch(err => {
      res.json({ error: err })
    })
}

/* --------------------------------- Fonctions Supplémentaires ------------------------------------*/
/* FIND BY NAME */
exports.findByName = (req, res) => {
  User.findOne({ where: { firstName: req.params.firstName } }).then(user => {
    res
      .status(200)
      .json({ user })
      .catch(err => {
        res.json({ error: 'Request findByName have an issue ' + err })
      })
  })
}


/* ADMIN FUNCTION ??? */

exports.transformIntoAdmin = (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.isAdmin = true
    })
    .catch(err => {
      res.json({ error: 'Request getOneUser have an issue ' + err })
    })
}