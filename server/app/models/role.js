'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    rolename: DataTypes.STRING
  }, {});

  Role.associate = function(models) {
    // associations can be defined here    
    Role.belongsToMany(models.User, {
            through: 'Role_Assigns',
            as:'roles',
            foreignKey: 'role_id'
    });
    
  };

  return Role;
};