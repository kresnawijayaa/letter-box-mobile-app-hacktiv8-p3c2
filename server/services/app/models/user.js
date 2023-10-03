"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/hash");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: `Email required.`,
          },
          notNull: {
            args: true,
            msg: `Email required.`,
          },
          isEmail: {
            args: true,
            msg: `Invalid email`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Password required.`,
          },
          notNull: {
            args: true,
            msg: `Password required.`,
          },
          len: {
            args: [5],
            msg: `Password length at least 5 characters`,
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
          user.role = "admin";
        },
      },
    }
  );
  return User;
};
