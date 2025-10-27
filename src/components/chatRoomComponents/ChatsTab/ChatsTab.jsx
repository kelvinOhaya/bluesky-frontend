// Import the UserLabel component for displaying chat room/user info
import UserLabel from "../../general/UserLabel/UserLabel";
import UserPortion from "./UserPortion/UserPortion";
import styles from "./ChatsTab.module.css";
import useChatRoom from "../../../contexts/chatRoom/useChatRoom";
import { MenuIconVertical } from "../../general/icons";

// ChatsTab displays the list of chat rooms the user is a member of, and allows switching between them
function ChatsTab({ className, setSidebarIsOpen }) {
  // Destructure chat room state and actions from context
  const { chatRooms, currentChatId, activateChat, messagesCache } =
    useChatRoom();

  return (
    // Main container for the chat tab, receives optional className for layout
    <div className={`${className} ${styles.container}`}>
      <div className={styles.content}>
        {/* Shows the current user's info/profile at the top of the tab */}
        <UserPortion />
        {/* Container for the list of chat room buttons */}
        <div className={styles.tabButtonContainer}>
          {/* Only render chat rooms if chatRooms is a valid array */}
          {Array.isArray(chatRooms) ? (
            chatRooms
              // Filter out any null/undefined or malformed chat room objects
              .filter((chatRoom) => chatRoom && chatRoom._id)
              .map((chatRoom) => {
                return (
                  // Each chat room is a button; clicking activates that chat room
                  <button
                    className={
                      styles.tabButton +
                      // Highlight the button if this chat room is currently active
                      (currentChatId === chatRoom._id
                        ? " " + styles.active
                        : "")
                    }
                    style={{ overflow: "hidden" }}
                    key={chatRoom._id}
                    onClick={async () => {
                      await activateChat(chatRoom);
                      setSidebarIsOpen(false); // Close sidebar when selecting a chat
                      console.log(JSON.stringify(messagesCache, null, 2));
                    }}
                  >
                    {/* UserLabel displays the chat room's name horizontally */}
                    <UserLabel
                      className={styles.userLabel}
                      name={
                        chatRoom.isDm
                          ? chatRoom.otherUser?.username
                          : chatRoom.name
                      }
                      src={
                        chatRoom.isDm
                          ? chatRoom.otherUser?.profilePicture?.url || null
                          : chatRoom.profilePicture?.url
                          ? chatRoom.profilePicture.url
                          : null
                      }
                      orientation={"horizontal"}
                    />
                  </button>
                );
              })
          ) : (
            // Fallback if there are no chat rooms yet
            <div style={{ color: "white", fontSize: "1.2rem" }}>
              No Chats Yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export the ChatsTab component for use in other parts of the app
export default ChatsTab;
