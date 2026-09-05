//-------import-------
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//-------Props-------
type Props = {
  children: React.ReactNode;
};

//-------Component-------
function ProtectedRoute({ children }: Props) {
  //-------Auth-------
  const { user, isLoading } = useAuth();

  //-------Location-------
  const location = useLocation();

  //-------Loading-------
  if (isLoading) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  }

  //-------Authentication Check-------
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  //-------Protected Content-------
  return children;
}

//-------Export-------
export default ProtectedRoute;
