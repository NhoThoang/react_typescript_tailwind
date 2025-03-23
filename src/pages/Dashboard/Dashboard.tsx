import { FileText, FilePen, FileCode, FileSpreadsheet, Image, Home, Settings, User, LogOut } from "lucide-react";

const DashboardPage = () => {
  const dashboardData = [
    {
      title: "Total PDFs Processed",
      count: "1,234",
      icon: FileText,
      color: "#FF6347",
    },
    {
      title: "Pending Tasks",
      count: "45",
      icon: FilePen,
      color: "#FF9900",
    },
    {
      title: "Processed Files",
      count: "987",
      icon: FileCode,
      color: "#1E90FF",
    },
    {
      title: "Users Online",
      count: "67",
      icon: FileSpreadsheet,
      color: "#32CD32",
    },
    {
      title: "Images Converted",
      count: "567",
      icon: Image,
      color: "#FFD700",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
      {/* Sidebar */}
      <div className="w-20 bg-white/80 backdrop-blur-sm shadow-lg flex flex-col items-center py-8 space-y-8">
        <div className="p-3 rounded-xl bg-purple-100">
          <h2 className="text-2xl font-bold text-purple-600">D</h2>
        </div>
        <nav className="flex flex-col items-center space-y-6">
          <button className="p-3 rounded-xl hover:bg-purple-100 transition-colors group">
            <Home className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          </button>
          <button className="p-3 rounded-xl hover:bg-purple-100 transition-colors group">
            <Settings className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          </button>
          <button className="p-3 rounded-xl hover:bg-purple-100 transition-colors group">
            <User className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          </button>
          <button className="p-3 rounded-xl hover:bg-purple-100 transition-colors group">
            <LogOut className="w-6 h-6 text-gray-600 group-hover:text-purple-600" />
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
          </div>
          <button className="bg-purple-600 text-white py-2.5 px-5 rounded-lg hover:bg-purple-700 transition-colors">
            New Task
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {dashboardData.map(({ title, count, icon: Icon, color }, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-6 h-6" color={color} />
                </div>
                <span className="text-2xl font-bold" style={{ color: color }}>{count}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">Processed File #123</span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">New User Registered</span>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FilePen className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="font-medium text-gray-700">PDF Edited: Report</span>
              </div>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
