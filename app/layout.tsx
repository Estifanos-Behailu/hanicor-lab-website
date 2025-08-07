import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Script from "next/script"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Hanicor Lab | Cutting-Edge Tech Solutions",
  description:
    "Innovative and scalable technology solutions tailored to meet the evolving needs of businesses and individuals. Expert-driven software development, AI solutions, cloud computing, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(poppins.variable, "scroll-smooth")} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased">
        <Script 
          src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" 
          strategy="beforeInteractive"
        />
        <Script 
          src="https://files.bpcontent.cloud/2025/08/07/08/20250807084543-7THXBVTF.js" 
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
