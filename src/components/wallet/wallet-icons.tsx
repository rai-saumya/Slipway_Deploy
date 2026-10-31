export function MetaMaskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20.5 3.5 13 8.8l1.4-3.3 6.1-2Z"
        fill="currentColor"
        fillOpacity={0.9}
      />
      <path
        d="M3.5 3.5 10.9 8.9 9.6 5.5l-6.1-2ZM17.7 15.9l-1.9 2.9 4.1 1.1 1.2-3.9-3.4-.1ZM2.9 16l1.2 3.9 4.1-1.1-1.9-2.9-3.4.1Z"
        fill="currentColor"
        fillOpacity={0.9}
      />
      <path
        d="m7.9 10.5-1.1 1.7 4.1.2-.1-4.4-2.9 2.5ZM16.1 10.5 13.1 8l-.1 4.4 4.1-.2-1-1.7ZM8 18.8l2.5-1.2-2.1-1.6-.4 2.8ZM13.5 17.6l2.5 1.2-.4-2.8-2.1 1.6Z"
        fill="currentColor"
        fillOpacity={0.6}
      />
    </svg>
  );
}

export function BackpackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 4h8a2 2 0 0 1 2 2v1.1a4 4 0 0 1 2 3.5V18a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7.4a4 4 0 0 1 2-3.5V6a2 2 0 0 1 2-2Z" />
      <path d="M9 4v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4" />
      <path d="M9 13h6" />
      <path d="M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
    </svg>
  );
}
