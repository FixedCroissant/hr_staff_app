'use strict';


module.exports = {


  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rolename: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {


    return queryInterface.dropTable('Roles');
    
    //How to handle foreign key constraints.
    /*return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
   .then(() => queryInterface.dropTable('Roles'));*/
  }
};