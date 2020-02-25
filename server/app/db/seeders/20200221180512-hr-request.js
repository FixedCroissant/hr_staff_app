'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('hrrequests', [{
      requestor_firstname: 'John',
      requestor_lastname: 'Doe',
      cabinet_member: 'Holly Durham',
      requesting_department:'DASA',
      effective_date:new Date(),
      employee_firstname: 'Josh',
      employee_lastname:'Williams',
      employee_position_number:'12345678',
      former_employee_firstname:'Old John',
      former_employee_lastname:'Old Doe',
      category:'cat1',
      employee_flsa:'no',
      request_type:'',
      purpose_of_request:'purpose1',
      employee_justification:'my justification for this position is xyz',    
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
