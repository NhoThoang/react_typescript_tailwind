import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { getUserPaths } from '../api/userApi';

const MainLayout = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const avatarUrl = localStorage.getItem('avatarUrl');
      const avatarExpiry = localStorage.getItem('avatarExpiry');
      
      if (avatarUrl && avatarExpiry && new Date().getTime() < parseInt(avatarExpiry)) {
        setAvatar(avatarUrl);
      } else {
        fetchUserAvatar();
      }
    }
  }, []);

  const fetchUserAvatar = async () => {
    try {
      const { avatarPath } = await getUserPaths();
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('avatarUrl', avatarPath);
      localStorage.setItem('avatarExpiry', expiry.toString());
      setAvatar(avatarPath);
    } catch (error) {
      console.error('Error fetching user avatar:', error);
      setAvatar('/images/default-avatar.png');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userAvatar={avatar} />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 