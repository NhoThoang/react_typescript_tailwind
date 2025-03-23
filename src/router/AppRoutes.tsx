import { Routes, Route } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import DashboardPage from "../pages/Dashboard/Dashboard";
import AccountManagementPage from "../pages/accounts/accounts";
import Setting from "../pages/Setting/Settings";
import Profile from "../pages/Profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/accounts" element={<AccountManagementPage />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
