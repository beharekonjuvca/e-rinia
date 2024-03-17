const bcrypt = require("bcryptjs");
const User = require("../models/UserModel"); // Adjust the path as necessary

exports.register = async (req, res) => {
  try {
    // Extract info from request body
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    // Check if user already exists
    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // convert email to lowercase
      password: encryptedPassword,
    });

    // Return the new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
