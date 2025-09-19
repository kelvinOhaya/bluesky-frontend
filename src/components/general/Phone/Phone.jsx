import styles from "./Phone.module.css";

function Phone({ className }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 400" className={styles.phone}>
        {/* Phone body */}
        <rect
          x="0"
          y="0"
          width="200"
          height="400"
          rx="40"
          className={styles.phoneBody}
        />

        {/* Screen area */}
        <rect
          x="15"
          y="40"
          width="170"
          height="320"
          rx="20"
          className={styles.screen}
        />

        {/* Chat bubbles */}
        <rect
          x="30"
          y="60"
          width="120"
          height="30"
          rx="10"
          className={styles.bubble}
        />
        <rect
          x="50"
          y="110"
          width="90"
          height="30"
          rx="10"
          className={styles.bubbleAlt}
        />
        <rect
          x="30"
          y="160"
          width="100"
          height="30"
          rx="10"
          className={styles.bubble}
        />
      </svg>
    </div>
  );
}

export default Phone;
