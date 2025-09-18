import React from "react";

type IconProps = {
  color: string;
  size?: number;
};

export const IpfsIcon: React.FC<IconProps> = ({ color, size = 6 }) => (
  <div className={`h-${size} w-${size} inline-block`}>
    <svg
      className={`w-full h-full inline-block`}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path
        d="M7 17l10-6M7 7l10 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
      <circle cx="17" cy="12" r="1.5" fill="currentColor" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

export const DocIcon: React.FC<IconProps> = ({ color, size = 6 }) => (
  <div className={`h-${size} w-${size} inline-block`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full inline-block`}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0013.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  </div>
);
