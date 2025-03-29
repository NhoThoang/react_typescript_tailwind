import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, MessageCircle, Bell, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserPaths } from '../../api/userApi';
import React from "react";

interface NavbarProps {
  user?: {
    name: string;
    avatar: string;
  }
}

const Navbar = ({ user }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setSessionUser(username);
    }
  }, []);

  useEffect(() => {
    if (sessionUser) {
      const avatarUrl = localStorage.getItem('avatarUrl');
      const avatarExpiry = localStorage.getItem('avatarExpiry');
      
      if (avatarUrl && avatarExpiry && new Date().getTime() < parseInt(avatarExpiry)) {
        console.log('Using cached avatar once');
        setUserAvatar(avatarUrl);
      } else {
        console.log('Fetching new avatar once');
        fetchUserAvatar(sessionUser);
      }
    }
  }, [sessionUser]);

  const fetchUserAvatar = React.useCallback(async (username: string) => {
    try {
      console.log('Calling API to get avatar path...');
      const { avatarPath } = await getUserPaths();
      
      const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('avatarUrl', avatarPath);
      localStorage.setItem('avatarExpiry', expiry.toString());
      setUserAvatar(avatarPath);
    } catch (error) {
      console.error('Error fetching user avatar:', error);
      setUserAvatar('/images/default-avatar.png');
    }
  }, []);

  const displayUser = React.useMemo(() => {
    return sessionUser ? { 
      name: sessionUser, 
      avatar: userAvatar || '/images/default-avatar.png' 
    } : user;
  }, [sessionUser, userAvatar, user]);

  const handleLogout = () => {
    console.log('Clearing avatar cache...');
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('avatarExpiry');
    navigate('/logout');
  };

  return (
    <nav className="bg-white/5 text-gray-800 relative z-50">
      <div className="px-6 py-3 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 w-[300px]"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 relative">
          <button 
            onClick={() => navigate('/message')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-6 h-6" />
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 py-2 bg-white shadow-xl rounded-lg border border-gray-100
                transition-all duration-200 ease-out
                opacity-100 scale-100 transform
                hover:shadow-2xl z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">Notifications</p>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {/* Example notifications */}
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-800">New message from John</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm text-gray-800">Someone liked your post</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {displayUser && (
            <>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-white/20"
              >
                <img 
                  src={displayUser.avatar} 
                  alt={displayUser.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-400"
                />
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 py-2 bg-white shadow-xl rounded-lg border border-gray-100
                  transition-all duration-200 ease-out
                  opacity-100 scale-100 transform
                  hover:shadow-2xl z-50">
                  {displayUser && displayUser.name ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h4 className="text-sm font-medium text-gray-800">{displayUser.name}</h4>
                        <span className="text-xs text-gray-500">Signed in</span>
                      </div>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center space-x-2">
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center space-x-2">
                        <span>Settings</span>
                      </button>
                      <hr className="my-2 border-gray-100" />
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2">
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span className="font-medium">Sign in</span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          {!displayUser && (
            <>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-white/20"
              >
                <span>Login</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 py-2 bg-white shadow-xl rounded-lg border border-gray-100
                  transition-all duration-200 ease-out
                  opacity-100 scale-100 transform
                  hover:shadow-2xl z-50">
                  <button 
                    onClick={() => {
                      navigate('/login');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <span className="font-medium">Sign in</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
