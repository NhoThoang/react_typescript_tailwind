import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { login, logout } from "../redux/authSlice";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return {
    auth,
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  };
};
