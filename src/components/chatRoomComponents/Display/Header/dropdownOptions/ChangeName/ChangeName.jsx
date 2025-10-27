import styles from "../NewGroupForm/NewGroupForm.module.css";
import { useContext, useEffect, useState } from "react";
import useChatRoom from "../../../../../../contexts/chatRoom/useChatRoom";
import DropdownContext from "../../Dropdown/DropdownContext";
import { SendIcon } from "../../../../../general/icons";
import GoBack from "../GoBack/GoBack";

function ChangeName({ dropdownFeatures, setDropdownFeatures }) {
  const { currentChat, changeName } = useChatRoom();
  const { closePanel } = useContext(DropdownContext);
  const [newName, setNewName] = useState("");
  const [errors, setErrors] = useState({
    fieldIsEmpty: false,
    nameHasNotChanged: false,
  });

  useEffect(() => {
    setErrors({ fieldIsEmpty: false, nameHasNotChanged: false });
  }, [dropdownFeatures]);

  const handleNameChange = async (e) => {
    e.preventDefault();

    if (newName === "") {
      setErrors({ errors, fieldIsEmpty: true });
      return;
    }

    if (newName === currentChat.name) {
      setErrors({ errors, nameHasNotChanged: true });
      return;
    }

    await changeName(newName);
    setNewName("");
    setDropdownFeatures({ ...dropdownFeatures, changeName: false });
  };
  return (
    <>
      <GoBack onClick={() => closePanel()} />
      <div className={styles.container}>
        <form onSubmit={handleNameChange}>
          <label>Change Group Name</label>

          <span className={styles.inputAndButton}>
            <input
              value={newName}
              placeholder="Enter new name"
              onChange={(e) => setNewName(e.target.value)}
            />
            {errors.fieldIsEmpty && (
              <p className={styles.error}>*Please fill out the field first</p>
            )}
            {errors.nameHasNotChanged && (
              <p className={styles.error}>*This is the same name</p>
            )}
            <button type="submit">
              <SendIcon />
            </button>
          </span>
        </form>
      </div>
    </>
  );
}

export default ChangeName;
