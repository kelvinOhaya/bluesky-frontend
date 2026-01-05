import { useContext } from "react";
import styles from "./Option.module.css";
import DropdownContext from "../DropdownContext";

const Option = ({ icon: Icon, label, panel }) => {
  const { navbarIsOpened, openPanel, activePanel } =
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
        <div className={styles.featureContainer}>{activePanel}</div>
      )}
    </>
  );
};

export default Option;
