import styles from "./ChatRoom.module.css";
import { useState, useEffect } from "react";
import "../../styles/global.css";
import { motion, useAnimation } from "framer-motion";
import useChatRoom from "../../contexts/chatRoom/useChatRoom";
import useSocket from "../../contexts/socket/useSocket";
import useAuth from "../../contexts/auth/useAuth";
import MenuIconVertical from "../../components/general/icons/MenuIconVertical";
import ChatsTab from "../../components/chatRoomComponents/ChatsTab/ChatsTab";
import Display from "../../components/chatRoomComponents/Display/Display";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

function ChatRoom() {
  const { loadChatRooms, currentChat, isMobile, isTablet, windowWidth } =
    useChatRoom();
  const { isLoading, setIsLoading, user, accessToken, fetchUser } = useAuth();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [activeGroupChat, setActiveGroupChat] = useState(0);
  const { socket } = useSocket();
  const controls = useAnimation();
  const location = useLocation();

  const getNavOffset = () => {
    // Define screen size ranges
    const isSmallMobile = windowWidth < 670;
    const isRegularMobile = windowWidth >= 670 && windowWidth < 790;
    const isTabletSize = windowWidth >= 790 && windowWidth < 900;
    const isDesktop = windowWidth >= 900;

    if (isSmallMobile) return "-97%";
    if (isRegularMobile) return "-98%";
    if (isTabletSize) return "-98%";
    if (isDesktop) return "-95%";
  };

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
        <motion.nav
          initial={{ x: getNavOffset() }}
          animate={{
            x: sidebarIsOpen ? 0 : getNavOffset(),
            width: sidebarIsOpen ? (isMobile ? "100vw" : "300px") : "300px",
          }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: sidebarIsOpen ? "all" : "auto",
          }}
          className={styles.nav}
        >
          <ChatsTab
            isOpen={sidebarIsOpen}
            className={styles.chatsTab}
            activeGroupChat={activeGroupChat}
            setActiveGroupChat={setActiveGroupChat}
            setSidebarIsOpen={setSidebarIsOpen}
          />
        </motion.nav>
        <motion.div
          className={styles.mainContent}
          initial={{ marginLeft: "-300px" }}
          animate={{
            marginLeft: !isMobile ? (sidebarIsOpen ? "0px" : "-300px") : "0",
          }}
          transition={{ duration: 0.3 }}
        >
          <Display className={styles.display} />
        </motion.div>
      </div>
    );
  }
}

export default ChatRoom;
