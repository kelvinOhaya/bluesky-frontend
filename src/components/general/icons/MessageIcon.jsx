function MessageIcon({
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
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "img"}
      aria-label={title || undefined}
      aria-hidden={title ? "false" : "true"}
    >
      {title ? <title>{title}</title> : null}
      {/* Rounded chat bubble with tail */}
      <path d="M4 6.5C4 4.57 5.57 3 7.5 3h9C18.43 3 20 4.57 20 6.5v5c0 1.93-1.57 3.5-3.5 3.5H9.8L6 18.5V15H7.5C5.57 15 4 13.43 4 11.5v-5z" />
    </svg>
  );
}

export default MessageIcon;
