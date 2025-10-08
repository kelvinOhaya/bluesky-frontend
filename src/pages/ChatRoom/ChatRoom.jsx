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
  const { loadChatRooms, currentChat, isMobile, isTablet, windowWidth } =
    useChatRoom();
  const { isLoading, setIsLoading, user, accessToken, fetchUser } = useAuth();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [activeGroupChat, setActiveGroupChat] = useState(0);
  const { socket } = useSocket();
  const controls = useAnimation();
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
        <AnimatePresence>
          {sidebarIsOpen && (
            <motion.button
              type="button"
              className={styles.navOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarIsOpen(false)}
            ></motion.button>
          )}
        </AnimatePresence>
        <Display
          className={`${styles.display} ${sidebarIsOpen ? styles.navOpen : ""}`}
        />
      </div>
    );
  }
}

export default ChatRoom;
