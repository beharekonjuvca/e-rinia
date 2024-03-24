const Event = require("../models/eventModel"); // Adjust the path as necessary

exports.createEvent = async (req, res) => {
  try {
    const { name, picture, place, date, description, approved } = req.body;
    const event = await Event.create({
      name,
      picture, // This will depend on how you're handling image uploads
      place,
      date,
      description,
      approved,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, picture, place, date, description } = req.body; // Exclude 'approved' from the destructuring

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    await event.update({
      name,
      picture, // Be cautious with image data, you might need to handle uploads
      place,
      date,
      description,
      // Notice 'approved' is not included here
    });

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    await event.destroy();
    res.send("Event deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
exports.approveEvent = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the event's ID is passed in the URL

    // Fetch the event by ID
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    // Set the event as approved
    await event.update({ approved: true });

    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
