import React, { useState } from "react";
import { Button, message } from "antd";
import CreateEventModal from "./CreateEventModal";
import UploadPictureModal from "./UploadPictureModal";
import { createEvent, uploadEventPicture } from "../../endpoints"; // Ensure the path is correct

const EventManagement = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  const handleSaveEvent = async (eventData) => {
    try {
      const response = await createEvent(eventData);
      setCurrentEventId(response.id);
      setIsCreateModalVisible(false);
      setIsUploadModalVisible(true);
    } catch (error) {
      console.error("Error saving event:", error);
      message.error("Failed to save event");
    }
  };

  const handleUploadPicture = async (formData) => {
    try {
      await uploadEventPicture(currentEventId, formData);
      message.success("Picture uploaded successfully");
    } catch (error) {
      console.error("Error uploading picture:", error);
      message.error("Failed to upload picture");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
        Add Event
      </Button>

      <CreateEventModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSave={handleSaveEvent}
      />

      <UploadPictureModal
        visible={isUploadModalVisible}
        onClose={() => setIsUploadModalVisible(false)}
        onUpload={handleUploadPicture}
      />
    </div>
  );
};

export default EventManagement;
