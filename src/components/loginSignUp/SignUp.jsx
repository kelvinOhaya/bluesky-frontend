import { useNavigate } from "react-router-dom";
import styles from "./LoginSignUp.module.css";
import { useEffect, useState } from "react";
import useAuth from "../../contexts/auth/useAuth";
import api from "../../utils/api";

function SignUp({ setMode, rememberMe, setRememberMe }) {
  const navigate = useNavigate();
  const { signUp, refreshToken } = useAuth();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    hasErrors: false,
  });

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errors, setErrors] = useState({
    fieldsAreEmpty: false,
    passwordsDoNotMatch: false,
    passwordUnderEightCharacters: false,
    usernameIsAlreadyTaken: false,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, password } = userData;

    //verify inputs
    try {
      const { data } = await api.post("/auth/verify-signup", {
        username: username.trim(),
        password,
        confirmedPassword,
      });

      const newErrors = data.newErrors;

      if (
        newErrors.fieldsAreEmpty ||
        newErrors.passwordsDoNotMatch ||
        newErrors.passwordUnderEightCharacters ||
        newErrors.usernameIsAlreadyTaken
      ) {
        setErrors(newErrors);
        return;
      }
    } catch (error) {
      //console.log("Error verifying signup form: ", error);
    }

    const signUpStatus = await signUp({ username, password }, rememberMe);
    console.log(`Status: ${signUpStatus}`);
    if (signUpStatus === 200) {
      const last = "/chatroom";
      navigate(last);
    } else return;

    // navigate("/chatroom");
  };

  return (
    <section className={styles.container}>
      <h1>Sign Up</h1>
      {errors.fieldsAreEmpty && (
        <p className={styles.error}>* Please fill in all fields</p>
      )}
      <form className={styles.formsContainer} onSubmit={handleSignUp}>
        <div className={styles.field}>
          <label>Username </label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          {errors.usernameIsAlreadyTaken && (
            <p className={styles.error}>*Username is already in use</p>
          )}
        </div>
        <div className={styles.field}>
          <label>Password </label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder="at least 8 characters"
          />
          {errors.passwordUnderEightCharacters && (
            <p className={styles.error}>* Password is under 8 characters</p>
          )}
        </div>
        <div className={styles.field}>
          <label>{"Password (again)"}</label>
          <input
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            type="password"
          />
          {errors.passwordsDoNotMatch && (
            <p className={styles.error}>* Passwords do not match</p>
          )}
        </div>
        <span className={styles.submitAndReminder}>
          <button type="submit">Sign Up</button>
          <span className={styles.rememberMe}>
            <label htmlFor="remember-me">Remember me</label>
            <input
              type="checkbox"
              onChange={() => setRememberMe((prev) => !prev)}
            />
          </span>
          <p>
            Already have an account?{" "}
            <a onClick={() => setMode("login")}>Log in here</a>
          </p>
        </span>
      </form>
    </section>
  );
}

export default SignUp;
