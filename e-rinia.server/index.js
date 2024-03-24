const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const volunteerRoutes = require("./routes/volunteerRoutes"); // Adjust the path as necessary
const organizationRoutes = require("./routes/organizationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const app = express();

// // Set up a connection using Sequelize
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql", // This could be any of the supported databases
//     logging: false, // Disable logging; default is console.log
//   }
// );

// // Test the connection
// async function testDatabaseConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// testDatabaseConnection();
const sequelize = require("./config/db"); // Adjust the path as necessary
const User = require("./models/volunteerModel"); // Adjust the path as necessary

// Sync all models that are not already in the database
sequelize
  .sync()
  .then(() => {
    console.log(
      "Users table has been successfully created, if it does not exist"
    );
  })
  .catch((error) => {
    console.error("This error occurred", error);
  });

// Your server setup continues here...

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); // Middleware to parse JSON bodies

// Use volunteer routes
app.use("/api/volunteer", volunteerRoutes);
// Use organization routes
app.use("/api/organization", organizationRoutes);
// Use admin routes
app.use("/api/admin", adminRoutes);
// Use event routes
app.use("/api/event", eventRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
