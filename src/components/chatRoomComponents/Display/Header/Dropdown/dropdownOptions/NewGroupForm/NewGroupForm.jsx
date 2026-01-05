import styles from "./NewGroupForm.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import useChatRoom from "@contexts/chatRoom/useChatRoom";
import DropdownContext from "../../DropdownContext";
import { SendIcon } from "@components/general/icons";
import GoBack from "../GoBack/GoBack";

function NewGroupForm() {
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { createGroup } = useChatRoom();
  const { closePanel } = useContext(DropdownContext);

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await createGroup(groupName);
      setIsLoading(false);
      setIsSuccessful(true);
    } catch {
      setError(true);
    }
    setGroupName("");
  };

  return (
    <>
      <GoBack onClick={() => closePanel()} />
      <div className={styles.container}>
        <form onSubmit={handleCreateGroup}>
          <label>Create Group</label>
          <span className={styles.inputAndButton}>
            <input
              type="text"
              value={groupName}
              placeholder="Enter Name of New Group"
              onChange={(e) => {
                setGroupName(e.target.value);
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
            New group chat created!
          </p>
        )}
        {error && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            Sorry, an error occured
          </p>
        )}
      </div>
    </>
  );
}

export default NewGroupForm;
