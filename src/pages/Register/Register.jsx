import Login from "../../components/loginSignUp/Login";
import SignUp from "../../components/loginSignUp/SignUp";
import styles from "./Register.module.css";
import useChatRoom from "../../contexts/chatRoom/useChatRoom";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import { useState } from "react";
import { HomeIcon } from "../../components/general/icons";

function Register() {
  const { chatRooms } = useChatRoom();

  console.log(chatRooms);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={styles.container}>
      <button className={styles.goBack} onClick={() => navigate("/")}>
        <HomeIcon size={40} color={"currentColor"} />
      </button>

      {mode === "login" ? (
        <Login
          setMode={setMode}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      ) : (
        <SignUp
          setMode={setMode}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      )}
    </div>
  );
}

export default Register;
