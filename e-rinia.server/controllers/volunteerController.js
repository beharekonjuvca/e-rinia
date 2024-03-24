require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Volunteer = require("../models/volunteerModel"); // Adjust the path as necessary

// Assuming your .env file has JWT_SECRET defined
const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const volunteer = await Volunteer.findOne({ where: { email } });

    if (!volunteer) {
      return res.status(401).send("Incorrect email or password.");
    }

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      return res.status(401).send("Incorrect email or password.");
    }

    const payload = {
      volunteer: {
        id: volunteer.id, // Use the volunteer's ID to create the payload
        role: "volunteer",
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Authentication middleware
// Assuming jwtSecret is defined at the top of the file
// const jwtSecret = process.env.JWT_SECRET;

exports.authorizeRole = (expectedRole) => (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    // Verify the token using the jwtSecret from the environment variable
    const decoded = jwt.verify(token, jwtSecret);
    // Ensure that the user role in the token matches the expectedRole
    if (decoded.user.role !== expectedRole) {
      return res
        .status(403)
        .send("Access denied. You do not have the right role.");
    }

    // Attach the decoded token to the request object and call next middleware
    req.user = decoded.user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.volunteer = decoded.volunteer;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// Include other exports as necessary

exports.register = async (req, res) => {
  try {
    // Extract info from request body
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    // Check if volunteer already exists
    const oldVolunteer = await Volunteer.findOne({ where: { email } });

    if (oldVolunteer) {
      return res.status(409).send("Volunteer Already Exists. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create volunteer in database
    const volunteer = await Volunteer.create({
      name,
      email: email.toLowerCase(), // convert email to lowercase
      password: encryptedPassword,
    });

    // Return the new volunteer
    res.status(201).json(volunteer);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll({
      // Optionally, you can specify which attributes to include
      // For security reasons, you might want to exclude the password field
      attributes: { exclude: ["password"] },
    });
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Authentication middleware
exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.volunteer = decoded.volunteer;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// Volunteer route handler
exports.getVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found");
    }
    return res.json(volunteer);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

// In your routes file

// Update a volunteer
exports.updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found");
    }

    // Update volunteer with req.body values
    const updatedVolunteer = await volunteer.update(req.body);
    res.json(updatedVolunteer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete a volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found");
    }

    await volunteer.destroy();
    res.send("Volunteer deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
