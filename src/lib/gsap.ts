import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

let initialised = false

export function initGSAP() {
  if (initialised) return
  initialised = true
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
}
