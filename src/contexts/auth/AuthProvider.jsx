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
        // Mobile debugging
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isSafari =
          /Safari/.test(navigator.userAgent) &&
          !/Chrome/.test(navigator.userAgent);

        console.log("🔵 Mobile Debug: Device info:", {
          isMobile,
          isSafari,
          userAgent: navigator.userAgent,
        });
        console.log("🔵 Mobile Debug: All cookies:", document.cookie);
        console.log(
          "🔵 Mobile Debug: Has refresh cookie:",
          document.cookie.includes("refreshToken")
        );

        console.log("AuthProvider: Attempting refresh token...");
        const { data } = await api.post("/auth/refresh-token", { test: true });
        console.log("AuthProvider: Refresh successful, got token");
        setAccessToken(data.accessToken);
        await fetchUser(data.accessToken);
      } catch (error) {
        console.error(
          "🔴 Mobile Debug: Refresh failed on mobile:",
          error.response?.status
        );
        console.error("🔴 Mobile Debug: Error details:", error.response?.data);
        console.log("AuthProvider: Refresh failed:", error);
        setAccessToken(null); // This is probably what's happening
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
      //console.log("Error when trying to login: ", error);
      return error.response.status;
    }
  };

  //send a post request to the login route and get an accessToken
  const login = async (credentials) => {
    try {
      console.log(
        "🔵 Safari Debug: Starting login with:",
        credentials.username
      );
      const response = await api.post("/auth/login", credentials);
      console.log(
        "🔵 Safari Debug: Login response:",
        response.status,
        response.data
      );

      setAccessToken(response.data.accessToken);
      console.log("🔵 Safari Debug: Access token set");

      // Check if cookies were set after login
      setTimeout(() => {
        console.log("🔵 Mobile Debug: Cookies after login:", document.cookie);
        console.log(
          "🔵 Mobile Debug: Has refresh cookie after login:",
          document.cookie.includes("refreshToken")
        );
      }, 100);

      await fetchUser(response.data.accessToken);
      console.log("🔵 Safari Debug: User fetched successfully");

      // TEMPORARY: Store access token in sessionStorage as fallback
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        sessionStorage.setItem("fallback_token", response.data.accessToken);
        console.log("🔵 Mobile Debug: Stored fallback token");
      }

      return response.status;
    } catch (error) {
      console.error("🔴 Safari Debug: Login failed:", error);
      console.error("🔴 Safari Debug: Error response:", error.response?.data);
      console.error("🔴 Safari Debug: Error status:", error.response?.status);
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
    if (!token) {
      console.log("🔴 Safari Debug: No token provided to fetchUser");
      return;
    }

    try {
      console.log(
        "🔵 Safari Debug: Fetching user with token:",
        token.substring(0, 20) + "..."
      );
      const { data } = await api.get("/auth/me");
      console.log("🔵 Safari Debug: User data received:", data.user?.username);
      setUser(data.user);
    } catch (error) {
      console.error("🔴 Safari Debug: fetchUser failed:", error);
      console.error(
        "🔴 Safari Debug: fetchUser error response:",
        error.response?.data
      );
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
      {/* Display logs on screen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "black",
          color: "white",
          fontSize: "10px",
          zIndex: 9999,
        }}
      ></div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
