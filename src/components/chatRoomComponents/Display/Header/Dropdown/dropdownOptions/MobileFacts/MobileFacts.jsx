import { useContext } from "react";
import GoBack from "../GoBack/GoBack";
import DropdownContext from "../../DropdownContext";
import useChatRoom from "@contexts/chatRoom/useChatRoom";
import styles from "./MobileFacts.module.css";

function MobileFacts() {
  const { currentChat } = useChatRoom();
  const { closePanel } = useContext(DropdownContext);
  return (
    <div className={styles.container}>
      <GoBack onClick={closePanel} />
      <p className={styles.title}>Group Configurations</p>
      <p className={styles.fact}>JoinCode: {currentChat.joinCode}</p>
      <p className={styles.fact}>Members: {currentChat.memberCount}</p>
    </div>
  );
}

export default MobileFacts;
