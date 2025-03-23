import { useState } from "react";

const AccountManagementPage = () => {
  const [username, setUsername] = useState("JohnDoe123");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic để thay đổi mật khẩu
    alert("Password changed successfully!");
  };

  const handleSaveChanges = () => {
    // Logic để lưu thay đổi thông tin tài khoản
    alert("Account information updated!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-primary-medium mb-8">
          Manage Your Account
        </h2>

        {/* User Information Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-gray-700 mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
              />
            </div>
          </div>
          <button
            onClick={handleSaveChanges}
            className="mt-4 px-6 py-2 bg-primary-medium text-white font-medium rounded-md hover:bg-primary-dark transition"
          >
            Save Changes
          </button>
        </div>

        {/* Change Password Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-2xl font-medium text-gray-700 mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-600">Current Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-600">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-medium"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-primary-medium text-white font-medium rounded-md hover:bg-primary-dark transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
