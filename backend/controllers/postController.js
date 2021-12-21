const models = require('../models')
const Post = models.Post
const User = models.User
const DislikeTable = models.UserPostDislike
const LikeTable = models.UserPostLike

const fs = require('fs')
const jwt = require('jsonwebtoken')
const { userInfo } = require('os')
const userpostlike = require('../models/userpostlike')
const post = require('../models/post')

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then(posts => {
      res.status(200).json({ posts })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Problem with post getAll function or GET query' + err })
    })
}

exports.getOnePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.json({
        error: 'Problem with post getOne function or GET query' + err
      })
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
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.json({ error: 'Problem with posts POST request' + err })
    })
}

exports.updatePost = (req, res) => {
  Post.update(
    { postImageUrl: req.body.imageUrl },
    { where: { id: req.params.id } }
  )
    .then(post => res.status(200).json({ post }))
    .catch(err =>
      res.json({ error: 'Problem with posts UPDATE request' + err })
    )
}

exports.deletePost = (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(result => res.status(200).json({ result }))
    .catch(err =>
      res.json({ error: 'Problem with posts DELETE request' + err })
    )
}

exports.likeOrDislikePost = (req, res) => {
  const likeValue =
    req.body
      .likeValue /* Enregistre la valeur "likeValue" venant du body de la requête */
  let hadLiked = false
  let hadDisliked = false
  /* Cherche dans les tables jointes si le user a deja disliké le post */
  DislikeTable.findAll({
    where: { PostId: req.body.postId },
    include: [
      {
        model: User,
        where: { id: req.body.userId }
      }
    ]
  })
    .then(value => {
      /* Si il y a une valeur dans la t able jointe */
      if (value.length > 0) {
        console.log(value)
        hadDisliked = true /* on passe le booleen "hadDisliked" a true */
        console.log(hadDisliked)
      }
    })
    .catch(err =>
      res.json({ error: 'Problem with posts UPDATE request' + err })
    )
  /* Cherche dans la table jointe si le user a deja liké le post */
  LikeTable.findAll({
    where: { PostId: req.body.postId },
    include: [
      {
        model: User,
        where: { id: req.body.userId }
      }
    ]
  })
    .then(value => {
      console.log(value)
      /* Si il y a une valeur dans la t able jointe */
      if (value.length > 0) {
        hadLiked = true /* on passe le booleen "hadDisliked" a true */
      }
      console.log(hadLiked)
    })
    .catch(err =>
      res.json({ error: 'Problem with posts UPDATE request' + err })
    )
    /* Cherche l'objet "Post" portant l'ID rechecherche */
  Post.findByPk(req.body.postId)
    .then(post => {
      /* Si la valeur de "likeValue" est de 1, ET que l'utilisateur n'AS PAS deja liké ou disliké, alors 
      la valeur de like du post est incrémenté de 1, et une entrée est crée dans la table jointe correspondante */
      if (likeValue == 1 && hadLiked == false && hadDisliked == false) {
        post.increment('likeCounter', { by: 1 }) /* Incremente la valeur */
        /* Créer l'entrée dans la table jointe "LikeTable" */
        LikeTable.create({
          UserId: req.body.userId,
          PostId: post.id
        })
          .then(post => {
            res.status(200).json(post)
          })
          .catch(err => {
            res.json({ error: 'Problem with posts POST request' + err })
          })
      }
            /* Si la valeur de "dislikeValue" est de -1, ET que l'utilisateur n'AS PAS deja liké ou disliké, alors 
      la valeur de dislike du post est incrémenté de 1, et une entrée est crée dans la table jointe correspondante */
      if (likeValue == -1 && hadLiked == false && hadDisliked == false) {
        post.increment('dislikeCounter', { by: 1 })/* Incremente la valeur */
        /* Créer l'entrée dans la table jointe "DislikeTable" */
        DislikeTable.create({
          UserId: req.body.userId,
          PostId: post.id
        })
          .then(post => {
            res.status(200).json(post)
          })
          .catch(err => {
            res.json({ error: 'Problem with posts POST request' + err })
          })
      }
      /* Si la valeur de "dislikeValue" est de 0, ET que l'utilisateur est dans au moins une des deux tables jointes,
      retire l'entrée correspondant dans la table jointe concernée, et decremente la valeur correspondante  A FINIR */
      if ((likeValue == 0 && hadLiked == true) || hadDisliked == true) {
      }
    })
    .then(post => res.status(200).json({ message: post }))
    .catch(err =>
      res.json({ error: 'Problem with posts likeOrDislike function' + err })
    )
}

exports.upvotePost = (req, res) => {
  const voteValue = req.body.voteValue

  if (voteValue == 1) {
  }
  if (voteValue == 0) {
  }
}

/*  LIKE DISLIKE FUNCTION ADVANCED  



exports.likeOrDislikePost = (req, res) => {
  const likeValue = req.body.likeValue
  let hadLiked = false
  let hadDisliked = false
  DislikeTable.findAll({ 
    where: {PostId: req.body.postId},
    include: [{
      model: User,
      where: {id: req.body.userId}
    }]
  })
  .then(value => {
    if(value) {
      hadDisliked = true
    }

  })
  .catch(err =>
    res.json({ error: 'Problem with posts UPDATE request' + err })
  )
  LikeTable.findAll({ 
    where: {PostId: req.body.postId},
    include: [{
      model: User,
      where: {id: req.body.userId}
    }]
  })
  .then(value => {
    if(value) {
      hadLiked = true
    }

  })
  .catch(err =>
    res.json({ error: 'Problem with posts UPDATE request' + err })
  )
  Post.findByPk(req.body.postId)
    .then(post => {
      if (likeValue == 1 && hadLiked == false && hadDisliked == false) {
        post.increment('likeCounter', { by: 1 })
        LikeTable.create({
          UserId: req.body.userId,
          PostId: post.id
        })
          .then(post => {
            res.status(200).json(post)
          })
          .catch(err => {
            res.json({ error: 'Problem with posts POST request' + err })
          })
      }
      if (likeValue == -1 && hadLiked == false && hadDisliked == false) {
        post.increment('dislikeCounter', { by: 1 })
        DislikeTable.create({
          UserId: req.body.userId,
          PostId: post.id
        })
          .then(post => {
            res.status(200).json(post)
          })
          .catch(err => {
            res.json({ error: 'Problem with posts POST request' + err })
          })
      }
      if (likeValue == 0 && hadLiked == true || hadDisliked == true) {

      }
    })
    .then(post => res.status(200).json({ message: post }))
    .catch(err =>
      res.json({ error: 'Problem with posts likeOrDislike function' + err })
    )
}*/
