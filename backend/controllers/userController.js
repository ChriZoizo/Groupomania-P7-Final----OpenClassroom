/* A - Importation des modules */
const bcrypt = require('bcrypt') /* Module "Bcrypt" pour le hashage (securité) */
const jwt = require('jsonwebtoken') /* Module "JsonWebToken" pour l'authentification (securité) */

const dotenv = require('dotenv') /* NON UTILISé ! */
const auth = require('../middlewares/auth') /* NON UTILISé ! */

/* Importation BDD */
const models = require('../models')
/* Table 'User' contenant les utilisateurs (voir migration et/ou models pour plus de details) */
const User = models.User

/* ---------------------------------- Fonctions C R U D --------------------------------------*/
/* B - 1 - GET ALL USERS (GET)
Fonction retournant tout les "Users" inscrit dans la BDD "User" en utilisant la methode "Sequelize" 'findAll' (Promise) */
exports.getAllUsers = (req, res) => {
  User.findAll({
    include: [{ all: true, nested: true }]
  })
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
exports.getOneUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },  
    include: [{ all: true, nested: true }]
  })
    .then(user => {
      res.status(200).json({ user })
    })
    /* Retourne un message + le message d'erreur en cas de propbléme */
    .catch(err => {
      res.status(500).json({ error: 'Request getOneUser have an issue ' + err })
    })
}

/* B - 3 - a - SIGNUP (= createUser) (POST) 
Fonction permettant d'inscrire un nouveau 'user' dans la table 'User' de la BDD. Le mots de passe recuperé dans la 
requête (key 'password') est hashé via "bcrypt" (Promise).PUIS utilise la methode "Sequelize" 'create' pour creé le 'user' dans la table, 
enregistrant l''Email', le 'password' ainsi que le 'nickname' que l'utilisateur as renseigné. 
*/
exports.signup = (req, res) => {
  bcrypt /* hashage du mots de passe (recuperer dans le body de la requête (key 'password' )- Promise */
    .hash(req.body.password, 10)
    .then(hash => {
      const newUser = User.create({
        /* l'email est recuperer dans le body de la requête (key 'email) */
        email: req.body.email,
        /* le mot de passe est le hash resultant de la promise de 'bcrypt' */
        password: hash,
        /* le nom complet (appelé 'nickname') est recuperer dans le body de la requête */
        nickname: req.body.nickname,
        /* WORK IN PROGRESS */
        isAdmin: req.body.isAdmin
      })
        .then(user => {
          res.status(200).json({
            message: 'User Signup was successfully created ! :'
          })
        })
        .catch(err => {
          res.status(500).json({ error: 'PROBLEME ' + err })
        })
    })
}

/* B - 3 - b - LOGIN (POST)
 */
exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let userFinded = {}
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
      userFinded = user
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
            }),
            userInfos: userFinded
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
exports.updateUserProfil = (req, res) => {
  User.update(
    {
      nickname: req.body.nickname,
      isAdmin: req.body.isAdmin
    },
    { where: { id: req.params.id } }
  )
    .then(user => {
      res.status(200).json({ message: 'Informations utilisateur modifié !' })
    })
    .catch(err => {
      res.json({ error: 'Problem in updateUserProfil' + err })
    })
}

/* -------------------------------- */

/* DELETE USER (DELETE)
 */
exports.deleteUser = (req, res) => {
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
  User.findOne({ where: { nickname: req.body.nickname }, include: models.Post }).then(user => {
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
