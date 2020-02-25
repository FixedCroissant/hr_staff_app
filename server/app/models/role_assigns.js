'use strict';
module.exports = (Sequelize, DataTypes) => {
  //NAME IS IMPORTANT
  const Role_Assigns = Sequelize.define('Role_Assigns',
   {  
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    
  }, {});

  Role_Assigns.associate = function(models) {
    // associations can be defined here    
    
    //USer
    Role_Assigns.belongsTo(models.User, {
           foreignKey:'user_id'
    });
    //Role.
    Role_Assigns.belongsTo(models.Role, {
      foreignKey:'role_id'
    });



             
  };
  
  return Role_Assigns;
};