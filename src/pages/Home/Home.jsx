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
import useChatRoom from "../../contexts/chatRoom/useChatRoom";

function Home() {
  const navigate = useNavigate();
  const { isMobile, windowWidth } = useChatRoom();
  return (
    <>
      <Background />

      {/* White Background Portion */}
      <div className={styles.background}>
        {/* Contains the stuff on the page and footer */}
        <main className={styles.mainPane}>
          {/* Contains all texts and icons */}
          <section className={styles.mainContent}>
            {/* Title and description */}
            <div className={styles.titleAndDescription}>
              <h1>Blue Sky</h1>
              <p>Chat without distractions - fast, fun, and free</p>
            </div>
            {/* Contains button and icons */}
            <div className={styles.buttonAndIconsContainer}>
              <button onClick={() => navigate("./register")}>
                <p className={styles.buttonText}>Start Here</p>
              </button>
              {/* Feature icons */}
              {!isMobile && (
                <>
                  <div className={styles.featureContainer}>
                    <div className={styles.feature}>
                      <MessageIcon size={35} color={"#0935a0"} />
                      <p>Real-Time</p>
                    </div>
                    <div className={styles.feature}>
                      <GlobeIcon size={35} color={"#0935a0"} />
                      <p>Works Anywhere</p>
                    </div>
                    <div className={styles.feature}>
                      <LockIcon size={35} color={"#0935a0"} />
                      <p>JWT Protected</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          <footer className={styles.footer}>
            {windowWidth > 450 && (
              <>
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
              </>
            )}
          </footer>
        </main>
      </div>
    </>
  );
}

export default Home;
