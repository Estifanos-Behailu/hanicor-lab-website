import Header from "@/components/hanicor-lab/header"
import HeroSection from "@/components/hanicor-lab/hero-section"
import AboutSection from "@/components/hanicor-lab/about-section"
import ServicesSection from "@/components/hanicor-lab/services-section"
import ContactSection from "@/components/hanicor-lab/contact-section"
import Footer from "@/components/hanicor-lab/footer"
import ParticleBackground from "@/components/hanicor-lab/particle-background"
import { Toaster } from "@/components/ui/toaster"

export default function HanicorLabPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <ParticleBackground />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
