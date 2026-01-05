import styles from "./ChatRoom.module.css";
import { useState, useEffect } from "react";
import "@styles/global.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import useChatRoom from "@contexts/chatRoom/useChatRoom";
import useSocket from "@contexts/socket/useSocket";
import useAuth from "@contexts/auth/useAuth";
import ChatsTab from "@components/chatRoomComponents/ChatsTab/ChatsTab";
import Display from "@components/chatRoomComponents/Display/Display";
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
    console.log("ChatRoom useEffect triggered");
    console.log("socket:", socket);
    console.log("isLoading:", isLoading);
    console.log("user:", user);
    console.log("accessToken:", accessToken);

    if (!socket) {
      console.log("No socket, skipping loadChatRooms");
      return;
    }

    const fetchChatRooms = async () => {
      if (!isLoading && user && accessToken && socket != null) {
        console.log("Calling loadChatRooms...");
        await loadChatRooms();
        console.log("loadChatRooms completed");
      } else {
        console.log("Conditions not met for loadChatRooms:", {
          isLoading,
          hasUser: !!user,
          hasAccessToken: !!accessToken,
          hasSocket: !!socket,
        });
      }
    };
    fetchChatRooms();
    console.table(user);
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
