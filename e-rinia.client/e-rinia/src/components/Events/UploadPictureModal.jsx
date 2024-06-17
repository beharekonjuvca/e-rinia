import React from "react";
import { Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadPictureModal = ({ visible, onClose, onUpload }) => {
  const handleFileChange = ({ file }) => {
    if (file.status !== "removed") {
      console.log("Selected file:", file.originFileObj); // Debug log
      onUpload(file.originFileObj); // Trigger the upload callback
    }
  };

  const handleUploadClick = () => {
    if (file) {
      console.log("Uploading file:", file); // Debug log
      onUpload(file); // Trigger the upload callback
      onClose();
    } else {
      message.error("Please select a file first");
    }
  };

  return (
    <Modal
      visible={visible}
      title="Upload Event Picture"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUploadClick}>
          Upload
        </Button>,
      ]}
    >
      <Upload
        beforeUpload={() => false} // Prevent automatic upload
        onChange={handleFileChange}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  );
};

export default UploadPictureModal;
