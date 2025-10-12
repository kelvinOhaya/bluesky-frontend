import { motion } from "framer-motion";

function SendIcon({ size = 34, color = "currentcolor", className }) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={color}
      >
        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
      </svg>
    </div>
  );
}

export default SendIcon;
