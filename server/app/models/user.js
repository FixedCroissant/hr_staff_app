'use strict';
module.exports = (Sequelize, DataTypes) => {
  //NAME IS IMPORTANT
  const User = Sequelize.define('User', {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    unityid: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
        type: DataTypes.DATE
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here

    //Many to many with roles.
    User.belongsToMany(models.Role,
      {
                                //Use our pivot table to access assignments.
                                through: 'Role_Assigns',
                                as:'role',                            
                                foreignKey:'user_id'  
                               
                                
      });
  };
  return User;
};