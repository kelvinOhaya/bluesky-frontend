import { useState, createContext, useEffect } from "react";
import styles from "./Dropdown.module.css";
import DropdownContext from "./DropdownContext";
import { CloseIcon } from "../../../../general/icons";

function Dropdown({ title, navbarIsOpened, setNavbarIsOpened, children }) {
  const [activePanel, setActivePanel] = useState(null);
  const openPanel = (panel) => setActivePanel(panel);
  const closePanel = () => setActivePanel(null);

  useEffect(() => {
    if (navbarIsOpened === false) {
      setActivePanel(null);
    }
  }, [navbarIsOpened]);
  return (
    <nav className={`${styles.container} ${navbarIsOpened ? styles.open : ""}`}>
      <button
        className={styles.button}
        onClick={() => setNavbarIsOpened(false)}
      >
        <CloseIcon className={styles.closeIcon} size={25} />
      </button>
      <div className={styles.navbarContent}>
        <p className={styles.settingsTitle}>{title}</p>
        <DropdownContext.Provider
          value={{
            navbarIsOpened,
            setNavbarIsOpened,
            openPanel,
            activePanel,
            setActivePanel,
            closePanel,
          }}
        >
          {children}
        </DropdownContext.Provider>
      </div>
    </nav>
  );
}

export default Dropdown;
