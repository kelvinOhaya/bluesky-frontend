import styles from "./LoginSignUp.module.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../contexts/auth/useAuth";

function Login({ setMode, rememberMe, setRememberMe }) {
  const { login, refreshToken } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // possible states: "incorrect credentials"
  const [error, setError] = useState("");

  useEffect(() => {
    if (!refreshToken) return;
    if (refreshToken) {
      navigate("/chatroom");
    }
  }, [refreshToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Prevent multiple submissions
    if (e.target.submitting) return;
    e.target.submitting = true;

    const { username, password } = userData;

    try {
      console.log("Calling login...");
      const loginStatus = await login({ username, password }, rememberMe);
      console.log("Login response:", loginStatus);
      if (loginStatus === 200) {
        console.log("Login successful, navigating...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const last = "/chatroom";
        navigate(last);
      } else {
        console.log("Login failed:", loginStatus);
        loginStatus == 500
          ? setError("server error")
          : setError("incorrect credentials");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("network error");
    } finally {
      e.target.submitting = false;
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <h1>Login</h1>
        <form className={styles.formsContainer} onSubmit={handleLogin}>
          <div className={styles.field}>
            <label>Username </label>
            <input
              id="Username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              type="text"
            />
          </div>
          <div className={styles.field}>
            <label>Password </label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          {error == "incorrect credentials" && (
            <p className={styles.error}>*Username Or Password Is Incorrect</p>
          )}
          {error == "server error" && (
            <p className={styles.error}>
              *Sorry, an error on our part has occured
            </p>
          )}
          <span className={styles.submitAndReminder}>
            <button type="submit">Login</button>
            <span className={styles.rememberMe}>
              <label htmlFor="remember-me">Remember me</label>
              <input
                type="checkbox"
                onChange={() => setRememberMe((prev) => !prev)}
              />
            </span>
            <p>
              Not logged in? <a onClick={() => setMode("signup")}>Sign Up</a>
            </p>
          </span>
        </form>
      </section>
    </div>
  );
}

export default Login;
