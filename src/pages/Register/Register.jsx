import Login from "../../components/loginSignUp/Login";
import SignUp from "../../components/loginSignUp/SignUp";
import styles from "./Register.module.css";
import useChatRoom from "../../contexts/chatRoom/useChatRoom";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import { useState } from "react";

function Register() {
  const { chatRooms } = useChatRoom();

  console.log(chatRooms);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  return (
    <div className={styles.container}>
      <button className={styles.goBack} onClick={() => navigate("/")}>
        &lt;
      </button>

      {mode === "login" ? (
        <Login setMode={setMode} />
      ) : (
        <SignUp setMode={setMode} />
      )}
    </div>
  );
}

export default Register;
