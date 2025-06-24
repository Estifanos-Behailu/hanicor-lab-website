"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  useCases?: string[]
  keyBenefits?: string[]
  ctaText?: string
  ctaLink?: string
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
    },
  }),
}

const ServiceCard = ({
  icon,
  title,
  description,
  useCases,
  keyBenefits,
  ctaText,
  ctaLink,
  index,
}: ServiceCardProps) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px rgba(0, 229, 255, 0.15)",
        rotateY: 5,
      }}
      className="group relative bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6 p-3 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300 inline-flex">
          <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-6 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>

        {useCases && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">Use Cases:</h4>
            <ul className="space-y-2 text-sm">
              {useCases.map((uc, i) => (
                <li key={i} className="flex items-start text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {keyBenefits && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wider">Key Benefits:</h4>
            <ul className="space-y-2 text-sm">
              {keyBenefits.map((kb, i) => (
                <li key={i} className="flex items-start text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {kb}
                </li>
              ))}
            </ul>
          </div>
        )}

        {ctaText && ctaLink && (
          <motion.div
            className="mt-auto pt-4"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button 
              variant="link" 
              className="text-cyan-400 p-0 hover:text-cyan-300 font-semibold group/btn" 
              asChild
            >
              <Link href={ctaLink} className="flex items-center">
                {ctaText} 
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Border gradient animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" style={{
        background: 'linear-gradient(45deg, transparent 30%, rgba(0, 229, 255, 0.1) 50%, transparent 70%)',
        animation: 'borderGlow 3s ease-in-out infinite'
      }} />
    </motion.div>
  )
}

export default ServiceCard