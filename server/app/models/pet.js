'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER
  }, {});
  Pet.associate = function(models) {
    // associations can be defined here
  };
  return Pet;
};