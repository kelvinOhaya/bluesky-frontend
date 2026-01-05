import { useState, useCallback, useRef, useContext } from "react";
import styles from "./ChangeProfilePicture.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, PlusIcon } from "@components/general/icons";
import useAuth from "@contexts/auth/useAuth";
import { useDropzone } from "react-dropzone";
import api from "@utils/api";
import DropdownContext from "../../DropdownContext";
import GoBack from "../GoBack/GoBack";

function ChangeProfilePicture() {
  const { user, setUser } = useAuth();
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
    if (preview === null) return;
    const formData = new FormData(e.target);
    formData.append("image", preview[0]);
    try {
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const { data } = await api.post("/upload/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsLoading(false);
      setUser((prev) => ({ ...prev, profilePicture: data.newProfilePicture }));
      setIsSuccessful(true);
    } catch (error) {
      if (error && error.response && error.response.data) {
        console.log(
          "Error from the server when trying to upload to cloudinary: ",
          error.response.data
        );
      }
    } finally {
      console.log("Currently, the user is: \n", user);
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
      <p className={styles.p}>Edit Profile Picture</p>
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

export default ChangeProfilePicture;
