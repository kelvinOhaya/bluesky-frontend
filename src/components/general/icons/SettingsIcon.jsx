import { motion } from "framer-motion";
const SettingsIcon = ({
  size = 24,
  color = "currentColor",
  isActive,
  className,
}) => {
  return (
    <div className={className}>
      <motion.svg
        width={size}
        height={size}
        animate={{ rotate: isActive.settings ? 90 : 0 }}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.14 12.936a7.948 7.948 0 0 0 .051-.936c0-.318-.017-.63-.051-.936l2.037-1.593a.5.5 0 0 0 .121-.63l-1.928-3.34a.5.5 0 0 0-.607-.22l-2.4.96a7.974 7.974 0 0 0-1.62-.936l-.36-2.52A.5.5 0 0 0 13.901 2h-3.802a.5.5 0 0 0-.493.42l-.36 2.52a7.974 7.974 0 0 0-1.62.936l-2.4-.96a.5.5 0 0 0-.607.22L2.69 8.476a.5.5 0 0 0 .121.63L4.848 10.7c-.034.306-.051.618-.051.936s.017.63.051.936l-2.037 1.593a.5.5 0 0 0-.121.63l1.928 3.34a.5.5 0 0 0 .607.22l2.4-.96c.495.405 1.036.744 1.62.936l.36 2.52a.5.5 0 0 0 .493.42h3.802a.5.5 0 0 0 .493-.42l.36-2.52c.584-.192 1.125-.531 1.62-.936l2.4.96a.5.5 0 0 0 .607-.22l1.928-3.34a.5.5 0 0 0-.121-.63l-2.037-1.593zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
      </motion.svg>
    </div>
  );
};

export default SettingsIcon;
