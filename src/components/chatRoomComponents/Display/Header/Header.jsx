import { useEffect, useState } from "react";
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
  ChevronIcon,
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

function Header({ className }) {
  const { user } = useAuth();
  const {
    currentChat,
    currentChatId,
    isTablet,
    windowWidth,
    sidebarIsOpen,
    setSidebarIsOpen,
  } = useChatRoom();
  const [isActive, setIsActive] = useState({
    settings: false,
    groupOptions: false,
    mobileFacts: false,
  });
  const [dropdownFeatures, setDropdownFeatures] = useState({
    createGroupChat: false,
    roomSearch: false,
    userSearch: false,
    logoutConfirmation: false,
    changeName: false,
    leaveRoom: false,
    changeProfilePicture: false,
    changeGroupProfilePicture: false,
  });

  const selectFeature = (type) => {
    setDropdownFeatures((prevFeatures) => ({
      ...prevFeatures,
      [type]: true,
      ...Object.keys(prevFeatures)
        .filter((key) => key !== type)
        .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
    }));
  };

  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    for (const key of Object.keys(dropdownFeatures)) {
      if (dropdownFeatures[key]) {
        setActiveFeature({ key: key, value: dropdownFeatures[key] });
      } else setActiveFeature(null);
    }

    if (Object.values(dropdownFeatures).some((value) => value)) {
      setIsActive(false);
    }
  }, [dropdownFeatures]);

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
            {!isTablet && (
              <>
                <p className={styles.memberCount}>
                  Members: {currentChat.memberCount}
                </p>

                {!currentChat.isDm && (
                  <span className={styles.joinCode}>
                    Join Code: {currentChat?.joinCode || "999999"}
                  </span>
                )}
              </>
            )}
            <div className={styles.dropdownGroup}>
              {isTablet && (
                <Dropdown
                  isActive={isActive.mobileFacts}
                  type={"mobileFacts"}
                  setIsActive={setIsActive}
                  icon={
                    <ChevronIcon
                      className={styles.mobileDropdownIcon}
                      isActive={isActive.mobileFacts}
                      direction={"down"}
                      size={30}
                    />
                  }
                >
                  <Option
                    className={styles.option}
                    label={`Members: ${currentChat?.memberCount}`}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <Option
                    className={styles.option}
                    label={`Join Code: ${currentChat?.joinCode || "999999"}`}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Dropdown>
              )}

              <Dropdown
                isActive={isActive.groupOptions}
                type={"groupOptions"}
                setIsActive={setIsActive}
                icon={
                  <ChatRoomIcon
                    isActive={isActive}
                    className={styles.iconWrapper}
                    size={34}
                  />
                }
              >
                {currentChat.isDm === false && (
                  <>
                    <Option
                      className={styles.option}
                      icon={PencilIcon}
                      label={"Change Group Picture"}
                      onClick={() => selectFeature("changeGroupProfilePicture")}
                    />
                    <Option
                      className={styles.option}
                      icon={PlusIcon}
                      label={"Change Group Name"}
                      onClick={() => selectFeature("changeName")}
                    />
                  </>
                )}
                <Option
                  className={styles.option}
                  icon={LeaveIcon}
                  label={currentChat.isDm ? "Leave Chat" : "Leave Group"}
                  onClick={() => selectFeature("leaveChatRoom")}
                />
              </Dropdown>

              <Dropdown
                isActive={isActive.settings}
                setIsActive={setIsActive}
                type={"settings"}
                icon={
                  <SettingsIcon
                    isActive={isActive}
                    className={styles.iconWrapper}
                    size={34}
                  />
                }
              >
                <span className={styles.personalJoinCode}>
                  Personal Join Code: {user.joinCode}
                </span>
                <Option
                  className={styles.option}
                  icon={PencilIcon}
                  label={"Change Profile Picture"}
                  condition={dropdownFeatures.changeProfilePicture}
                  onClick={() => selectFeature("changeProfilePicture")}
                />
                <Option
                  className={styles.option}
                  icon={PlusIcon}
                  label={"Create Group Chat"}
                  condition={dropdownFeatures.createGroupChat}
                  onClick={() => selectFeature("createGroupChat")}
                />
                <Option
                  className={styles.option}
                  icon={ProfileIcon}
                  onClick={() => selectFeature("userSearch")}
                  label={"Find Other Users"}
                />
                <Option
                  className={styles.option}
                  icon={SearchIcon}
                  onClick={() => selectFeature("roomSearch")}
                  label={"Find Group Chats"}
                />

                <Option
                  className={styles.option}
                  icon={LeaveIcon}
                  label={"Logout"}
                  onClick={() => selectFeature("logoutConfirmation")}
                />
              </Dropdown>
            </div>
          </>
        )}

        {/* Put the dropdown features here */}
        <NewGroupForm
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <LeaveChatRoom
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <ChangeProfilePicture
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <LogoutConfirmation
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <JoinRoom
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <FindUser
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <ChangeName
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <ChangeGroupProfilePicture
          dropdownFeatures={dropdownFeatures}
          setDropdownFeatures={setDropdownFeatures}
        />
        <Overlay
          dropdownFeatures={dropdownFeatures}
          getActiveFeature={() =>
            dropdownFeatures.createGroupChat ||
            dropdownFeatures.roomSearch ||
            dropdownFeatures.userSearch ||
            dropdownFeatures.logoutConfirmation ||
            dropdownFeatures.changeName ||
            dropdownFeatures.changeProfilePicture ||
            dropdownFeatures.changeGroupProfilePicture ||
            dropdownFeatures.leaveChatRoom
          }
          setDropdownFeatures={setDropdownFeatures}
        />
      </div>
    </div>
  );
}

export default Header;
