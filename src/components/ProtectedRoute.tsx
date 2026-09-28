//-------import-------
import { Navigate, useLocation } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "../context/AuthContext";

import LoadingScreen from "./LoadingScreen";

//-------Props-------
type Props = {
  children: ReactNode;
};

//-------Component-------
function ProtectedRoute({ children }: Props) {
  const { isLoggedIn, authLoading } = useAuth();

  const location = useLocation();

  if (authLoading) {
    return <LoadingScreen message="Checking your session..." />;
  }

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

  return children;
}

export default ProtectedRoute;
