/* const fs = require('fs') */

/* Importation des models  (voir migration et/ou models pour plus de details)  */
const models = require('../models')
/* Modele Comment contenant les commentaires de publications */
const Comment = models.Comment
/* Modele User contenant les utilisateurs */
const User = models.User

/* --------------------------------- Fonctions C R U D ------------------------------------*/

/* - GET ALL COMMENTS (GET)
Fonction retournant tout les 'Comments' de la table 'Comment' en utilisant la methode "Sequelize" 'findAll' (Promise).
RETURN : 
>> Comments +  join User (nested) */
exports.getAllComments = (req, res) => {
  Comment.findAll({
    include: [{ model: User, nested: true }]
  })
    .then(comments => {
      res.status(200).json({ comments })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Problem with Comment getAll function ' + err })
    })
}

/* GET ONE COMMENT (GET)
Fonction retournant un seul 'Comment' via l'ID recuperer en tant que params de l'URI transmise. Utilise la methode 'findOne' de "Sequelize" (Promise)
RETURN : Comment + join User (nested) */
exports.getOneComment = (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: User, nested: true }]
  })
    .then(comment => {
      res.status(200).json({ comment })
    })
    .catch(err => {
      res.status(500).json({
        error: 'Problem with comment getOne function : ' + err
      })
    })
}

/* CREATE COMMENT (POST)
Fonction permettant d'inscrire un nouveau commentaire dans la table 'Comment' de la BDD. Pour cela, elle recuperer les infos 
necessaire dans */
exports.createComment = (req, res) => {
  const newComment = Comment.create({
    UserId: req.body.userId,
    PostId: req.body.postId,
    content: req.body.content
  })
    .then(comment => {
      res.status(200).json({ comment })
    })
    .catch(err => {
      res.json({ error: 'Problem with comment createComment function ' + err })
    })
}

exports.updateComment = (req, res) => {
  Comment.update(
    {
      content: req.body.content
    },
    { where: { id: req.params.id } }
  )
    .then(comment => res.status(200).json({ comment }))
    .catch(err =>
      res.json({ error: 'Problem with comments updateComment function ' + err })
    )
}

exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(result => res.status(200).json({ result }))
    .catch(err =>
      res.json({ error: 'Problem with comment deleteComment function ' + err })
    )
}

/* --------------------------------- END Fonctions C.R.U.D END ------------------------------------*/

/* NOTE : 

'Forme' de retour des fonctions : 'getAll' et 'getOne' 
>> OBJECT : 
"comments" : [
  { "id": NUMBER,
  "UserId : NUMBER (foreignKey),
  "PostId" : NUMBER (foreignKey),
  "createdAt : DATE (sequelize),
  "updatedAt" : DATE (sequelize),

  "User" : {
    DATA (Nested) DE L'UTILISATEUR AUTEUR (voir modele User ou Annotations du UserController)
  }
}

*/