/* A - Importation des modules */
const bcrypt = require('bcrypt') /* Module "Bcrypt" pour le hashage (securité) */
const jwt = require('jsonwebtoken') /* Module "JsonWebToken" pour l'authentification (securité) */
const dotenv = require('dotenv') /* NON UTILISé ! */
const auth = require('../middlewares/auth') /* NON UTILISé ! */
const models = require('../models')

/* Importation BDD */
const User =
  models.User /* Table 'User' contenant les utilisateurs (voir migration et/ou models pour plus de details) */

/* ---------------------------------- Fonctions C R U D --------------------------------------*/
/* B - 1 - GET ALL USERS (GET)
Fonction retournant tout les "Users" inscrit dans la BDD "User" en utilisant la methode "Sequelize" 'findAll' (Promise) */
exports.getAllUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(err =>
      /* Retourne un message + le message d'erreur en cas de propbléme */
      res.status(500).json({
        error: "Error in 'getAllUser' function in User controller : " + err
      })
    )
}

/*B - 2 - GET ONE USER (GET)
Fonction retournant UN 'User' selon son ID en utilisant la methode "Sequelize" 'findByPk' (Promise) 
L'ID est recuperer dans le params de l'URL de la requête en utilisant la key 'id' 
 */
exports.getOneUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      res.json({ user })
    })
    .catch(err =>
      /* Retourne un message + le message d'erreur en cas de propbléme */
      {
        res.json({ error: 'Request getOneUser have an issue ' + err })
      }
    )
}

/* B - 3 - a - SIGNUP (= createUser) (POST) 
Fonction permettant d'inscrire unnouveau 'user' dans la table 'User' de la base de données.Le mots de passe recuperé dans la 
requête (key 'password') est hashé via "bcrypt" (Promise).PUIS utilise la methode "Sequelize" 'create' pour creé le 'user' dans la table. 
*/
exports.signup = (req, res, next) => {
  bcrypt /* hashage du mots de passe (recuperer dans le body de la requête (key 'password' )- Promise */
    .hash(req.body.password, 10)
    .then(hash => {
      const newUser = User.create({
        /* l'email est recuperer dans le body de la requête (key 'email) */
        email: req.body.email,
        /* le mot de passe est le hash resultant de la promise de 'bcrypt' */
        password: hash,
        /* WORK IN PROGRESS */
        isAdmin: req.body.isAdmin
      })
        .then(user => {
          res.status(200).json({
            message: 'User Signup was successfully created ' + user
          })
        })
        .catch(err => {
          res.status(500).json({ error: 'PROBLEME ' + err })
        })
    })
}

/* B - 3 - b - LOGIN (POST)
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
          res.status(500).json({
            error: 'Problem with bcrypt validation in user Login function' + err
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
