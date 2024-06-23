import React, { useState, useEffect } from 'react';
import NoteCard from '../components/cards/Card';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import CustomButton from '../components/buttons/button';
import './Notes.css';
import axios from 'axios';
import dayjs from 'dayjs';
const { Option } = Select;

const Notes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [sampleData, setSampleData] = useState();
  const [refreshTrigger, setRefreshTrigger] = useState(true);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingTask, setEditingTask] = useState(null);

  const getTodo = async () => {
    try {
      const response = await axios.get('/api/v1/getaTodo');
      setSampleData(response.data.data);
      console.log(response.data.data);
      setRefreshTrigger(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getTodo();
  }, [refreshTrigger]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log('sample Data is', sampleData);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);
        axios
          .post('http://localhost:4000/api/v1/createTodo', {
            title: values.title,
            description: values.description,
            dueDate: values.dueDate,
            label: values.label,
          })
          .then((response) => {
            console.log('API response:', response.data);
            setIsModalVisible(false);
            form.resetFields();
            setRefreshTrigger(true);
          })
          .catch((error) => {
            console.error('API error:', error);
          });
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
      dueDate: dayjs(task.dueDate),
      label: task.label,
    });
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    editForm
      .validateFields()
      .then((values) => {
        console.log('Edit form values:', values);
        console.log('Editing task id:', editingTask._id);

        axios
          .put(
            `http://localhost:4000/api/v1/updateTodo/${editingTask._id}`,
            values
          )
          .then((response) => {
            console.log('Update successful:', response.data);
            setIsEditModalVisible(false);
            editForm.resetFields();
            setRefreshTrigger(true);
            // Update the local state with the updated task
          })
          .catch((error) => {
            console.error('Update failed:', error);
          });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/deleteTodo/${id}`)
      .then((response) => {
        console.log('Delete successful:', response.data);
        setRefreshTrigger(true);
      })
      .catch((error) => {
        console.error('Delete failed:', error);
      });
  };

  return (
    <div>
      <div className="notesHeader">
        <div>Notes</div>
        <CustomButton className="add-button" onClick={showModal}>
          <UilPlus className="icon" /> Add Task
        </CustomButton>
      </div>
      {Array.isArray(sampleData) && sampleData.length > 0 ? (
        <div className="card-container">
          {sampleData.map((note) => (
            <NoteCard
              key={note._id}
              data={note}
              onDelete={() => handleDelete(note._id)}
              onEdit={() => showEditModal(note)}
            />
          ))}
        </div>
      ) : (
        <div>No data found</div>
      )}

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
              { max: 32, message: 'Title cannot exceed 32 characters' },
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
            <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
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
              { max: 32, message: 'Title cannot exceed 32 characters' },
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
            <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
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
