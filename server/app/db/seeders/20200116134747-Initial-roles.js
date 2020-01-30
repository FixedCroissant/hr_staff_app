'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      rolename: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      rolename:'Guest',
      createdAt: new Date(),
      updatedAt:new Date()
  }
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    Example:
      */      
       return queryInterface.bulkDelete('Roles',null,{});
    
  }
};
