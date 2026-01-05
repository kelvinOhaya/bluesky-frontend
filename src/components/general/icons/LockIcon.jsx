function LockIcon({
  size = 32,
  color = "currentColor",
  className = "",
  title,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "img"}
      aria-label={title || undefined}
      aria-hidden={title ? "false" : "true"}
    >
      {title ? <title>{title}</title> : null}
      {/* Body (rounded) - Draw this first */}
      <rect x="6" y="9" width="12" height="11" rx="1.8" fill={color} />
      {/* Shackle - draw this on top */}
      <path
        d="M7 10V8.5C7 6.01 9.01 4 11.5 4S16 6.01 16 8.5V10h1.5A1.5 1.5 0 0 1 19 11.5v7A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-7A1.5 1.5 0 0 1 6.5 10H8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Keyhole (optional) */}
      <path d="M12 13.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="white" />
    </svg>
  );
}

export default LockIcon;
