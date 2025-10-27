import styles from "../NewGroupForm/NewGroupForm.module.css";
import { motion, AnimatePresence } from "framer-motion";
import useChatRoom from "../../../../../../contexts/chatRoom/useChatRoom";
import { useContext, useState } from "react";
import DropdownContext from "../../Dropdown/DropdownContext";
import GoBack from "../GoBack/GoBack";
import { SendIcon } from "../../../../../general/icons";

function FindUser() {
  const { findUser, checkIfDmExists } = useChatRoom();

  const [userDoesNotExist, setUserDoesNotExist] = useState(false);
  const [alreadyInDm, setAlreadyInDm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const { closePanel } = useContext(DropdownContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (joinCode.trim() === "") {
      setIsLoading(false);
      setIsEmpty(true);
      return;
    }

    const dmExists = checkIfDmExists(joinCode);
    // console.log(dmExists);
    if (dmExists) {
      setIsLoading(false);
      setAlreadyInDm(true);
      return;
    }

    // vFrOqPjN
    try {
      await findUser(joinCode);
      setIsSuccessful(true);
    } catch (error) {
      setUserDoesNotExist(true);
      console.log("Error trying to find other users: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <GoBack onClick={() => closePanel()} />
      <div className={styles.container}>
        <form onSubmit={handleSearch}>
          <label>Find User</label>
          <span className={styles.inputAndButton}>
            <input
              type="text"
              value={joinCode}
              placeholder="Enter the user's joinCode"
              onChange={(e) => {
                setJoinCode(e.target.value);
                //console.log(groupName);
              }}
            />
            <button type="submit">
              <SendIcon size={20} />
            </button>
          </span>
        </form>
        {isLoading && <p style={{ fontSize: "0.9rem" }}>Creating Chat...</p>}
        {isSuccessful && (
          <p style={{ color: "rgba(45, 198, 45, 1)", fontSize: "0.9rem" }}>
            Successfully Joined!
          </p>
        )}
        {alreadyInDm && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            You are alrady in a room with this user
          </p>
        )}
        {userDoesNotExist && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            This user does not exist
          </p>
        )}
        {isEmpty && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            Please make sure to fill the field first
          </p>
        )}
      </div>
    </>
  );
}

export default FindUser;
