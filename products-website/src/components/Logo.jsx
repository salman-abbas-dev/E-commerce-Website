import React from 'react';

export default function Logo({ className = "w-24 h-auto" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 270 150"
            className={className}
            fill="none"
        >
            <defs>
                <linearGradient id="zenithGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo */}
                    <stop offset="100%" stopColor="#9333EA" /> {/* Purple */}
                </linearGradient>
            </defs>

            {/* Typography - Shifted left to replace the removed 'Z' icon */}
            <text
                x="10"
                y="105"
                fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                fontSize="82"
                fontWeight="900"
                fill="url(#zenithGradient)"
                letterSpacing="-0.05em"
            >
                Zenith
            </text>

            {/* Accent Dot - Shifted left to match the text */}
            <circle cx="255" cy="105" r="10" fill="url(#zenithGradient)" />
        </svg>
    );
}