/* Auth Provider provides the context that authContext will hold
  Includes:
    - functions for logging in, signing up, logging out, and getting user data
    - state variables for access tokens, the user data, and whether the screen is loading or not
*/
import { useState, useEffect } from "react";
import api, { injectAuthToken } from "../../utils/api";
import AuthContext from "./AuthContext";
import useChatRoom from "../chatRoom/useChatRoom";

const AuthProvider = ({ children }) => {
  //the tokens from the backend, the user data, and checking if the website is loading
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to set both tokens
  const setTokens = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  //whenever the website mounts, set up the axios interceptors to always use the latest access token for a request
  //if that doesn't work, just set these state variables to null
  //regardless, set isLoading to false, signalling that the page can now render
  useEffect(() => {
    const refresh = async () => {
      try {
        // Try to get refresh token from sessionStorage on app start
        const storedRefreshToken = sessionStorage.getItem("refreshToken");
        if (!storedRefreshToken) {
          throw new Error("No refresh token found");
        }

        const { data } = await api.post("/auth/refresh-token", {
          refreshToken: storedRefreshToken,
        });
        setTokens(data.accessToken, data.refreshToken);

        // Update sessionStorage with new refresh token
        sessionStorage.setItem("refreshToken", data.refreshToken);

        await fetchUser(data.accessToken);
      } catch {
        setTokens(null, null);
        sessionStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    injectAuthToken(
      () => accessToken,
      setTokens,
      () => refreshToken || sessionStorage.getItem("refreshToken")
    );
    refresh();
  }, [accessToken, refreshToken]);

  //creates a user in mongodb and gets both access and refresh tokens
  const signUp = async (credentials) => {
    try {
      const response = await api.post("/auth/signup", credentials);
      setTokens(response.data.accessToken, response.data.refreshToken);

      // Store refresh token in sessionStorage
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      await fetchUser(response.data.accessToken);
      return response.status;
    } catch (error) {
      //console.log("Error when trying to signup: ", error);
      return error.response.status;
    }
  };

  //send a post request to the login route and get both tokens
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      setTokens(response.data.accessToken, response.data.refreshToken);

      // Store refresh token in sessionStorage
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      await fetchUser(response.data.accessToken);
      return response.status;
    } catch (error) {
      return error.response?.status;
    }
  };
  //send a post request to the logout route and clear all tokens
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      //ignore error, continue with logout
    }
    setTokens(null, null);
    sessionStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoading(false);
  };

  //get the user data from the /me route (doesn't include the password)
  const fetchUser = async (token) => {
    if (!token) return;

    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signUp,
        logout,
        fetchUser,
        accessToken,
        setAccessToken,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
