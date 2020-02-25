'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hrrequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestor_firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      requestor_lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      
      cabinet_member:{
        allowNull: true,
        type: Sequelize.STRING
      },
     
      requesting_department: {
        allowNull: true,
        type: Sequelize.STRING
      },

      effective_date: {
        allowNull: true,
        type: Sequelize.DATE
      },

      employee_firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      employee_lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      employee_position_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      former_employee_firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      former_employee_lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      employee_flsa: {
        type: Sequelize.STRING
      },
      request_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      purpose_of_request: {
        allowNull: true,
        type: Sequelize.STRING
      },
      employee_justification: {
        allowNull: true,
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
  
     /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
  
    return queryInterface.dropTable('hrrequests');
  }

  
};
