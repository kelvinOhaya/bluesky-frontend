import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GlobeIcon,
  MessageIcon,
  LockIcon,
} from "../../components/general/icons";
import "../../styles/global.css";
import Background from "./Background/Background";
import Phone from "../../components/general/Phone/Phone";
import useChatRoom from "../../contexts/chatRoom/useChatRoom";

function Home() {
  const navigate = useNavigate();
  const { isMobile } = useChatRoom();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.7 }}
      >
        <Background />
      </motion.div>

      <div className={styles.container}>
        <main className={styles.textContainer}>
          <h1 className={styles.textContent}>Blue Sky</h1>
          <div className={styles.description}>
            <p>Chat without distractions - fast, fun, and free</p>
          </div>
          {/* Icons and stuff */}
          {!isMobile && (
            <>
              <div className={styles.descriptorContainer}>
                <div className={styles.feature}>
                  <MessageIcon size={35} color={"#0d4ae2"} />
                  <p>Real-Time Messaging</p>
                </div>
                <div className={styles.feature}>
                  <GlobeIcon size={35} color={"#0d4ae2"} />
                  <p>Works Anywhere</p>
                </div>
                <div className={styles.feature}>
                  <LockIcon size={35} color={"#0d4ae2"} />
                  <p>Protected With JWT Authentication</p>
                </div>
              </div>
            </>
          )}
          <button onClick={() => navigate("./register")}>
            <p className={styles.buttonText}>Start Here</p>
          </button>
        </main>
      </div>
    </motion.div>
  );
}

export default Home;
