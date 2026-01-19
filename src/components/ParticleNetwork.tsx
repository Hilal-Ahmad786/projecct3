'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
}

interface ParticleNetworkProps {
    className?: string
    color?: string
}

export default function ParticleNetwork({ className = '', color = '#6b7280' }: ParticleNetworkProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        // Skip animation if user prefers reduced motion
        if (prefersReducedMotion) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        let width = 0
        let height = 0

        // Configuration - reduced for better performance
        const particleCount = 35
        const connectionDistance = 120
        const mouseDistance = 150
        const particleSpeed = 0.3

        // Mouse state
        const mouse = { x: -1000, y: -1000 }

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            initParticles()
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        const initParticles = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * particleSpeed,
                    vy: (Math.random() - 0.5) * particleSpeed,
                    size: Math.random() * 2 + 1
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            // Update and draw particles with neutral gray color
            ctx.fillStyle = color
            ctx.strokeStyle = color

            particles.forEach((p, i) => {
                // Move
                p.x += p.vx
                p.y += p.vy

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                // Draw particle
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()

                // Connect to mouse
                const dxMouse = mouse.x - p.x
                const dyMouse = mouse.y - p.y
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

                if (distMouse < mouseDistance) {
                    ctx.lineWidth = 1
                    ctx.globalAlpha = (1 - distMouse / mouseDistance) * 0.5
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                    ctx.globalAlpha = 1
                }

                // Connect to other particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        ctx.lineWidth = 0.5
                        ctx.globalAlpha = (1 - dist / connectionDistance) * 0.2
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                        ctx.globalAlpha = 1
                    }
                }
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        // Initialize
        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        draw()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [prefersReducedMotion, color])

    // Return static element for reduced motion preference
    if (prefersReducedMotion) {
        return (
            <div
                className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
                style={{
                    opacity: 0.3,
                    background: 'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1), transparent 70%)'
                }}
            />
        )
    }

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ opacity: 0.5 }}
        />
    )
}
