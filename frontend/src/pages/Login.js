import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const userData = jwtDecode(credential);
      const result = await axios.post(process.env.REACT_APP_GOOGLE_LOGIN_API, {
        googleId: userData.sub,
        firstName: userData.given_name,
        lastName: userData.family_name,
        email: userData.email,
      });

      message.success(result.data.message || 'Logged in successfully!');
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      localStorage.setItem('isAuthenticated', 'true');
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
      const result = await axios.post(process.env.REACT_APP_LOGIN_API, values);
      message.success(result.data.message || 'Logged in successfully!');
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      localStorage.setItem('isAuthenticated', 'true');
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
