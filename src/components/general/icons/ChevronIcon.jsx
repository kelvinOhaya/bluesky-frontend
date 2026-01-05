import { motion } from "framer-motion";

const ChevronIcon = ({
  direction = "right",
  size = 24,
  color = "currentColor",
  isActive,
  className,
}) => {
  return (
    <motion.div
      className={className}
      whileTap={{ scale: 1.2 }}
      animate={{
        rotate: isActive ? 180 : 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `rotate(${
            direction === "down"
              ? 90
              : direction === "up"
              ? -90
              : direction === "left"
              ? 180
              : 0
          }deg)`,
        }}
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </motion.div>
  );
};

export default ChevronIcon;
