import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct way to import jwt-decode

const API_BASE_URL = "http://localhost:4000/api/"; // Adjust this as necessary

// Helper function to get the auth token
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Login Admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}admin/login`,
      credentials
    );
    const token = response.data.token;

    // Store the token in local storage
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Create Admin
export const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin`, adminData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Get All Admins
export const getAllAdmins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

// Get Admin by ID
export const getAdminById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}admin/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw error;
  }
};

// Update Admin
export const updateAdmin = async (id, adminData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}admin/${id}`, adminData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

// Delete Admin
export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}admin/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};

// Decode token to get admin ID
export const decodeToken = () => {
  const token = getAuthToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.admin.id;
  }
  return null;
};
export const decodeOrganizationToken = () => {
  const token = getAuthToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.organization.id;
  }
  return null;
};
export const verifyToken = () => {
  const token = getAuthToken();
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token has expired
      console.log("Token has expired");
      return false;
    }
    return true;
  }
  return false;
};
export const loginVolunteer = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}volunteer/login`,
      credentials
    );
    const token = response.data.token;

    // Store the token in local storage
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const registerVolunteer = async (volunteerData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}volunteer/register`,
      volunteerData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering volunteer:", error);
    throw error;
  }
};
export const getAllVolunteers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}volunteer`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    throw error;
  }
};
export const getVolunteerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}volunteer/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    throw error;
  }
};
export const updateVolunteer = async (id, volunteerData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}volunteer/${id}`,
      volunteerData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating volunteer:", error);
    throw error;
  }
};
export const deleteVolunteer = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}volunteer/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    throw error;
  }
};
export const favoriteOrganization = async (organizationId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}volunteer/favorite-organization`,
      { organizationId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error favoriting organization:", error);
    throw error;
  }
};
export const unfavoriteOrganization = async (organizationId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}volunteer/unfavorite-organization`,
      { organizationId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error favoriting organization:", error);
    throw error;
  }
};
export const getLikedOrganizations = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}volunteer/liked-organizations`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching liked organizations:", error);
    throw error;
  }
};
// Register Organization
export const registerOrganization = async (organizationData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}organization`,
      organizationData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering organization:", error);
    throw error;
  }
};

// Login Organization
export const loginOrganization = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}organization/login`,
      credentials
    );
    const token = response.data.token;

    // Store the token in local storage
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Get All Organizations
export const getAllOrganizations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}organization`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

// Get Organization by ID
export const getOrganizationById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}organization/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching organization:", error);
    throw error;
  }
};

// Update Organization
export const updateOrganization = async (id, organizationData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}organization/${id}`,
      organizationData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating organization:", error);
    throw error;
  }
};

// Delete Organization
export const deleteOrganization = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}organization/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting organization:", error);
    throw error;
  }
};

// Upload Organization Picture
export const uploadOrganizationPicture = async (id, formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}organization/upload/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading organization picture:", error);
    throw error;
  }
};
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/events",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Update Event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}events/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Delete Event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}events/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// Approve Event
export const approveEvent = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}events/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving event:", error);
    throw error;
  }
};

// Get All Events
export const getAllEvents = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events`, {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get Event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

// Get Events by Organization ID
export const getEventsByOrganization = async (orgId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}events/organization/${orgId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events by organization:", error);
    throw error;
  }
};

// Upload Event Picture
export const uploadEventPicture = async (id, formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}events/upload/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading event picture:", error);
    throw error;
  }
};
