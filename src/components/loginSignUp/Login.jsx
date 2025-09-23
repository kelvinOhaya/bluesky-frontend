import styles from "./LoginSignUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/auth/useAuth";

function Login({ setMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // possible states: "incorrect credentials"
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = userData;

    const loginStatus = await login({ username, password });
    if (loginStatus === 200) {
      const last = "/chatroom";
      window.location.href = last;
    } else {
      loginStatus == 500
        ? setError("server error")
        : setError("incorrect credentials");
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
