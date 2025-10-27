import styles from "./ChatRoom.module.css";
import { useState, useEffect } from "react";
import "../../styles/global.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import useChatRoom from "../../contexts/chatRoom/useChatRoom";
import useSocket from "../../contexts/socket/useSocket";
import useAuth from "../../contexts/auth/useAuth";
import ChatsTab from "../../components/chatRoomComponents/ChatsTab/ChatsTab";
import Display from "../../components/chatRoomComponents/Display/Display";
import { useLocation } from "react-router-dom";

function ChatRoom() {
  const {
    loadChatRooms,

    sidebarIsOpen,
    setSidebarIsOpen,
  } = useChatRoom();
  const { isLoading, user, accessToken } = useAuth();
  const [activeGroupChat, setActiveGroupChat] = useState(0);
  const { socket } = useSocket();
  const location = useLocation();

  useEffect(() => {
    if (!socket) return;

    socket.connect();
    const fetchChatRooms = async () => {
      if (!isLoading && user && accessToken && socket != null) {
        await loadChatRooms();
      }
    };
    fetchChatRooms();
    console.table(user);

    return () => {
      socket.disconnect();
    };
  }, [socket, location.pathname]);

  if (!isLoading) {
    return (
      <div className={styles.container}>
        <nav
          className={`${styles.nav} ${
            sidebarIsOpen ? styles.open : styles.closed
          }`}
        >
          <ChatsTab
            isOpen={sidebarIsOpen}
            className={styles.chatsTab}
            activeGroupChat={activeGroupChat}
            setActiveGroupChat={setActiveGroupChat}
            setSidebarIsOpen={setSidebarIsOpen}
          />
        </nav>
        <Display
          className={`${styles.display} ${sidebarIsOpen ? styles.navOpen : ""}`}
        />
      </div>
    );
  }
}

export default ChatRoom;
