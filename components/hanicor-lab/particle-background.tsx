"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesArrayRef = useRef<Particle[]>([])

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const size = Math.random() * 2 + 0.5 // Smaller particles
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const speedX = Math.random() * 0.4 - 0.2 // Slower movement
    const speedY = Math.random() * 0.4 - 0.2
    const color = `rgba(0, 229, 255, ${Math.random() * 0.3 + 0.1})` // Cyan, more transparent
    return { x, y, size, speedX, speedY, color }
  }, [])

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesArrayRef.current.forEach((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      if (particle.x > canvas.width || particle.x < 0) particle.speedX *= -1
      if (particle.y > canvas.height || particle.y < 0) particle.speedY *= -1

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()

      // Draw lines to nearby particles
      particlesArrayRef.current.forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          // Max distance for line
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 229, 255, ${1 - (distance / 100) * 0.8})` // Line opacity based on distance
          ctx.lineWidth = 0.2
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animateParticles)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesArrayRef.current = []
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000) // Adjust density
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArrayRef.current.push(createParticle(canvas))
      }
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)
    animateParticles()

    return () => window.removeEventListener("resize", setCanvasSize)
  }, [animateParticles, createParticle])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />
}

export default ParticleBackground
