import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Navbar/Sidebar';

const Profile = () => {
  const user = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <div className="flex-1 overflow-y-auto">
          <div className="relative">
            <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="absolute -bottom-16 left-8">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-20 px-8">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">Frontend Developer</p>
            
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-2xl">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-xl font-bold">1.2k</div>
                <div className="text-gray-500">Followers</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-xl font-bold">234</div>
                <div className="text-gray-500">Following</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-xl font-bold">56</div>
                <div className="text-gray-500">Projects</div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow max-w-2xl">
              <h2 className="text-lg font-bold mb-4">About</h2>
              <p className="text-gray-600">
                Passionate frontend developer with expertise in React and TypeScript.
                Love creating beautiful and functional user interfaces.
              </p>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow max-w-2xl">
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>Updated portfolio project</div>
                  <div className="text-gray-400 text-sm">2 days ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>Created new repository</div>
                  <div className="text-gray-400 text-sm">5 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
