import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import VolunteerTable from "./components/Volunteer/VolunteerTable";
import OrganizationsTable from "./components/Organizations/OrganizationsTable";
import Header from "./layout/Header";
import VolunteerHeader from "./layout/VolunteerHeader";
import AdminLogin from "./components/Admin/AdminLogin"; // Ensure the path is correct
import VolunteerLogin from "./components/Volunteer/VolunteerLogin"; // Ensure the path is correct
import OrganizationLogin from "./components/Organizations/OrganizationLogin"; // Ensure the path is correct
import AdminProtectedRoute from "./Auth/AdminProtectedRoute"; // Ensure the path is correct
import VolunteerProtectedRoute from "./Auth/VolunteerProtectedRoute"; // Ensure the path is correct
import OrganizationProtectedRoute from "./Auth/OrganizationProtectedRoute"; // Ensure the path is correct
import EventsTable from "./components/Events/EventsTable";
import AdminProfile from "./components/Admin/AdminProfile";
import { AuthProvider } from "./Auth/AuthContext"; // Ensure the path is correct
import EventGallery from "./components/Events/EventGallery";
import OrganizationGallery from "./components/Organizations/OrganizationGallery";
import EventsOrganizationTable from "./components/Events/EventsOrganizationTable";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/volunteer/login" element={<VolunteerLogin />} />
          <Route path="/organization/login" element={<OrganizationLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/volunteer/*"
            element={
              <VolunteerProtectedRoute>
                <div className="flex h-screen">
                  <div className="flex-1 flex flex-col">
                    <VolunteerHeader toggleSidebar={toggleSidebar} />
                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                      <Routes>
                        <Route path="/" element={<EventGallery />} />
                        <Route
                          path="/organizations"
                          element={<OrganizationGallery />}
                        />
                      </Routes>
                    </main>
                  </div>
                </div>
              </VolunteerProtectedRoute>
            }
          />
          <Route
            path="/organization/*"
            element={
              <OrganizationProtectedRoute>
                <div className="flex h-screen">
                  <div className="flex-1 flex flex-col">
                    <Header toggleSidebar={toggleSidebar} />
                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                      <Routes>
                        <Route
                          path="/organizations"
                          element={<OrganizationsTable />}
                        />
                        <Route
                          path="/events"
                          element={<EventsOrganizationTable />}
                        />
                      </Routes>
                    </main>
                  </div>
                </div>
              </OrganizationProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <AdminProtectedRoute>
                <div className="flex h-screen">
                  <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                  />
                  <div className="flex-1 flex flex-col">
                    <Header toggleSidebar={toggleSidebar} />
                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                      <Routes>
                        <Route path="/" element={<VolunteerTable />} />
                        <Route
                          path="/volunteers"
                          element={<VolunteerTable />}
                        />
                        <Route
                          path="/organizations"
                          element={<OrganizationsTable />}
                        />
                        <Route path="/events" element={<EventsTable />} />
                        <Route path="/profile" element={<AdminProfile />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
