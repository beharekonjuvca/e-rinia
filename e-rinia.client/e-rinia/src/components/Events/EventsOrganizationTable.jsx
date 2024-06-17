import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import {
  deleteEvent,
  updateEvent,
  createEvent,
  getEventsByOrganization,
  decodeOrganizationToken,
} from "../../endpoints";
import EditEventModal from "../Events/EditEventModal";
import CreateEventModal from "./CreateEventModal";
import ViewEventModal from "../Events/ViewEventModal";
import { useAuth } from "../../Auth/AuthContext";

const EventsOrganizationTable = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const { userRole, organizationId } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const organizationId = decodeOrganizationToken();
        if (userRole === "organization" && organizationId) {
          const data = await getEventsByOrganization(organizationId);
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userRole, organizationId]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
      message.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      message.error("Failed to delete event");
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateEvent(id, updatedData);
      setEvents(
        events.map((event) =>
          event.id === id ? { ...event, ...updatedData } : event
        )
      );
      message.success("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
      message.error("Failed to update event");
    }
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveAdd = async (newData) => {
    try {
      const newEvent = await createEvent(newData);
      setEvents([...events, newEvent]);
      message.success("Event added successfully");
      // Removed setIsUploadModalVisible(true);
      setSelectedEvent(newEvent);
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error adding event:", error);
      message.error("Failed to add event");
    }
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setIsViewModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this event?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-500">Event List</h2>
        <Button
          type="primary"
          id="AddEvent"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add Event
        </Button>
      </div>
      <Table dataSource={events} columns={columns} rowKey="id" />
      {selectedEvent && (
        <EditEventModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          event={selectedEvent}
          onSave={handleSaveEdit}
        />
      )}
      <CreateEventModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleSaveAdd}
      />
      {selectedEvent && (
        <ViewEventModal
          visible={isViewModalVisible}
          onClose={() => setIsViewModalVisible(false)}
          event={selectedEvent}
        />
      )}
      {/* UploadPictureModal component completely removed from rendering */}
    </div>
  );
};

export default EventsOrganizationTable;
