import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext"; // Ensure the path is correct
import { getAdminById, decodeToken, verifyToken } from "../../endpoints"; // Ensure the path is correct

const AdminProfileDropdown = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (verifyToken()) {
          const adminId = decodeToken(); // Decode token to get admin ID
          if (adminId) {
            const adminData = await getAdminById(adminId);
            setAdmin(adminData);
          }
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logging out
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          <UserOutlined /> My Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/settings">
          <SettingOutlined /> Account Settings
        </Link>
      ),
    },
    {
      key: "3",
      danger: true,
      label: (
        <a onClick={handleLogout}>
          <LogoutOutlined /> Log Out
        </a>
      ),
    },
  ];

  return (
    <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
      <a
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-4"
      >
        <Space>
          <img
            src="/path/to/user-image.jpg"
            alt="User"
            className="h-12 w-12 rounded-full"
          />
          <span className="hidden lg:block">
            <span className="block text-sm font-medium text-white dark:text-white">
              {admin ? admin.name : "Loading..."}
            </span>
            {/* Adjust role as necessary */}
          </span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default AdminProfileDropdown;
