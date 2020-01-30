'use strict';
module.exports = (Sequelize, DataTypes) => {
  //NAME IS IMPORTANT
  const User = Sequelize.define('User', {
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
  };
  return User;
};