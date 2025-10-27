import { useState } from "react";
import styles from "./Header.module.css";

// General UI components
import UserLabel from "../../../general/UserLabel/UserLabel";
import Overlay from "../../../general/Overlay/Overlay";
import Option from "./Option/Option";
import Dropdown from "./Dropdown/Dropdown";

// Icon components
import {
  PlusIcon,
  LeaveIcon,
  SearchIcon,
  PencilIcon,
  ProfileIcon,
  SettingsIcon,
  ChatRoomIcon,
} from "../../../general/icons";

// Dropdown option components
import {
  JoinRoom,
  ChangeName,
  NewGroupForm,
  LeaveChatRoom,
  LogoutConfirmation,
  ChangeProfilePicture,
  ChangeGroupProfilePicture,
  FindUser,
} from "./dropdownOptions";

import useChatRoom from "../../../../contexts/chatRoom/useChatRoom";
import useAuth from "../../../../contexts/auth/useAuth";
import MenuIconHorizontal from "../../../general/icons/MenuIconHorizontal";
import MobileFacts from "./dropdownOptions/MobileFacts/MobileFacts";

function Header({ className }) {
  const { user } = useAuth();
  const { currentChat, currentChatId, setSidebarIsOpen } = useChatRoom();
  const settingsOptions = [
    {
      icon: PencilIcon,
      label: "Change Profile Picture",
      panel: <ChangeProfilePicture />,
    },
    {
      icon: PlusIcon,
      label: "Create Group Chat",
      panel: <NewGroupForm />,
    },
    {
      icon: ProfileIcon,
      label: "Find User",
      panel: <FindUser />,
    },
    {
      icon: SearchIcon,
      label: "Join A Room",
      panel: <JoinRoom />,
    },
    {
      icon: LeaveIcon,
      label: "Logout",
      panel: <LogoutConfirmation />,
    },
  ];

  const groupOptions = [
    { icon: SettingsIcon, label: "Configs", panel: <MobileFacts /> },
    {
      icon: PencilIcon,
      label: "Edit Group Profile",
      panel: <ChangeGroupProfilePicture />,
    },
    { icon: PlusIcon, label: "Change Group Name", panel: <ChangeName /> },
    {
      icon: LeaveIcon,
      label: currentChat?.isDm ? "Leave Chat" : "Leave Group",
      panel: <LeaveChatRoom />,
    },
  ];
  const [settingsIsOpened, setSettingsIsOpened] = useState(false);
  const [groupOptionsIsOpened, setGroupOptionsIsOpened] = useState(false);

  return (
    <div className={className}>
      <div className={styles.container}>
        {
          /*
           * Sandwich Icon goes here when screen is < 400px
           * OnClick - setNavbarIsOpen(!navbarIsOpen)
           */

          <button
            style={{
              border: 0,
              background: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setSidebarIsOpen((prev) => !prev)}
          >
            <MenuIconHorizontal
              className={styles.MenuIconHorizontal}
              color="white"
            />
          </button>
        }
        {currentChatId && (
          <>
            <UserLabel
              className={styles.userLabel}
              overrideStyle={styles.overrideUserLabel}
              name={
                currentChat?.isDm === true
                  ? currentChat.otherUser?.username ?? "Loading..."
                  : currentChat.name
              }
              imgSize={37}
              src={
                currentChat.isDm
                  ? currentChat.otherUser?.profilePicture?.url || null
                  : currentChat.profilePicture?.url || null
              }
            />

            <div className={styles.dropdownGroup}>
              {/* Group Settings Dropdown */}
              <button
                className={styles.groupSettingsButton}
                onClick={() => setGroupOptionsIsOpened(true)}
              >
                <ChatRoomIcon size={34} />
              </button>
              <Dropdown
                navbarIsOpened={groupOptionsIsOpened}
                setNavbarIsOpened={setGroupOptionsIsOpened}
                title={"Group Settings"}
              >
                {/* If the label is "configs", we don't want to show the user that if the chat is a dm. Other than that, it is fine */}
                {groupOptions.map((option, index) => {
                  if (option.label === "Configs") {
                    return currentChat.isDm ? (
                      <Option
                        key={index}
                        className={styles.option}
                        label={option.label}
                        icon={option.icon}
                        panel={option.panel}
                      />
                    ) : (
                      <Option
                        key={index}
                        className={styles.option}
                        label={option.label}
                        icon={option.icon}
                        panel={option.panel}
                      />
                    );
                  } else {
                    return (
                      <Option
                        key={index}
                        className={styles.option}
                        label={option.label}
                        icon={option.icon}
                        panel={option.panel}
                      />
                    );
                  }
                })}
              </Dropdown>

              {/* Settings Icon and Navbar*/}
              <button
                className={styles.settingsButton}
                onClick={() => setSettingsIsOpened(true)}
              >
                <SettingsIcon className={styles.iconWrapper} size={34} />
              </button>
              <Dropdown
                navbarIsOpened={settingsIsOpened}
                setNavbarIsOpened={setSettingsIsOpened}
                title={"Settings"}
              >
                <span className={styles.personalJoinCode}>
                  Personal Join Code: {user.joinCode}
                </span>

                {settingsOptions.map((option, index) => (
                  <Option
                    key={index}
                    className={styles.option}
                    icon={option.icon}
                    label={option.label}
                    panel={option.panel}
                  />
                ))}
              </Dropdown>
            </div>
          </>
        )}

        <Overlay
          settingsIsOpened={settingsIsOpened}
          setSettingsIsOpened={setSettingsIsOpened}
          groupOptionsIsOpened={groupOptionsIsOpened}
          setGroupOptionsIsOpened={setGroupOptionsIsOpened}
        />
      </div>
    </div>
  );
}

export default Header;
