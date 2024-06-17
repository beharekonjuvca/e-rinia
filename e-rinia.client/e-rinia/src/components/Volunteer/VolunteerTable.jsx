/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import {
  getAllVolunteers,
  deleteVolunteer,
  updateVolunteer,
  registerVolunteer,
} from "../../endpoints"; // Ensure the path is correct
import EditVolunteerModal from "./EditVolunteerModal"; // Ensure the path is correct
import AddVolunteerModal from "./AddVolunteerModal"; // Ensure the path is correct

const VolunteerTable = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const data = await getAllVolunteers();
        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteVolunteer(id);
      setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
      message.success("Volunteer deleted successfully");
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      message.error("Failed to delete volunteer");
    }
  };

  const handleEdit = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateVolunteer(id, updatedData);
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer.id === id ? { ...volunteer, ...updatedData } : volunteer
        )
      );
      message.success("Volunteer updated successfully");
    } catch (error) {
      console.error("Error updating volunteer:", error);
      message.error("Failed to update volunteer");
    }
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveAdd = async (newData) => {
    try {
      const newVolunteer = await registerVolunteer(newData);
      setVolunteers([...volunteers, newVolunteer]);
      message.success("Volunteer added successfully");
    } catch (error) {
      console.error("Error adding volunteer:", error);
      message.error("Failed to add volunteer");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
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
            title="Are you sure to delete this volunteer?"
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
        {" "}
        <h2 className="text-2xl font-bold text-500">Volunteer List</h2>
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          Add Volunteer
        </Button>
      </div>

      <Table dataSource={volunteers} columns={columns} rowKey="id" />
      {selectedVolunteer && (
        <EditVolunteerModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          volunteer={selectedVolunteer}
          onSave={handleSaveEdit}
        />
      )}
      <AddVolunteerModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleSaveAdd}
      />
    </div>
  );
};

export default VolunteerTable;
