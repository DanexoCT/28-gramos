/** Smooth seven-leaf silhouette based on the supplied visual reference. */
export function HerbLeaf({ className = '' }: { className?: string }) {
  return <svg className={`herb-leaf ${className}`} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M32 48C23 39 24 24 32 3C40 24 41 39 32 48Z" />
    <path d="M32 48C19 44 10 32 6 18C21 26 29 35 32 48Z" />
    <path d="M32 48C45 44 54 32 58 18C43 26 35 35 32 48Z" />
    <path d="M32 48C23 40 13 41 2 44C13 51 23 53 32 48Z" />
    <path d="M32 48C41 40 51 41 62 44C51 51 41 53 32 48Z" />
    <path d="M32 48C26 49 23 53 21 57C26 56 30 53 32 48Z" />
    <path d="M32 48C38 49 41 53 43 57C38 56 34 53 32 48Z" />
    <path d="M31.7 47C32.5 53 32 57 30.5 61C34.5 61 34.6 59.3 34 56L33 47Z" />
  </svg>
}
