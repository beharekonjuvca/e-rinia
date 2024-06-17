import React from "react";
import { Modal } from "antd";

const ViewEventModal = ({ visible, onClose, event }) => {
  return (
    <Modal
      visible={visible}
      title="Event Details"
      onCancel={onClose}
      footer={null}
    >
      {event && (
        <div>
          <p>
            <strong>Name:</strong> {event.name}
          </p>
          <p>
            <strong>Place:</strong> {event.place}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          {event.picture && (
            <img
              src={`http://localhost:4000${event.picture}`}
              alt={event.name}
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ViewEventModal;
