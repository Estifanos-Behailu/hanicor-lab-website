"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Send, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import emailjs from "@emailjs/browser"
import { useState, useEffect } from "react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const ContactSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [1000, 2000], [0, -100])
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([])
  
  const { toast } = useToast()
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    // Generate particle positions only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5,
    }))
    setParticles(newParticles)
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setEmailStatus('sending')
    setErrorMessage('Message was not sent. Please try again.')
    
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        setEmailStatus('error')
        toast({
          title: "❌ Message Not Sent",
          description: "Message was not sent. Please try again.",
          variant: "destructive",
        })
        return
      }

      emailjs.init(publicKey)

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        company: data.company || "Not specified",
        message: data.message,
        to_name: "Hanicor Lab Team",
        reply_to: data.email,
      }

      const response = await emailjs.send(serviceId, templateId, templateParams)
      
      if (response.status === 200) {
        setEmailStatus('success')
        toast({
          title: "✅ Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
          variant: "default",
        })
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error("Email sending failed:", error) // Keep error logging for debugging
      
      setEmailStatus('error')
      toast({
        title: "❌ Message Not Sent",
        description: "Message was not sent. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <section id="contact" className="relative min-h-screen py-20 md:py-32 flex items-center overflow-hidden">
      {/* Animated Background with smooth transition from services */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ y }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move-contact 35s linear infinite'
          }} />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-40, -140],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-600/15 to-purple-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/5 backdrop-blur-sm mb-6">
              <Mail className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-purple-400 text-sm font-medium tracking-wider">
                GET IN TOUCH
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Let's Turn Your <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Vision into Reality</span>
          </h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to elevate your business with innovative technology? Fill out our quick form, and one of our experts
            will respond within <span className="text-cyan-400 font-semibold">24 hours</span> to discuss your vision.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {/* Status Banner */}
          {emailStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl border ${
                emailStatus === 'sending' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                emailStatus === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {emailStatus === 'sending' && (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                    <p>Sending your message...</p>
                  </>
                )}
                {emailStatus === 'success' && (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Message sent successfully! We'll respond within 24 hours.</p>
                  </>
                )}
                {emailStatus === 'error' && (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p>Message was not sent. Please try again.</p>
                  </>
                )}
              </div>
            </motion.div>
          )}

          <div className="relative bg-gray-900/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-gray-800 shadow-2xl">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-cyan-400/5 rounded-3xl" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your Name"
                    className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-xl h-12"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-sm text-red-400 mt-2">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-xl h-12"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-sm text-red-400 mt-2">{errors.email.message}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="company" className="text-gray-300 mb-2 block font-medium">
                  Company <span className="text-gray-500">(Optional)</span>
                </Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Your Company"
                  className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-xl h-12"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-gray-300 mb-2 block font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us about your project..."
                  className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-xl min-h-[120px]"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-sm text-red-400 mt-2">{errors.message.message}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 relative overflow-hidden group"
                disabled={isSubmitting}
              >
                <span className={`absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-200 ${isSubmitting ? 'opacity-100' : 'opacity-0'}`}>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  Send Message
                </span>
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move-contact {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, 25px) scale(1.1); }
          100% { transform: translate(50px, 50px) scale(1); }
        }
      `}</style>
    </section>
  )
}

export default ContactSection