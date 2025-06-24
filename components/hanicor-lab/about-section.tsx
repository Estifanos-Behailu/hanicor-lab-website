"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Zap, ShieldCheck, TrendingUp, CheckCircle } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  }),
}

const AboutSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100])
  const opacity = useTransform(scrollY, [400, 800], [0, 1])

  const whyChooseUsItems = [
    {
      icon: <TrendingUp className="h-8 w-8 text-cyan-400" />,
      title: "Strategic, Not Just Technical",
      description: "We align tech with your business goals for maximum ROI.",
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-400" />,
      title: "Future-Ready Solutions",
      description: "Our AI and cloud systems evolve with your needs.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
      title: "Security-First Mindset",
      description: "Every project is built with enterprise-grade protection.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-cyan-400" />,
      title: "Transparent & Affordable",
      description: "No hidden fees. Get a clear, budget-friendly quote upfront.",
    },
  ]

  return (
    <section id="about" className="relative min-h-screen py-20 md:py-32 overflow-hidden">
      {/* Animated Background with smooth transition from hero */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'grid-move 25s linear infinite reverse'
          }} />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -80],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm mb-6">
              <Users className="h-5 w-5 text-cyan-400 mr-3" />
              <span className="text-cyan-400 text-sm font-medium tracking-wider">
                ABOUT OUR MISSION
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Where <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent py-2">Deep Expertise</span>
            <br />
            Meets <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent py-2">Disruptive Innovation</span>
          </h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hanicor Lab was founded by two tech visionaries: one with{" "}
            <span className="text-cyan-400 font-semibold">30+ years of industry leadership</span>, delivering strategic
            insights that drive success, and another with a{" "}
            <span className="text-cyan-400 font-semibold">global network of elite engineers</span> specializing in AI,
            cloud, and cybersecurity. Together, we bridge proven experience with next-gen innovation.
          </motion.p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-16">
            Why <span className="text-cyan-400">Clients Choose Us</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsItems.map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 229, 255, 0.1)"
                }}
                className="group relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-500 flex flex-col items-center"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-6 p-3 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="relative z-10 text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="relative z-10 text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
      `}</style>
    </section>
  )
}

export default AboutSection
