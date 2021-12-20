const models = require('../models')
const Post = models.Post

const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.getAllPosts = (req, res) => {
Post.findAll()
.then(posts => {
    res.status(200).json({ posts})
})
.catch(err => {
    res.status(500).json({ error: 'Problem with post getAll function or GET query' + err })
})
}

exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.json({ error: 'Problem with post getOne function or GET query' + err })
    })
}

exports.createPost = (req, res) => {
  /* Utiliser le token pour l'id ? */
/*   const postObject = JSON.parse(req.body.sauce)  !!! POSE PROBLéME*/
  const newPost = Post.create({
  userId: req.body.userId,
  content: req.body.content,
/*   postImageUrl: `${req.protocol}://${req.get('host')}/images/${
    req.file.filename
  }`, */
postImageUrl: 'www.google.fr',
  likeCounter: 0,
dislikeCounter: 0,
voteCounter: 0
  })
  .then(post => {res.status(200).json(post)})
  .catch(err => {res.json({error: 'Problem with posts POST request' + err})})
}

exports.updatePost = (req, res) => {
Post.update({ postImageUrl: 'www.GOOGLE.com'}, {where: {id: req.params.id}})
 .then(post => {res.status(200).json({ post})})
.catch(err => res.json({ error: "Problem with posts UPDATE request" + err}))
}

exports.deletePost = (req, res) => {
Post.destroy({ where :{ id: req.params.id}})
.then(result => res.status(200).json({ result}))
.catch(err => res.json({ error: "Problem with posts DELETE request" + err}))
}

exports.likeOrDislikePost = (req, res) => {
const likeValue = req.body.likeValue

if (likeValue == 1) {

}
if (likeValue == -1) {

}
if (likeValue == 0) {

}
}



exports.upvotePost = (req, res) => {
const voteValue = req.body.voteValue

if (voteValue == 1 ) {

}
if (voteValue == 0){

}
}

/* ????????????????????? */

exports.findUserPost = (req, res) => {

}