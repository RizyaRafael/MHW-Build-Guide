'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Build)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg:"Username already registered"
      },
      validate:{
        notNull: {
          msg: "Username cant be empty"
        },
        notEmpty: {
          msg: "Username cant be empty"
        }
      }
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg:"Email already registered"
      },
      validate:{
        notNull: {
          msg: "Email cant be empty"
        },
        notEmpty: {
          msg: "Email cant be empty"
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Password cant be empty"
        },
        notEmpty: {
          msg: "Password cant be empty"
        }
      }
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (instance) => {
    instance.password = hashPass(instance.password)
  })
  return User;
};