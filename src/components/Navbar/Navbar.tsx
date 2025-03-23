import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { User } from "lucide-react";

interface NavbarProps {
  user?: {
    name: string;
    avatar: string;
  }
}

const Navbar = ({ user }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/5 text-gray-800 relative z-50">
      <div className="px-6 py-3 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-semibold">Welcome, {user?.name || 'Guest'}</h2>
        </div>
        
        <div className="flex items-center space-x-3 relative">
          {user && (
            <>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 hover:text-purple-700 transition-colors p-2 rounded-full hover:bg-white/20"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-purple-400"
                />
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 py-2 bg-white shadow-xl rounded-lg border border-gray-100
                  transition-all duration-200 ease-out
                  opacity-100 scale-100 transform
                  hover:shadow-2xl z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">Signed in</p>
                      </div>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center space-x-2">
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center space-x-2">
                        <span>Settings</span>
                      </button>
                      <hr className="my-2 border-gray-100" />
                      <button className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2">
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="w-full text-left px-4 py-2.5 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center space-x-2">
                      <span>Sign in</span>
                    </Link>
                  )}
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
