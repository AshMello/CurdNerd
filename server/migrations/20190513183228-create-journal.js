'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Journals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      milk: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      texture: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Journals');
  }
};