import api from "../utils/api";
import useAuth from "../contexts/auth/useAuth";

//send a post request to the login route and get both tokens
export default function useLoginStatus(credentials, rememberMe) {
  const { setTokens, fetchUser } = useAuth();

  const getLoginStatus = async (credentials, rememberMe) => {
    try {
      //send credentials to API for verification and set tokens on success
      const response = await api.post("/auth/login", credentials);
      setTokens(response.data.accessToken, response.data.refreshToken);

      // Store refresh token in sessionStorage, or local storage if the user wants to be remembered
      rememberMe === true
        ? localStorage.setItem("refreshToken", response.data.refreshToken)
        : sessionStorage.setItem("refreshToken", response.data.refreshToken);
      //get user data on success and return the status
      await fetchUser(response.data.accessToken);

      return response.status;
    } catch (error) {
      return error.response?.status;
    }
  };

  getLoginStatus();
}
