"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([])

  useEffect(() => {
    // Generate particle positions only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative py-20 overflow-hidden"
    >
      {/* Animated Background with smooth transition from contact */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-gray-900" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, -60],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-cyan-600/8 to-blue-600/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-600/8 to-cyan-600/8 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <Link href="#home" className="flex items-center group mb-6">
              <div className="relative p-3 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-600/10 group-hover:from-cyan-400/20 group-hover:to-blue-600/20 transition-all duration-300">
                <Image 
                  src="/images/logo.png" 
                  alt="Hanicor Lab Logo" 
                  width={40} 
                  height={40} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Hanicor Lab
              </span>
            </Link>
            
            <p className="text-gray-400 max-w-lg leading-relaxed text-center">
              Your Partner in <span className="text-cyan-400 font-semibold">Future-Proof Technology</span>. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold text-lg">
                Let's build something extraordinary together.
              </span>
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mb-8"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <p className="text-gray-500 text-sm flex items-center">
              &copy; {currentYear} Hanicor Lab. Made with{" "}
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />{" "}
              for innovation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </motion.footer>
  )
}

export default Footer
