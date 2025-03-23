import { Home, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } bg-white/30 backdrop-blur-sm shadow-lg flex flex-col py-8 space-y-8 transition-all duration-300 ease-in-out relative group`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="px-4">
        <div 
          className="p-3 rounded-xl bg-purple-100 flex items-center cursor-pointer hover:bg-purple-200 transition-colors"
          onClick={() => navigate('/dashboard')}
        >
          <h2 className="text-2xl font-bold text-purple-600">D</h2>
          {isExpanded && <span className="ml-3 font-bold text-purple-600">Dashboard</span>}
        </div>
      </div>
      <nav className="flex flex-col space-y-6 px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center p-3 rounded-xl hover:bg-purple-100 transition-colors group"
        >
          <Home className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          {isExpanded && <span className="ml-3 text-gray-600 group-hover:text-purple-600">Home</span>}
        </button>
        <button 
          onClick={() => navigate('/settings')} 
          className="flex items-center p-3 rounded-xl hover:bg-purple-100 transition-colors group"
        >
          <Settings className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          {isExpanded && <span className="ml-3 text-gray-600 group-hover:text-purple-600">Settings</span>}
        </button>
        <button
            onClick={() => navigate('/profile')}
            className="flex items-center p-3 rounded-xl hover:bg-purple-100 transition-colors group">
            <User className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
            {isExpanded && <span className="ml-3 text-gray-600 group-hover:text-purple-600">Profile</span>}
        </button>
        <button className="flex items-center p-3 rounded-xl hover:bg-purple-100 transition-colors group">
          <LogOut className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          {isExpanded && <span className="ml-3 text-gray-600 group-hover:text-purple-600">Logout</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
