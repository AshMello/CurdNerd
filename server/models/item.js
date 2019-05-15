'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    pairing: DataTypes.TEXT
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};