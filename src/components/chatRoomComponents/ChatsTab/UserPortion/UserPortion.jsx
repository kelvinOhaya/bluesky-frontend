import styles from "./UserPortion.module.css";
import UserLabel from "../../../general/UserLabel/UserLabel";
import useAuth from "../../../../contexts/auth/useAuth";
import { CloseIcon } from "../../../general/icons";
import useChatRoom from "../../../../contexts/chatRoom/useChatRoom";

function UserPortion({ className }) {
  const { user } = useAuth();
  const { setSidebarIsOpen } = useChatRoom();

  return (
    <div className={className}>
      <div className={styles.container}>
        <UserLabel
          imgStyling={styles.profilePic}
          className={styles.userLabel}
          name={user.username}
          imgSize={37}
          src={user.profilePicture?.url}
        />
        <button
          className={styles.button}
          onClick={() => setSidebarIsOpen(false)}
        >
          <CloseIcon className={styles.closeIcon} size={32} />
        </button>
      </div>
    </div>
  );
}

export default UserPortion;
