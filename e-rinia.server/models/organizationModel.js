const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust this to the path of your Sequelize connection

class Organization extends Model {
  // Define any instance methods here, for example:
  addEvent(event) {
    // Logic to add an event to this organization
  }

  removeEvent(event) {
    // Logic to remove an event from this organization
  }

  editEvent(event) {
    // Logic to edit an event associated with this organization
  }
}

Organization.init(
  {
    // Define model attributes according to the UML diagram
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    joinCode: {
      type: DataTypes.STRING,
      // allowNull is not specified in the UML, you may choose based on your business rules
    },
    picture: {
      type: DataTypes.BLOB,
      // This assumes you are storing images as BLOBs, if not adjust accordingly
    },
    description: {
      type: DataTypes.STRING,
      // allowNull is not specified in the UML, you may choose based on your business rules
    },
    // You can include the association to events here if you prefer
    // However, associations are typically defined after all models are initialized
  },
  {
    sequelize,
    modelName: "Organization",
    // Additional model options go here
  }
);

// Associations can also be defined here if necessary, for example:
// Organization.hasMany(Event, { foreignKey: 'organizationId', as: 'events' });

module.exports = Organization;
