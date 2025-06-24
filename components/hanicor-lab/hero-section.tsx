"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    // Generate particle positions only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }))
    setParticles(newParticles)
  }, []);

  if (!isMounted) return null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background with smooth transition to about */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>

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
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium tracking-wider">
              INNOVATION UNLEASHED
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-none">
            <span className="block text-white font-extralight">Crafting</span>
                         <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-black py-4 px-1 overflow-visible">
               Digital Dreams
             </span>
            <span className="block text-white font-extralight">Into Reality</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We transform visionary ideas into cutting-edge digital experiences through 
          <span className="text-cyan-400 font-semibold"> AI</span>, 
          <span className="text-cyan-400 font-semibold"> custom software</span>, and 
          <span className="text-cyan-400 font-semibold"> cloud solutions</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            size="lg"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 border-0"
            asChild
          >
            <Link href="#services" className="flex items-center">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-semibold text-lg rounded-full transition-all duration-300 bg-transparent backdrop-blur-sm"
            asChild
          >
            <Link href="#about">
              Learn More
            </Link>
          </Button>
        </motion.div>


      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <Link href="#about" aria-label="Scroll to about section">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span className="text-xs uppercase tracking-wider mb-2 group-hover:text-cyan-400">
              Scroll
            </span>
            <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-cyan-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-gray-400 group-hover:bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        h1 {
          font-family: 'Inter', sans-serif;
          line-height: 0.9;
          letter-spacing: -0.02em;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;