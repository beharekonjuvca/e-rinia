import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker } from "antd";

const CreateEventModal = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const eventData = {
        ...values,
        date: values.date.toISOString(),
      };
      await onSave(eventData);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Add Event"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the event name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="place"
          label="Place"
          rules={[{ required: true, message: "Please input the event place!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          //rules={[{ required: true, message: "Please input the event date!" }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
