import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import {
  getAllOrganizations,
  favoriteOrganization,
  unfavoriteOrganization,
  getLikedOrganizations,
} from "../../endpoints"; // Ensure the path is correct
import { useAuth } from "../../Auth/AuthContext"; // Ensure the path is correct

const { Meta } = Card;

const OrganizationGallery = () => {
  const [organizations, setOrganizations] = useState([]);
  const [likedOrganizations, setLikedOrganizations] = useState([]);
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgData = await getAllOrganizations();
        setOrganizations(orgData);

        const likedOrgData = await getLikedOrganizations();
        setLikedOrganizations(likedOrgData);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleFavorite = async (organizationId) => {
    try {
      await favoriteOrganization(organizationId);
      setLikedOrganizations([...likedOrganizations, organizationId]);
      message.success("Organization favorited successfully");
    } catch (error) {
      console.error("Error favoriting organization:", error);
      message.error("Failed to favorite organization");
    }
  };

  const handleUnfavorite = async (organizationId) => {
    try {
      await unfavoriteOrganization(organizationId);
      setLikedOrganizations(
        likedOrganizations.filter((id) => id !== organizationId)
      );
      message.success("Organization unfavorited successfully");
    } catch (error) {
      console.error("Error unfavoriting organization:", error);
      message.error("Failed to unfavorite organization");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {organizations.map((organization) => (
          <div
            key={organization.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={`http://localhost:4000${organization.picture}`}
              alt={organization.name}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{organization.name}</h2>
              <p className="text-gray-600">{organization.description}</p>
              <p className="text-gray-500">{organization.type}</p>
              <div className="mt-4">
                {likedOrganizations.includes(organization.id) ? (
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleUnfavorite(organization.id)}
                  >
                    Unfavorite
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handleFavorite(organization.id)}
                  >
                    Favorite
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationGallery;
