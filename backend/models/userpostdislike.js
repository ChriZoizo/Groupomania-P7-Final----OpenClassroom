'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPostDislike extends Model {
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
  UserPostDislike.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPostDislike',
  });
  return UserPostDislike;
};