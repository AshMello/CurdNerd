'use strict';
module.exports = (sequelize, DataTypes) => {
  const Journal = sequelize.define('Journal', {
    photo: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    milk: DataTypes.STRING,
    origin: DataTypes.STRING,
    texture: DataTypes.STRING,
    notes: DataTypes.TEXT,
    rating: DataTypes.STRING,
    user: DataTypes.STRING
  }, {});
  Journal.associate = function(models) {
    // associations can be defined here
    Journal.belongsTo(models.User, { foreignKey: "user" });
  };
  return Journal;
};