import React from "react";
import styles from "./GoBack.module.css";

function GoBack({ onClick }) {
  return (
    <button className={styles.goBack} onClick={onClick}>
      <p> &gt;</p>
    </button>
  );
}

export default GoBack;
