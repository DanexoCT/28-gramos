const blade = 'M32 49 28 43 29 38 25 35 28 30 25 27 28 23 27 17 30 19 30 10 32 2 34 10 34 19 37 17 36 23 39 27 36 30 39 35 35 38 36 43Z'

/** Small original brand ornament, excluded from navigation and screen readers. */
export function HerbLeaf({ className = '' }: { className?: string }) {
  return <svg className={`herb-leaf ${className}`} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false">
    {[[-78, .48], [-55, .72], [-28, .88], [0, 1], [28, .88], [55, .72], [78, .48]].map(([angle, scale]) => <path key={angle} d={blade} transform={`translate(32 49) rotate(${angle}) scale(${scale}) translate(-32 -49)`} />)}
    <path d="M30.5 46h3v15h-3z" />
  </svg>
}
