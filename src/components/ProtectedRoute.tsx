//-------import-------
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

//-------Props-------
type Props = {
  children: React.ReactNode;
};

//-------Component-------
function ProtectedRoute({ children }: Props) {
  //-------Hooks-------
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  //-------Authentication Check-------
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  //-------Return-------
  return children;
}

export default ProtectedRoute;
