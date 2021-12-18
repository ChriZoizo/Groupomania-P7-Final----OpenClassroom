const models = require('../models')
const Post = models.Post

const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.getAllPosts = (req, res) => {
Post.findAll()
.then(posts => {
    res.status(200).json({ posts})
})
.catch(error => {
    res.status(500).json({ error })
})
}

exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.json({ err })
    })
}

exports.createPost = (req, res) => {

}

exports.updatePost = (req, res) => {

}

exports.deletePost = (req, res) => {

}

exports.likeOrDislikePost = (req, res) => {

}



exports.upvotePost = (req, res) => {

}

/* ????????????????????? */

exports.comments = (req, res) => {
    /*Go fonction du controlleur des commentaires ? */
}