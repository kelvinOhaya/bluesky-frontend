import { useNavigate, useLocation } from "react-router-dom";
import LoadingIcon from "../components/general/LoadingIcon/LoadingIcon";
import useAuth from "../contexts/auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, accessToken, isLoggingOut } = useAuth();
  const navigate = useNavigate();

  console.log("ProtectedRoute render:", {
    user,
    isLoading,
    accessToken,
  });

  const loadingStyle = {
    position: "absolute",
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
  };

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <LoadingIcon />
      </div>
    );
  } else {
    if (!user && !isLoggingOut) {
      console.log("ProtectedRoute: no access token, redirecting");
      navigate("/register");
    } else return children;
  }
};

export default ProtectedRoute;
