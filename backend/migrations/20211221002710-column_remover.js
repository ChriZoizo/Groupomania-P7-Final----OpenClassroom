'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserPostDislikes', 'user' )
    await queryInterface.removeColumn('UserPostLikes', 'user' )
    await queryInterface.removeColumn('UserPostDislikes', 'post' )
    await queryInterface.removeColumn('UserPostLikes', 'post' )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
