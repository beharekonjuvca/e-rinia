const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // This should be the path to your Sequelize connection configuration file

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.BLOB,
    },
  },
  {
    // Sequelize options here
    tableName: "Users",
    timestamps: false, // If you do not want Sequelize to automatically add `createdAt` and `updatedAt` timestamps
  }
);

module.exports = User;
