import React, { useEffect, useState } from "react";
import { Card, Spin, Alert } from "antd";
import { getAdminById, decodeToken, verifyToken } from "../../endpoints"; // Ensure the path is correct
import { useAuth } from "../../Auth/AuthContext"; // Ensure the path is correct

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminId = decodeToken(authToken); // Replace this with the actual method to get admin ID from token
        const data = await getAdminById(adminId);
        setAdminData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [authToken]);

  if (loading) {
    return <Spin tip="Loading admin profile..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card title="Admin Profile">
      <p>
        <strong>Name:</strong> {adminData.name}
      </p>
      <p>
        <strong>Email:</strong> {adminData.email}
      </p>
    </Card>
  );
};

export default AdminProfile;
