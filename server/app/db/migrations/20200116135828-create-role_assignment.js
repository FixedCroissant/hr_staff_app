'use strict';

//Get our Users.
//var Users = require('../models/User')

module.exports = {


  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role_Assigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //Foreign Key for users.
      user_id:{
        type: Sequelize.INTEGER,
            references:{
                //Reference another model
                model: 'Users',
                //This is the column name of the referenced model.
                key:'id'
            },
      },
      //Foreign key for roles.
      role_id:{
        type: Sequelize.INTEGER,
            references:{
                //Reference another model
                model: 'Roles',
                //This is the column name of the referenced model.
                key:'id'
            },
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
    return queryInterface.dropTable('Roles_Assigns');
  }
};