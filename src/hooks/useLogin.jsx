import { Navigate, useNavigate } from "react-router-dom";
import useLoginStatus from "./useLoginStatus";

const useLogin = (e, navigate, userData, rememberMe, login, setError) => {
  const loginFunc = useLoginStatus();
  console.log(`E: ${e}`);

  const handleLogin = async (
    e,
    navigate,
    userData,
    rememberMe,
    login,
    setError
  ) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Prevent multiple submissions
    if (e.target.submitting) return;
    e.target.submitting = true;
    const { username, password } = userData;

    try {
      //send information to API
      console.log("Calling login...");
      const loginStatus = loginFunc({ username, password }, rememberMe);
      console.log("Login response:", loginStatus);

      //if successful navigate to the chatroom screen
      if (loginStatus === 200) {
        console.log("Login successful, navigating...");
        const last = "/chatroom";
        navigate(last);
      } else {
        //if error code is returned, print the appropriate message
        console.log("Login failed:", loginStatus);
        loginStatus == 500
          ? setError("server error")
          : setError("incorrect credentials");
      }
      //error handling
    } catch (error) {
      console.log("Login error:", error);
      setError("network error");
    } finally {
      e.target.submitting = false;
    }
  };

  handleLogin(e, navigate, userData, rememberMe, login, setError);
};

export default useLogin;
