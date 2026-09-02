import React from 'react';

export default function Logo({ className = "w-32 h-auto" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 150"
            className={className}
            fill="none"
        >
            <defs>
                <linearGradient id="zenithGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo */}
                    <stop offset="100%" stopColor="#9333EA" /> {/* Purple */}
                </linearGradient>
            </defs>

            {/* Geometric Icon */}
            <rect x="10" y="25" width="100" height="100" rx="24" fill="url(#zenithGradient)" />
            <path
                d="M 35 45 L 85 45 L 35 105 L 85 105"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Typography - Updated to use the gradient */}
            <text
                x="135"
                y="105"
                fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                fontSize="82"
                fontWeight="900"
                fill="url(#zenithGradient)"
                letterSpacing="-0.05em"
            >
                Zenith
            </text>

            {/* Accent Dot */}
            <circle cx="380" cy="105" r="10" fill="url(#zenithGradient)" />
        </svg>
    );
}