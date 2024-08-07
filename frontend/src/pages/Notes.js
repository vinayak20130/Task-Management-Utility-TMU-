import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import NoteCard from '../components/cards/Card';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { Modal, Form, Input, DatePicker, Select, Row, Col, Button } from 'antd';
import CustomButton from '../components/buttons/button';
import './Notes.css';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

const blockNavigationToLogin = () => {
  window.history.pushState(null, null, window.location.href);
  window.addEventListener('popstate', () => {
    window.history.pushState(null, null, window.location.href);
  });
};

const Notes = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(true);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else {
      blockNavigationToLogin();
    }

    getTodo();
  }, [navigate, refreshTrigger]);

  const getTodo = async () => {
    try {
      const response = await axios.get(`https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/v1/getaTodo`);
      setSampleData(response.data.data);
      setFilteredData(response.data.data);
      setRefreshTrigger(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        axios
          .post(`https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/v1/createTodo`, {
            title: values.title,
            description: values.description,
            dueDate: values.dueDate,
            label: values.label,
          })
          .then(() => {
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
        axios
          .put(
            `https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/v1/updateTodo/${editingTask._id}`,
            values
          )
          .then(() => {
            setIsEditModalVisible(false);
            editForm.resetFields();
            setRefreshTrigger(true);
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
      .delete(`https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/v1/deleteTodo/${id}`)
      .then(() => {
        setRefreshTrigger(true);
      })
      .catch((error) => {
        console.error('Delete failed:', error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  useEffect(() => {
    let filtered = sampleData;

    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((task) => task.label === filterStatus);
    }

    setFilteredData(filtered);
  }, [searchTerm, filterStatus, sampleData]);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="notesHeader">
        <div>
          <CustomButton className="add-button" onClick={showModal}>
            <UilPlus className="icon" /> Add Task
          </CustomButton>
        </div>
        <div className="filters">
          <Input
            placeholder="Search tasks by name"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: 200, marginRight: 10 }}
          />
          <Select
            placeholder="Filter by status"
            value={filterStatus}
            onChange={handleStatusChange}
            style={{ width: 200 }}
          >
            <Option value="">All</Option>
            <Option value="todo">Todo</Option>
            <Option value="inprogress">In Progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </div>
        <Button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </Button>
      </div>
      <Row gutter={16}>
        <Col span={8}>
          <h3>Todo</h3>
          {filteredData
            .filter((note) => note.label === 'todo')
            .map((note) => (
              <NoteCard
                key={note._id}
                data={note}
                onDelete={() => handleDelete(note._id)}
                onEdit={() => showEditModal(note)}
              />
            ))}
        </Col>
        <Col span={8}>
          <h3>In Progress</h3>
          {filteredData
            .filter((note) => note.label === 'inprogress')
            .map((note) => (
              <NoteCard
                key={note._id}
                data={note}
                onDelete={() => handleDelete(note._id)}
                onEdit={() => showEditModal(note)}
              />
            ))}
        </Col>
        <Col span={8}>
          <h3>Done</h3>
          {filteredData
            .filter((note) => note.label === 'done')
            .map((note) => (
              <NoteCard
                key={note._id}
                data={note}
                onDelete={() => handleDelete(note._id)}
                onEdit={() => showEditModal(note)}
              />
            ))}
        </Col>
      </Row>

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
              { max: 28, message: 'Title cannot exceed 28 characters' },
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
            <Input.TextArea rows={4} />
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
              <Option value="todo">Todo</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="done">Done</Option>
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
              { max: 28, message: 'Title cannot exceed 28 characters' },
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
            <Input.TextArea rows={4} />
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
              <Option value="todo">Todo</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Notes;
