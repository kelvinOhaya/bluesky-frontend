import { useState, useCallback, useRef } from "react";
import styles from "../ChangeProfilePicture/ChangeProfilePicture.module.css";
import { PlusIcon, PencilIcon } from "../../../../../general/icons";
import useChatRoom from "../../../../../../contexts/chatRoom/useChatRoom";
import { useDropzone } from "react-dropzone";
import api from "../../../../../../utils/api";
import GoBack from "../GoBack/GoBack";
import { useContext } from "react";
import DropdownContext from "../../Dropdown/DropdownContext";

function ChangeGroupProfilePicture() {
  const { currentChat } = useChatRoom();
  const { closePanel } = useContext(DropdownContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setPreview(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!preview || preview.length === 0) return;
    const formData = new FormData(e.target);
    formData.append("image", preview[0]);
    formData.append("roomId", currentChat._id);
    try {
      await api.post("/upload/group-profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      if (error && error.response && error.response.data) {
        // console.log(
        //   "Error from the server when trying to upload to cloudinary: ",
        //   JSON.stringify(error, null, 2)
        // );
      }
    } finally {
      setIsLoading(false);
      closePanel();
      setPreview(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
  });

  return (
    <div className={styles.container}>
      <GoBack onClick={() => closePanel()} />
      <p className={styles.p}>Edit Group Profile</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.content} {...getRootProps()}>
          <input
            ref={fileRef}
            {...getInputProps()}
            type="file"
            id="choose-file"
          />

          <div className={styles.inputStyling}>
            {preview != null ? (
              preview.map((file, index) => (
                <img key={index} src={file.preview} />
              ))
            ) : (
              <PlusIcon size={120} className={styles.plusIcon} type="file" />
            )}
            <span className={styles.pencilIcon}>
              <PencilIcon />
            </span>
          </div>
        </div>
        <button className={styles.confirm} type="submit">
          Confirm
        </button>
        {isLoading && <p>Loading...</p>}
        {isSuccessful && (
          <p style={{ color: "green" }}>Successfully Uploaded!</p>
        )}
      </form>
    </div>
  );
}

export default ChangeGroupProfilePicture;
