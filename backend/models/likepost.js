'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      this.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  LikePost.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LikePost',
  });
  return LikePost;
};