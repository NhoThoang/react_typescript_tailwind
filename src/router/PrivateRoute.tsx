import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();

  // Nếu người dùng chưa đăng nhập, chuyển hướng về trang đăng nhập
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
