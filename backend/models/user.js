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
      this.hasMany(models.Post)
      this.hasMany(models.LikePost)
      this.hasMany(models.Comment)
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      nickname: DataTypes.STRING,
      bio: DataTypes.STRING,
      profilImageUrl: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}