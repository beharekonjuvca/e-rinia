/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import {
  getAllOrganizations,
  deleteOrganization,
  updateOrganization,
  registerOrganization,
} from "../../endpoints"; // Ensure the path is correct
import EditOrganizationModal from "./EditOrganizationModal"; // Ensure the path is correct
import AddOrganizationModal from "./AddOrganizationModal"; // Ensure the path is correct

const OrganizationsTable = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getAllOrganizations();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOrganization(id);
      setOrganizations(
        organizations.filter((organization) => organization.id !== id)
      );
      message.success("Organization deleted successfully");
    } catch (error) {
      console.error("Error deleting organization:", error);
      message.error("Failed to delete organization");
    }
  };

  const handleEdit = (organization) => {
    setSelectedOrganization(organization);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateOrganization(id, updatedData);
      setOrganizations(
        organizations.map((organization) =>
          organization.id === id
            ? { ...organization, ...updatedData }
            : organization
        )
      );
      message.success("Organization updated successfully");
    } catch (error) {
      console.error("Error updating organization:", error);
      message.error("Failed to update organization");
    }
  };

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveAdd = async (newData) => {
    try {
      const newOrganization = await registerOrganization(newData);
      setOrganizations([...organizations, newOrganization]);
      message.success("Organization added successfully");
    } catch (error) {
      console.error("Error adding organization:", error);
      message.error("Failed to add organization");
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
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            title="Are you sure to delete this organization?"
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
        <h2 className="text-2xl font-bold text-500">Organization List</h2>
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          Add Organization
        </Button>
      </div>
      <Table dataSource={organizations} columns={columns} rowKey="id" />
      {selectedOrganization && (
        <EditOrganizationModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          organization={selectedOrganization}
          onSave={handleSaveEdit}
        />
      )}
      <AddOrganizationModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleSaveAdd}
      />
    </div>
  );
};

export default OrganizationsTable;
