import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GlobeIcon,
  MessageIcon,
  LockIcon,
  LinkedInIcon,
  GithubIcon,
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

      <div className={styles.background}>
        <div className={styles.mainContent}>
          <main className={styles.textContainer}>
            <h1 className={styles.textContent}>Blue Sky</h1>
            <p className={styles.description}>
              Chat without distractions - fast, fun, and free
            </p>
            <button onClick={() => navigate("./register")}>
              <p className={styles.buttonText}>Start Here</p>
            </button>
            {/* Icons and stuff */}
            {!isMobile && (
              <>
                <div className={styles.descriptorContainer}>
                  <div className={styles.feature}>
                    <MessageIcon size={35} color={"#0d4ae2"} />
                    <p>Real-Time</p>
                  </div>
                  <div className={styles.feature}>
                    <GlobeIcon size={35} color={"#0d4ae2"} />
                    <p>Works Anywhere</p>
                  </div>
                  <div className={styles.feature}>
                    <LockIcon size={35} color={"#0d4ae2"} />
                    <p>JWT Protected</p>
                  </div>
                </div>
              </>
            )}
          </main>
          <footer className={styles.footer}>
            <ul>
              <li>Privacy Policy</li>
              <li>&nbsp;&nbsp;&nbsp;•&nbsp;Terms</li>
            </ul>
            <ul>
              <li>
                <LinkedInIcon
                  size={27}
                  className={styles.iconWrapper}
                  color={"white"}
                  href={"https://www.linkedin.com/in/kelvin-ohaya/"}
                />
              </li>
              <li>
                <GithubIcon
                  className={styles.iconWrapper}
                  size={27}
                  color={"white"}
                  href={"https://github.com/kelvinOhaya"}
                />
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
