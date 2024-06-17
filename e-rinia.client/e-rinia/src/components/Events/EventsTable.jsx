/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import {
  getAllEvents,
  deleteEvent,
  updateEvent,
  createEvent,
  approveEvent,
} from "../../endpoints"; // Ensure the path is correct
import EditEventModal from "./EditEventModal"; // Ensure the path is correct
import AddEventModal from "./AddEventModal"; // Ensure the path is correct

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const fetchEvents = async (page, pageSize) => {
    setLoading(true);
    try {
      const data = await getAllEvents(page, pageSize);
      setEvents(data.data);
      setPagination({
        current: data.pagination.currentPage,
        pageSize: data.pagination.pageSize,
        total: data.pagination.totalItems,
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchEvents(pagination.current, pagination.pageSize);
  };

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
    } catch (error) {
      console.error("Error adding event:", error);
      message.error("Failed to add event");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      setEvents(
        events.map((event) =>
          event.id === id ? { ...event, approved: true } : event
        )
      );
      message.success("Event approved successfully");
    } catch (error) {
      console.error("Error approving event:", error);
      message.error("Failed to approve event");
    }
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
      title: "Approved",
      dataIndex: "approved",
      key: "approved",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
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
          {!record.approved && (
            <Popconfirm
              title="Are you sure to approve this event?"
              onConfirm={() => handleApprove(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" style={{ color: "green" }}>
                Approve
              </Button>
            </Popconfirm>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-500">Event List</h2>
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          Add Event
        </Button>
      </div>
      <Table
        dataSource={events}
        columns={columns}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
      {selectedEvent && (
        <EditEventModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          event={selectedEvent}
          onSave={handleSaveEdit}
        />
      )}
      <AddEventModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleSaveAdd}
      />
    </div>
  );
};

export default EventTable;
