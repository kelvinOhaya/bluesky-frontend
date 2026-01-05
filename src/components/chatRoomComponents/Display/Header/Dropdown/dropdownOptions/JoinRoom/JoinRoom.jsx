import styles from "../NewGroupForm/NewGroupForm.module.css";
import { motion, AnimatePresence } from "framer-motion";
import useChatRoom from "@contexts/chatRoom/useChatRoom";
import { useContext, useEffect, useState } from "react";
import DropdownContext from "../../DropdownContext";
import GoBack from "../GoBack/GoBack";
import { SendIcon } from "@components/general/icons";

function JoinRoom({ dropdownFeatures, setDropdownFeatures }) {
  const { verifyJoinCode, joinRoom, checkIfRoomExists } = useChatRoom();
  const { closePanel } = useContext(DropdownContext);
  const [roomDoesNotExist, setRoomDoesNotExist] = useState(false);
  const [roomAlreadyExists, setRoomAlreadyExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    setIsEmpty(false);
    setRoomDoesNotExist(false);
    setJoinCode("");
  }, [dropdownFeatures]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsEmpty(false);
    setRoomDoesNotExist(false);
    setRoomAlreadyExists(false);

    if (joinCode.trim() === "") {
      setIsLoading(false);
      setIsEmpty(true);
      return;
    }

    const roomAlreadyExists = checkIfRoomExists(joinCode);
    if (roomAlreadyExists) {
      setIsLoading(false);
      setRoomAlreadyExists(true);
      return;
    }

    const isValid = await verifyJoinCode(joinCode);
    if (isValid) {
      await joinRoom(joinCode);
      setIsLoading(false);
      closePanel();
    } else {
      setIsLoading(false);
      setRoomDoesNotExist(true);
    }
  };
  return (
    <>
      <GoBack onClick={() => closePanel()} />
      <div className={styles.container}>
        <form onSubmit={handleSearch}>
          <label>Join A Room</label>
          <span className={styles.inputAndButton}>
            <input
              type="text"
              value={joinCode}
              placeholder="Enter the room's join code"
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
        {roomAlreadyExists && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            You are already in a room with this joinCode
          </p>
        )}
        {roomDoesNotExist && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            No room with the following join code was found
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

export default JoinRoom;
