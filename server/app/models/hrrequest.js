'use strict';
module.exports = (sequelize, DataTypes) => {

  const Version = require('sequelize-version');

  const hrrequest = sequelize.define('hrrequest', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    requestor_firstname: DataTypes.STRING,
    requestor_lastname: DataTypes.STRING,
    cabinet_member: DataTypes.STRING,
    requesting_department: DataTypes.STRING,
    effective_date: DataTypes.DATE,
    employee_firstname: DataTypes.STRING,
    employee_lastname: DataTypes.STRING,
    employee_position_number: DataTypes.STRING,
    former_employee_firstname: DataTypes.STRING,
    former_employee_lastname: DataTypes.STRING,
    category: DataTypes.STRING,
    employee_flsa: DataTypes.STRING,
    request_type: DataTypes.STRING,
    purpose_of_request: DataTypes.STRING,
    employee_justification: DataTypes.STRING
  }, {});
  hrrequest.associate = function(models) {
    // associations can be defined here
  };
  
  //Use Version....
  const HRRequestVersion = new Version(hrrequest);

  return hrrequest;
};