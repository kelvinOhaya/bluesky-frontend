import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { CloudIcon } from "../../../components/general/icons";
import styles from "./Background.module.css";
import useChatRoom from "../../../contexts/chatRoom/useChatRoom";

const CLOUD_COUNT = 30;
const CLOUD_WIDTH = 110; // px, adjust to your icon size

const ANIMATION_DURATION = 40; // seconds

export default function Background() {
  const { windowWidth } = useChatRoom();

  return (
    <div className={styles.container}>
      {Array.from({ length: windowWidth / CLOUD_WIDTH }).map(
        (row, rowIndex) => (
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              width: "100vw",
              position: "relative",
              height: "fitContent",
            }}
          >
            <motion.div
              initial={{ x: rowIndex % 2 ? "0" : "-100%" }}
              animate={{ x: rowIndex % 2 ? "-100%" : "0" }}
              transition={{
                duration: ANIMATION_DURATION,
                repeat: Infinity,
                ease: "linear",
              }}
              className={styles.cloudRow}
            >
              {Array.from({ length: CLOUD_COUNT }).map((_, i) => (
                <CloudIcon key={`cloud-1: ${i}`} size={CLOUD_WIDTH} />
              ))}
            </motion.div>
          </div>
        )
      )}
    </div>
  );
}

/**
 * Array of clouds
 * when last cloud in array reaches the end, the clouds reset on the other side of the screen
 *
 * What I would need:
 * -Keep track of last cloud pos
 * -2 Arrays that are the size of the whole screen
 * -Enough clouds to fill such an array
 */
