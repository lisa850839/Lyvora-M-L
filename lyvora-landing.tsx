"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Lock,
  MessageSquare,
  Shield,
  Zap,
  Coins,
  FileText,
  AlertTriangle,
  BookOpen,
  Scale,
  Eye,
  Rocket,
  Target,
  Flame,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function LyvoraLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [email, setEmail] = useState("")
  const [profile, setProfile] = useState("")
  const [country, setCountry] = useState("")
  const [otherCountry, setOtherCountry] = useState("")
  const [expectations, setExpectations] = useState("")

  const [showScrollTop, setShowScrollTop] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 200
    const connections: Connection[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulse: number
      pulseSpeed: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `hsl(${Math.random() * 60 + 280}, 70%, 60%)`
        this.opacity = Math.random() * 0.5 + 0.2
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.02
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += this.pulseSpeed

        if (this.x > (canvas?.width || 0)) this.x = 0
        if (this.x < 0) this.x = (canvas?.width || 0)
        if (this.y > (canvas?.height || 0)) this.y = 0
        if (this.y < 0) this.y = (canvas?.height || 0)
      }

      draw() {
        if (!ctx) return
        const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.2
        ctx.globalAlpha = Math.max(0, pulseOpacity)
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size + Math.sin(this.pulse) * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    class Connection {
      p1: Particle
      p2: Particle
      opacity: number

      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1
        this.p2 = p2
        this.opacity = 0
      }

      update() {
        const dx = this.p1.x - this.p2.x
        const dy = this.p1.y - this.p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          this.opacity = ((150 - distance) / 150) * 0.3
        } else {
          this.opacity = 0
        }
      }

      draw() {
        if (!ctx || this.opacity <= 0) return
        ctx.globalAlpha = this.opacity
        ctx.strokeStyle = `hsl(${Math.random() * 60 + 280}, 70%, 60%)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.stroke()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connections.push(new Connection(particles[i], particles[j]))
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      for (const connection of connections) {
        connection.update()
        connection.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist submission
    console.log({ email, profile, country, expectations })
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-pink-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-purple-400 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-cyan-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin-reverse"></div>
            </div>
            <div className="mt-6 text-purple-400 font-mono text-lg tracking-wider animate-pulse">
              INITIALIZING LYVORA
            </div>
            <div className="mt-2 flex space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-purple-500/20 animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lyvora
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-purple-400 transition-all duration-300 hover:scale-105 animate-fade-in-delay-1"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-300 hover:text-purple-400 transition-all duration-300 hover:scale-105 animate-fade-in-delay-2"
                >
                  How It Works
                </a>
                <a
                  href="#roadmap"
                  className="text-gray-300 hover:text-purple-400 transition-all duration-300 hover:scale-105 animate-fade-in-delay-3"
                >
                  Roadmap
                </a>
              </nav>

              <Button
                onClick={() => scrollToSection("waitlist")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-pulse-glow hover:scale-105 transition-all duration-300"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center" data-animate id="hero">
          <div className="container mx-auto text-center">
            <Badge
              className={`mb-6 bg-purple-500/20 text-purple-300 border-purple-500/50 px-4 py-2 animate-float ${visibleSections.has("hero") ? "animate-fade-in-up" : "opacity-0"}`}
            >
              <Rocket className="w-4 h-4 mr-2 animate-rocket" />
              Real Commerce. On-Chain. Borderless.
            </Badge>

            <h1
              className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent leading-tight ${visibleSections.has("hero") ? "animate-title-reveal" : "opacity-0"}`}
            >
              A New Era.
              <br />A New Marketplace.
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed ${visibleSections.has("hero") ? "animate-fade-in-up-delay" : "opacity-0"}`}
            >
              Break free from centralized platforms. Trade real-world products with crypto payments, smart contracts,
              and transparent reputation. Only 2.5% fee. No borders. No limits.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${visibleSections.has("hero") ? "animate-buttons-appear" : "opacity-0"}`}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("waitlist")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg animate-pulse-glow hover:scale-105 transition-all duration-300"
              >
                Join the Revolution
                <ArrowRight className="ml-2 h-5 w-5 animate-arrow-move" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                View Pitch
              </Button>
            </div>

            <div
              className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto ${visibleSections.has("hero") ? "animate-stats-counter" : "opacity-0"}`}
            >
              <div className="text-center animate-stat-item">
                <div className="text-3xl font-bold text-purple-400 mb-2 animate-number-count">2.5%</div>
                <div className="text-gray-400">Transaction Fee</div>
              </div>
              <div className="text-center animate-stat-item" style={{ animationDelay: "0.2s" }}>
                <div className="text-3xl font-bold text-purple-400 mb-2 animate-number-count">100%</div>
                <div className="text-gray-400">Crypto Payments</div>
              </div>
              <div className="text-center animate-stat-item" style={{ animationDelay: "0.4s" }}>
                <div className="text-3xl font-bold text-purple-400 mb-2 animate-number-count">0</div>
                <div className="text-gray-400">Borders</div>
              </div>
            </div>
          </div>
        </section>


        {/* Waitlist Section */}
        <section id="waitlist" className="py-20 px-4 bg-gradient-to-b from-purple-900/20 to-black" data-animate>
          <div className="container mx-auto max-w-2xl text-center">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${visibleSections.has("waitlist") ? "animate-title-reveal" : "opacity-0"}`}
            >
              Join Our Waitlist
            </h2>
            <p
              className={`text-xl text-gray-300 mb-12 ${visibleSections.has("waitlist") ? "animate-fade-in-up" : "opacity-0"}`}
            >
              Be among the first to experience the future of decentralized commerce.
            </p>

            <form
              onSubmit={handleWaitlistSubmit}
              className={`space-y-6 ${visibleSections.has("waitlist") ? "animate-form-appear" : "opacity-0"}`}
            >
              <Select value={profile} onValueChange={setProfile}>
                <SelectTrigger className="bg-gray-900/50 border-purple-500/30 text-white hover:border-purple-400/50 transition-all duration-300">
                  <SelectValue placeholder="Select your profile" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/30">
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="both">Both Buyer & Seller</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="bg-gray-900/50 border-purple-500/30 text-white hover:border-purple-400/50 transition-all duration-300">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-purple-500/30">
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ar">Argentina</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {country === "other" && (
                <Input
                  type="text"
                  placeholder="Please specify your country"
                  value={otherCountry}
                  onChange={(e) => setOtherCountry(e.target.value)}
                  className="bg-gray-900/50 border-purple-500/30 text-white placeholder:text-gray-400 hover:border-purple-400/50 transition-all duration-300 animate-fade-in-up"
                />
              )}

              <Textarea
                placeholder="What do you expect from Lyvora?"
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
                className="bg-gray-900/50 border-purple-500/30 text-white placeholder:text-gray-400 min-h-[100px] hover:border-purple-400/50 transition-all duration-300"
              />

              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-900/50 border-purple-500/30 text-white placeholder:text-gray-400 hover:border-purple-400/50 transition-all duration-300"
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 text-lg animate-pulse-glow hover:scale-105 transition-all duration-300"
              >
                Join Waitlist
              </Button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-purple-500/20 bg-gradient-to-b from-purple-900/20 to-black" data-animate id="footer">
          <div className="container mx-auto">
            <div
              className={`flex flex-col md:flex-row items-center justify-between ${visibleSections.has("footer") ? "animate-footer-appear" : "opacity-0"}`}
            >
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Lyvora
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110">
                  Discord
                </a>
              </div>
            </div>

            <div
              className={`mt-8 pt-8 border-t border-purple-500/20 text-center text-gray-400 ${visibleSections.has("footer") ? "animate-fade-in-up-delay" : "opacity-0"}`}
            >
              <p>&copy; 2024 Lyvora. The future of decentralized commerce.</p>
            </div>
          </div>
        </footer>

        {/* Enhanced scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-bounce-in animate-glow"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6 text-white animate-arrow-up" />
          </button>
        )}
      </div>
    </div>
  )
}