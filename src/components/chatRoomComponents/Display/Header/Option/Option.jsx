import React, { useContext } from "react";
import styles from "./Option.module.css";
import DropdownContext from "../Dropdown/DropdownContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeProfilePicture } from "../dropdownOptions";

const Option = ({ icon: Icon, label, panel }) => {
  const { navbarIsOpened, openPanel, activePanel, setActivePanel, closePanel } =
    useContext(DropdownContext);
  return (
    <>
      <button
        className={styles.option}
        onClick={() => {
          openPanel(panel);
        }}
      >
        {Icon && (
          <span className={styles.iconWrapper}>
            <Icon />
          </span>
        )}
        <p>{label}</p>
      </button>
      {activePanel && navbarIsOpened && (
        <div
          initial={{ maxWidth: 0 }}
          animate={{ maxWidth: 900 }}
          exit={{ maxWidth: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.featureContainer}
        >
          {activePanel}
        </div>
      )}
    </>
  );
};

export default Option;
