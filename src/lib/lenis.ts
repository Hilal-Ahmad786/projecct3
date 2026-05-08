'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGSAP } from '@/lib/gsap'

export const lenisRef: { current: Lenis | null } = { current: null }

export function useLenis() {
  useEffect(() => {
    initGSAP()

    const lenis = new Lenis({ autoRaf: false })
    lenisRef.current = lenis

    // Keep ScrollTrigger in sync with every Lenis scroll event
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from the GSAP ticker so both share one rAF loop
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Proxy the native scroller so ScrollTrigger pins/scrubs read Lenis position
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
}
