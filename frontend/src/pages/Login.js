// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login from the AuthContext
  const clientId =
    '781927388309-9424rc0fqhojghcqeud0b4p26pnmvop5.apps.googleusercontent.com';

  const onGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const userData = jwtDecode(credential);
      const result = await axios.post(
        `https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/auth/google-signin`,
        {
          googleId: userData.sub,
          firstName: userData.given_name,
          lastName: userData.family_name,
          email: userData.email,
        }
      );

      message.success(result.data.message || 'Logged in successfully!');
      login(result.data.user, result.data.token); // Use the login function from the context
      navigate('/notes');
    } catch (error) {
      console.error('Google Login Error:', error);
      message.error(
        error.response?.data?.message ||
          'Something went wrong during login. Please try again.'
      );
    }
  };

  const onGoogleLoginFailure = (response) => {
    console.log('Google Login Failed:', response);
    message.error('Google Login Failed. Please try again.');
  };

  const onFinish = async (values) => {
    try {
      const result = await axios.post(
        `https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/auth/login`,
        values
      );
      message.success(result.data.message || 'Logged in successfully!');
      login(result.data.user, result.data.token); // Use the login function from the context
      navigate('/notes');
    } catch (error) {
      console.error('Login Error:', error);
      message.error(
        error.response?.data?.message ||
          'Something went wrong during login. Please try again.'
      );
    }
  };

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col span={8}>
        <div className="login-card">
          <Title level={2} className="login-title">
            Notes
          </Title>
          <Form name="login_form" onFinish={onFinish} className="login-form">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'The input is not valid E-mail!' },
              ]}
            >
              <Input placeholder="Email" className="login-input" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password placeholder="Password" className="login-input" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => navigate('/signup')}
                style={{ paddingLeft: 0 }}
              >
                Don't have an account? Sign up
              </Button>
            </Form.Item>
          </Form>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleLoginFailure}
              clientId={clientId}
              render={(renderProps) => (
                <Button
                  icon={<GoogleOutlined />}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google-button"
                >
                  Sign in with Google
                </Button>
              )}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
