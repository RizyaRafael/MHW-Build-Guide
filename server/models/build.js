'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Build extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Build.belongsTo(models.User)
      Build.belongsTo(models.Monster)
      // define association here
    }
  }
  Build.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Empty userId"
        },
        notEmpty: {
          msg: "Empty userId"
        }
      }
    },
    MonsterId: DataTypes.INTEGER,
    head: DataTypes.JSON,
    chest: DataTypes.JSON,
    legs: DataTypes.JSON,
    waist: DataTypes.JSON,
    gloves: DataTypes.JSON,
    weapon: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Build',
  });
  return Build;
};