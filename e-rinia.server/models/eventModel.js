const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Make sure to point to your actual sequelize connection setup

class Event extends Model {
  // You can add methods for `Event` if needed
}

Event.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.BLOB,
      // If storing URLs to images instead, change this to DataTypes.STRING
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The 'approved' attribute is a boolean that determines if the event is approved.
    approved: {
      type: DataTypes.BOOLEAN,
      // allowNull should be set to false, assuming that an event must explicitly be approved or not
      allowNull: false,
      defaultValue: false, // Default to false, assuming events are not approved when first created
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Event",
    // Additional options such as tableName, timestamps (createdAt and updatedAt) can be set here
  }
);

module.exports = Event;
