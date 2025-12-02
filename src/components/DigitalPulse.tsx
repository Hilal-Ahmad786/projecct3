'use client'

import { useEffect, useRef } from 'react'

export default function DigitalPulse({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let width = 0
        let height = 0
        let time = 0

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)
            time += 0.01

            // Draw multiple sine waves
            const waves = [
                { amplitude: 50, frequency: 0.01, speed: 0.02, color: 'rgba(16, 185, 129, 0.1)' }, // Emerald
                { amplitude: 30, frequency: 0.02, speed: 0.03, color: 'rgba(139, 92, 246, 0.1)' }, // Purple
                { amplitude: 20, frequency: 0.03, speed: 0.01, color: 'rgba(249, 115, 22, 0.1)' }  // Orange
            ]

            waves.forEach((wave, i) => {
                ctx.beginPath()
                ctx.strokeStyle = wave.color
                ctx.lineWidth = 2

                for (let x = 0; x < width; x++) {
                    const y = height / 2 +
                        Math.sin(x * wave.frequency + time * (i + 1)) * wave.amplitude +
                        Math.cos(x * 0.005 + time) * 20 // Add some complexity

                    if (x === 0) {
                        ctx.moveTo(x, y)
                    } else {
                        ctx.lineTo(x, y)
                    }
                }
                ctx.stroke()
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        draw()

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    )
}
