import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Signup.css';

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const clientId =
    '781927388309-9424rc0fqhojghcqeud0b4p26pnmvop5.apps.googleusercontent.com';

  const [form] = Form.useForm();

  const onGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const userData = jwtDecode(credential);
      const result = await axios.post(
        `https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/auth/google-signup`,
        {
          googleId: userData.sub,
          firstName: userData.given_name,
          lastName: userData.family_name,
          email: userData.email,
        }
      );

      message.success(result.data.message || 'Signed up successfully!');
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      navigate('/notes');
    } catch (error) {
      console.error('Google Signup Error:', error);
      message.error(
        error.response?.data?.message ||
          'Something went wrong during signup. Please try again.'
      );
    }
  };

  const onGoogleFailure = (response) => {
    console.log('Google Signup Failed:', response);
    message.error('Google Signup Failed. Please try again.');
  };

  const onFinish = async (values) => {
    try {
      const result = await axios.post(
        `https://tmu-d5fechcvf6g3awgn.eastus-01.azurewebsites.net/api/auth/signup`,
        values
      );

      message.success('Signed up successfully!');
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      navigate('/notes');
    } catch (error) {
      console.error('Signup Error:', error);
      message.error('Something went wrong during signup. Please try again.');
    }
  };

  return (
    <Row justify="center" align="middle" className="signup-container">
      <Col span={8}>
        <div className="signup-card">
          <Title level={2} className="signup-title">
            Sign Up
          </Title>
          <Form
            name="signup_form"
            form={form}
            onFinish={onFinish}
            className="signup-form"
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: 'Please input your First Name!' },
              ]}
            >
              <Input placeholder="First Name" className="signup-input" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: 'Please input your Last Name!' },
              ]}
            >
              <Input placeholder="Last Name" className="signup-input" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'The input is not valid E-mail!' },
              ]}
            >
              <Input placeholder="Email" className="signup-input" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password placeholder="Password" className="signup-input" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your Password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                className="signup-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-button-primary"
              >
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => navigate('/login')}
                className="signup-button-link"
              >
                Already have an account? Log in
              </Button>
            </Form.Item>
          </Form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
              width: '100%',
            }}
          >
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleFailure}
              clientId={clientId}
              render={(renderProps) => (
                <Button
                  icon={<GoogleOutlined />}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="google-button"
                >
                  Sign up with Google
                </Button>
              )}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Signup;
