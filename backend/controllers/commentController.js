/* Importation des modules */
const models = require('../models')
const fs = require('fs')

/* Importation des Tables de la BDD */
const User = models.User
const Post = models.Post
const reactionTable = models.LikePost
const Comment = models.Comment

/* --------------------------------- Fonctions C R U D ------------------------------------*/

exports.getAllComments = (req, res) => {
  Comment.findAll()
    .then(comments => {
      res.status(200).json({ comments })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Problem with comment getAll function ' + err })
    })
}

exports.getOneComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then(comment => {
      res.status(200).json({ comment })
    })
    .catch(err => {
      res.status(500).json({
        error: 'Problem with comment getOne function ' + err
      })
    })
}

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
