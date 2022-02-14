'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
        model: 'Users',
        key: 'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [2, 500]
      },
      postImageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ""
      },
      likeCounter: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dislikeCounter: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      voteCounter: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};