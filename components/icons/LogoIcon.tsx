import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4"/>
        {/* Right arrow */}
        <path d="M30 40 L 70 40" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
        <path d="M58 28 L 70 40 L 58 52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Left arrow */}
        <path d="M70 60 L 30 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
        <path d="M42 72 L 30 60 L 42 48" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
