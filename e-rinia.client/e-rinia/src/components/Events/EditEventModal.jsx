import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment"; // Import moment

const EditEventModal = ({ visible, onClose, event, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave(event.id, { ...values, date: values.date.toISOString() });
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Event"
      visible={visible}
      onOk={handleSave}
      onCancel={onClose}
      okText="Save"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: event.name,
          place: event.place,
          date: moment(event.date), // Use moment to handle the date
          description: event.description,
        }}
      >
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
          rules={[{ required: true, message: "Please select the event date!" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEventModal;
