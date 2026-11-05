import { Stars } from './Primitives'

export function WantedHud() {
  return <div className="wanted-hud" aria-hidden="true">
    <span className="hud-kicker">28GR / MÁXIMO NIVEL</span>
    <Stars className="wanted-stars" />
    <strong>5 estrellas</strong>
    <div className="hud-stripes"><span /><span /></div>
  </div>
}

/** An original, fictional district graphic: decorative, with no location tracking. */
export function DistrictRadar() {
  return <div className="zone-radar" aria-hidden="true">
    <div className="radar-face">
      <svg className="district-map" viewBox="0 0 180 180" fill="none">
        <defs>
          <pattern id="district-streets" width="44" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)">
            <rect width="44" height="36" fill="#444444" />
            <path d="M0 0H44M0 0V36" stroke="#bdbdbd" strokeWidth="9" />
            <path d="M23 9V28H35" stroke="#676767" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="180" height="180" fill="url(#district-streets)" />
        <path d="M133-8C103 35 164 72 143 117C129 148 149 167 190 183H204V-8Z" fill="#27262b" stroke="#6b636e" strokeWidth="6" />
        <path d="M-9 120 42 96 79 115 107 62 131 73" stroke="#080808" strokeWidth="9" strokeLinejoin="round" />
        <path className="radar-route" d="M-9 120 42 96 79 115 107 62 131 73" stroke="#ff1493" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="131" cy="73" r="7" fill="#f1ede7" stroke="#080808" strokeWidth="3" />
        <path d="m77 97-9 22 12-6 11 3Z" fill="#f1ede7" stroke="#080808" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span className="radar-sweep" />
      <span className="radar-north">N</span>
      <span className="radar-coordinate">28</span>
    </div>
    <div className="radar-caption"><span>ZONA 28</span><span>LA CALLE ES EL ESCENARIO.</span></div>
  </div>
}
