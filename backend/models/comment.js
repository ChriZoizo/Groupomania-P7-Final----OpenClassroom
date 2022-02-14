/* Modèle des 'Comment' : Commentaires des publications */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /* Associations */
    static associate(models) {
      /* Un Comment appartient a UN User */
      this.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      this.belongsTo(models.Post, {
        /* Un Comment Appartiuent a UN Post */
        foreignKey: {
          allowNull: false, 
        }
      })
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};