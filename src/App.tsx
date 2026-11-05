import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { Hero, IdentityStrip } from './components/Hero'
import { Music } from './components/Music'
import { Events } from './components/Events'
import { Collective } from './components/Collective'
import { Footer } from './components/Footer'

export default function App() {
  return <MotionConfig reducedMotion="user"><a href="#contenido" className="skip-link">Saltar al contenido</a><Header /><main id="contenido"><Hero /><IdentityStrip /><Music /><Events /><Collective /></main><Footer /></MotionConfig>
}
