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
  
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      // Simple form submission - you can integrate with your preferred email service later
      console.log("Form submitted:", data)
      
      // Simulate a delay for form submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Message Received!",
        description: "Thanks for reaching out. We'll get back to you within 24 hours.",
        variant: "default",
      })
      reset()
    } catch (error) {
      console.error("Form submission failed:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-40, -140],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: Math.random() * 6 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
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
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-gray-300 mb-2 block font-medium">
                  What Do You Need Help With?
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us about your project or needs..."
                  rows={5}
                  className="bg-gray-800/50 border-gray-700 focus:border-cyan-400 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-xl resize-none"
                />
                {errors.message && <p className="text-sm text-red-400 mt-2">{errors.message.message}</p>}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-lg py-4 rounded-xl border-0 group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && (
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </div>
                </Button>
              </motion.div>
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