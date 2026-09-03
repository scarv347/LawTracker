import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const LayoutDashboard = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);

export const Scale = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M12 2v8M7 7l5-3 5 3M4 12h16M8 12v6a4 4 0 0 0 8 0v-6"/>
  </svg>
);

export const MessageCircle = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M21 11.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z"/>
    <path d="M8 10h8M8 14h5"/>
  </svg>
);

export const Calendar = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

export const FolderOpen = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M3 7l6 3 6-3 6 3v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="M9 7V5a2 2 0 0 1 2-2h2"/>
  </svg>
);

export const Plus = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

export const Send = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);

export const Sparkle = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z"/>
  </svg>
);

export const ArrowLeft = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

export const Eye = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/>
    <circle cx="12" cy="12" r="2.5"/>
  </svg>
);

export const EyeOff = ({className, ...props}: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false" {...props}>
    <path d="M3 3l18 18M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a18.5 18.5 0 0 1-3.1 3.7M6.2 6.3C3.5 8 2 12 2 12s3.5 6 10 6a9.9 9.9 0 0 0 3-.5"/>
  </svg>
);
