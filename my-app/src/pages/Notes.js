import React, { useState } from 'react';
import NoteCard from '../components/cards/Card';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import CustomButton from '../components/buttons/button';
import './Notes.css';
import moment from 'moment';
const { Option } = Select;
const sampleData = [
  {
    id: '1',
    title: 'Personal Note',
    key: 1,
    description: 'This is a personal note description.',
    dueDate: '19/4/24',
    label: 'personal',
  },
  {
    id: '2',
    title: 'Work Note',
    key: 2,
    description: 'This is a work note description.',
    dueDate: '19/4/24',
    label: 'work',
  },
  {
    id: '3',
    title: 'Social Note',
    key: 3,
    description: 'This is a social note description.',
    dueDate: '19/4/24',
    label: 'work',
  },
  {
    id: '4',
    title: 'Important Note',
    key: 4,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '5',
    title: 'Important Note',
    key: 5,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '6',
    title: 'Important Note',
    key: 6,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '7',
    title: 'Important Note',
    key: 7,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '8',
    title: 'Important Note',
    key: 8,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '9',
    title: 'Important Note',
    key: 9,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '10',
    title: 'Important Note',
    key: 10,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '11',
    title: 'Important Note',
    key: 11,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '12',
    title: 'Important Note',
    key: 12,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '13',
    title: 'Important Note',
    key: 13,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '14',
    title: 'Important Note',
    key: 14,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '15',
    title: 'Important Note',
    key: 15,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '16',
    title: 'Important Note',
    key: 16,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '17',
    title: 'Important Note',
    key: 17,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    id: '18',
    title: 'Important Note',
    key: 18,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    title: 'Important Note',
    key: 19,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    title: 'Important Note',
    key: 20,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    title: 'Important Note',
    key: 21,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    title: 'Important Note',
    key: 22,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    title: 'Important Note',
    key: 23,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
  {
    title: 'Important Note',
    key: 24,
    description: 'This is an important note description.',
    dueDate: '19/4/24',
    label: 'important',
  },
];

const Notes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingTask, setEditingTask] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showEditModal = (task) => {
    setEditingTask(task);
    editForm.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: moment(task.dueDate),
      label: task.label,
    });
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    editForm
      .validateFields()
      .then((values) => {
        console.log('Edit form values:', values);
        console.log('Editing task id:', editingTask.id);
        setIsEditModalVisible(false);
        editForm.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const handleDelete = (key) => {
    console.log(`Delete note with key ${key}`);
  };

  return (
    <div>
      <div className="notesHeader">
        <div>Notes</div>
        <CustomButton className="add-button" onClick={showModal}>
          <UilPlus className="icon" /> Add Task
        </CustomButton>
      </div>
      <div className="card-container">
        {sampleData.map((note) => (
          <NoteCard
            key={note.key}
            data={note}
            onDelete={handleDelete}
            onEdit={() => showEditModal(note)}
          />
        ))}
      </div>
      <Modal
        title="Add Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="add-modal"
      >
        <Form form={form} layout="vertical" name="taskForm">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please enter the task description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter the task description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select the due date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="label"
            label="Label"
            rules={[{ required: true, message: 'Please select a label' }]}
          >
            <Select>
              <Option value="personal">Personal</Option>
              <Option value="work">Work</Option>
              <Option value="important">Important</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Modify Task"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        className="edit-modal"
      >
        <Form form={editForm} layout="vertical" name="editTaskForm">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please enter the task description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Task Description"
            rules={[
              { required: true, message: 'Please enter the task description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select the due date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="label"
            label="Label"
            rules={[{ required: true, message: 'Please select a label' }]}
          >
            <Select>
              <Option value="personal">Personal</Option>
              <Option value="work">Work</Option>
              <Option value="important">Important</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Notes;
