function GlobeIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main circle */}
      <circle cx="12" cy="12" r="10" />

      {/* Horizontal lines (latitude) */}
      <path d="M2 12h20" />
      <path d="M3.5 7c0 0 3.5-1 8.5-1s8.5 1 8.5 1" />
      <path d="M3.5 17c0 0 3.5 1 8.5 1s8.5-1 8.5-1" />

      {/* Vertical elliptical lines (longitude) - forward facing */}
      <path d="M12 2v20" />
      <path d="M17 3.5c1 2.5 1 14.5 0 17" />
      <path d="M7 3.5c-1 2.5-1 14.5 0 17" />
    </svg>
  );
}

export default GlobeIcon;
