import styles from "./Overlay.module.css";
import { AnimatePresence, motion } from "framer-motion";

function Overlay({ isActive, setIsActive, setSettingsIsOpened }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.button
          className={styles.overlay}
          initial={{ opacity: 0 }}
          style={{ pointerEvents: "all" }}
          animate={{
            opacity: 0.7,
            visibility: "visible",
          }}
          exit={{ opacity: 0, transition: { duration: "0.7" } }}
          transition={{ duration: "0.3" }}
          onClick={() => setSettingsIsOpened(false)}
        ></motion.button>
      )}
    </AnimatePresence>
  );
}

export default Overlay;
