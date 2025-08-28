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
  //the accessToken from the backend, the user data, and checking if the website is loading
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //whenever the website mounts, set up the axios interceptors to always use the latest access token for a request
  //if that doesn't work, just set these state variables to null
  //regardless, set isLoading to false, signalling that the page can now render
  useEffect(() => {
    const refresh = async () => {
      try {
        const { data } = await api.post("/auth/refresh-token");
        setAccessToken(data.accessToken);
        await fetchUser(data.accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    injectAuthToken(() => accessToken, setAccessToken);
    refresh();
  }, []);

  //creates a user in mongodb and gets a refresh token in cookies and access token for the user
  const signUp = async (credentials) => {
    try {
      const response = await api.post("/auth/signup", credentials);
      await fetchUser(response.data.accessToken);
      setAccessToken(response.data.accessToken);
      return response.status;
    } catch (error) {
      console.log("Error when trying to login: ", error);
      return error.response.status;
    }
  };

  //send a post request to the login route and get an accessToken
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      setAccessToken(response.data.accessToken);
      await fetchUser(response.data.accessToken);
      return response.status;
    } catch (error) {
      console.log("Error when trying to login: ", error);
      return error.response?.status;
    }
  };

  //send a post request to the logout route to delete the access and refresh tokens, and set the state accordingly
  const logout = async () => {
    await api.post("/auth/logout");
    sessionStorage.setItem("reloaded", "false");
    setAccessToken(null);
    setUser(null);
  };

  //get the user data from the /me route (doesn't include the password)
  const fetchUser = async (token) => {
    if (!token) return;

    try {
      const { data } = await api.get("/auth/me", {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.user);
      console.log("Current User", data.user);
    } catch (error) {
      setUser(null);
      console.log("Error getting the user from the api: ", error);
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
