import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../endpoints"; // Ensure the path is correct

const EventGallery = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await getAllEvents();
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={`http://localhost:4000${event.picture}`}
              alt={event.name}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500">{event.place}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGallery;
