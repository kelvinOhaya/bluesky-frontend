import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import twoPeopleTalking from "../../assets/twoPeopleTalking.png";
import excited from "../../assets/excited.png";
import Background from "./Background/Background";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Background />
      <div className={styles.container}>
        <h1 className={styles.textContent}>Blue Sky</h1>
        <button onClick={() => navigate("./register")}>
          <p className={styles.buttonText}>Start Here</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
