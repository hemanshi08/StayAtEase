import React from 'react';
import { Card, Button, Avatar, Typography, Space, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-96">
          <Title level={4} className="text-center">Please login to view your profile</Title>
          <Button type="primary" block onClick={() => navigate('/login')}>
            Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <Avatar size={100} icon={<UserOutlined />} className="mb-4" />
            <Title level={2}>{user.name}</Title>
            <Text type="secondary" className="text-lg">{user.email}</Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <Title level={4}>Account Information</Title>
              <Space direction="vertical" className="mt-4">
                <div>
                  <Text strong>User Type:</Text>
                  <Text className="ml-2 capitalize">{user.userType}</Text>
                </div>
                <div>
                  <Text strong>Email:</Text>
                  <Text className="ml-2">{user.email}</Text>
                </div>
                <div>
                  <Text strong>Member Since:</Text>
                  <Text className="ml-2">2024</Text>
                </div>
              </Space>
            </Card>

            <Card>
              <Title level={4}>Account Actions</Title>
              <Space direction="vertical" className="mt-4 w-full">
                <Button 
                  type="primary" 
                  danger 
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  block
                >
                  Logout
                </Button>
              </Space>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 