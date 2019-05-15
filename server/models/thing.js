'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define('Thing', {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    pairing: DataTypes.STRING
  }, {});
  Thing.associate = function(models) {
    // associations can be defined here
  };
  return Thing;
};