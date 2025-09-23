import { Navigate, useLocation } from "react-router-dom";
import LoadingIcon from "../components/general/LoadingIcon/LoadingIcon";
import useAuth from "../contexts/auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, accessToken } = useAuth();

   console.log("ProtectedRoute render:", { user: !!user, isLoading, accessToken: !!accessToken });

  const loadingStyle = {
    position: "absolute",
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
  };

  if (isLoading)
    console.log("ProtectedRoute: no access token, redirecting");
    return (
      <div style={loadingStyle}>
        <LoadingIcon />
      </div>
    );
  if (!user) {
    console.log("ProtectedRoute: no access token, redirecting");
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
