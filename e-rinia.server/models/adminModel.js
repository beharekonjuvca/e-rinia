const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Make sure this points to your database configuration file

class Admin extends Model {
  // You can add instance methods here if needed

  // An example method to approve an event
  approveEvent(event) {
    // Logic to approve an event
  }

  // An example method to add a new event
  addEvent(event) {
    // Logic to add a new event
  }

  // An example method to add an NGO
  addNGO(ngo) {
    // Logic to add a new NGO
  }
}

Admin.init(
  {
    // Model attributes are defined here
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
  },
  {
    // Sequelize model options go here
    sequelize,
    modelName: "Admin",
    // You might want to add other options such as timestamps, tableName, etc.
  }
);

module.exports = Admin;
