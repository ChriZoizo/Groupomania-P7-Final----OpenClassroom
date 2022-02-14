'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.Post, { onDelete: 'cascade' })
      this.hasMany(models.LikePost, { onDelete: 'cascade' })
      this.hasMany(models.Comment, { onDelete: 'cascade' })
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}