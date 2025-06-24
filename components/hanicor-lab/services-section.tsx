"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./service-card";
import {
  Code2,
  BrainCircuit,
  Cloud,
  ShieldAlert,
  BarChart3,
  Settings,
  Link, // New icon for Blockchain Solutions
} from "lucide-react";

const services = [
  {
    icon: <Code2 className="h-10 w-10" />,
    title: "Custom Software Development",
    description:
      "Your business is unique and your software should be too. We design high-performance web and mobile apps that solve real problems, streamline operations, and delight users.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10" />,
    title: "AI & Automation",
    description:
      "Stop wasting time on repetitive tasks. Our AI-powered automation handles workflows, predicts trends, and cuts operational costs.",
    useCases: [
      "Chatbots for 24/7 customer support",
      "Predictive Analytics for smarter decisions",
      "Process Automation for HR, Sales, and Logistics",
    ],
  },
  {
    icon: <Cloud className="h-10 w-10" />,
    title: "Cloud Computing",
    description:
      "Migrate, optimize, or scale securely in the cloud. We deploy AWS, Azure, and Google Cloud solutions that reduce downtime, enhance security, and save costs.",
    keyBenefits: [
      "99.9% Uptime guaranteed",
      "Cost-efficient scaling (pay only for what you use)",
      "Disaster recovery built-in",
    ],
  },
  {
    icon: <ShieldAlert className="h-10 w-10" />,
    title: "Cybersecurity Audits & Assessments",
    description:
      "Think you're secure? Many businesses don't realize vulnerabilities until it's too late. Our penetration testing and compliance audits expose risks before hackers do.",
    keyBenefits: [
      "Data breaches",
      "Ransomware attacks",
      "Compliance failures (GDPR, HIPAA, SOC2)",
    ],
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Data Analytics & BI",
    description:
      "Data is useless without insights. We turn your raw numbers into actionable strategies, helping you predict trends, optimize spending, and boost revenue.",
    keyBenefits: [
      "Real-time dashboards (Power BI, Tableau)",
      "Customer behavior analysis",
      "AI-driven forecasting",
    ],
  },
  {
    icon: <Link className="h-10 w-10" />,
    title: "Blockchain Solutions",
    description:
      "Leverage the power of blockchain to secure transactions, enhance transparency, and streamline operations. Our solutions integrate seamlessly with your existing systems.",
    keyBenefits: [
      "Enhanced security through decentralized data storage",
      "Increased transparency and traceability",
      "Reduced costs by eliminating intermediaries",
    ],
  },
];

const ServicesSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [500, 1500], [0, -150])

  return (
    <section
      id="services"
      className="relative min-h-screen py-20 md:py-32 overflow-hidden"
    >
      {/* Animated Background with smooth transition from about */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-900" />
        
        {/* Animated Grid with different pattern */}
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{ y }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move-alt 30s linear infinite'
          }} />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, -120],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm mb-6">
              <Settings className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-blue-400 text-sm font-medium tracking-wider">
                OUR SERVICES
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent">Engineered</span>
            <br />
            For <span className="text-white">Impact</span>
          </h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We provide innovative and scalable technology solutions tailored to
            meet the evolving needs of <span className="text-cyan-400 font-semibold">businesses</span> and <span className="text-cyan-400 font-semibold">individuals</span>.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              useCases={service.useCases}
              keyBenefits={service.keyBenefits}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move-alt {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(60px, 60px) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;