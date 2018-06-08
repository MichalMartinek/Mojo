import React from 'react';

 const Spinner = () =>
  (<div
    className="loading-indicator"
  >
    <svg
      className="loading-indicator__svg"
      viewBox="0 0 38 38"
      height="60"
      width="60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="loading-a">
          <stop stopColor="#009999" stopOpacity="0" offset="0%" />
          <stop stopColor="#009999" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#009999" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#loading-a)" strokeWidth="2" transform="rotate(186.128 18 18)">
            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
          </path>
          <circle fill="#7e3f91" cx="36" cy="18" r="1" transform="rotate(186.128 18 18)">
            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>
  </div>);

export default Spinner;
