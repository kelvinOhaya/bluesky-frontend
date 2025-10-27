import { useContext } from "react";
import useChatRoom from "../../../../../../contexts/chatRoom/useChatRoom";
import styles from "./LeaveChatRoom.module.css";
import DropdownContext from "../../Dropdown/DropdownContext";

function LeaveChatRoom() {
  const { leaveChatRoom, currentChat } = useChatRoom();
  const { closePanel } = useContext(DropdownContext);

  const handleLeaveRoom = async () => {
    await leaveChatRoom();
  };

  return (
    <div className={styles.container}>
      <p style={{ textAlign: "center" }}>
        {currentChat.isDm
          ? "Are you sure you want to leave this chat?"
          : "Are you sure you want to leave?"}
      </p>
      <div className={styles.buttonContainer}>
        <button onClick={() => closePanel()}>No</button>
        <button onClick={handleLeaveRoom}>Yes</button>
      </div>
      <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
        {currentChat.memberCount === 1 &&
          "*You are the last member. All messages will be lost forever!"}
      </p>
    </div>
  );
}

export default LeaveChatRoom;
