import React from "react";

function CloudIcon({ className, size }) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        <path
          d="M48 28a12 12 0 0 0-23.52-3A8 8 0 0 0 16 32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default CloudIcon;
