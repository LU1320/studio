// src/components/icons/paw-print-icon.tsx
import type { SVGProps } from 'react';

export function PawPrintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="4" cy="8" r="2" />
      <path d="M9 10.5A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 3 5.5" />
      <path d="M17.5 14a9 9 0 0 1-11 0" />
    </svg>
  );
}
