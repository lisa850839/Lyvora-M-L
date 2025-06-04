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
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
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

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
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
        <section className="pt-32 pb-20 px-4" data-animate id="hero">
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

        {/* FAQ Section */}
        <section className="py-20 px-4" data-animate id="faq">
          <div className="container mx-auto max-w-4xl">
            <div className={`space-y-4 ${visibleSections.has("faq") ? "animate-stagger-in" : "opacity-0"}`}>
              <FAQItem
                question="How Lyvora Makes Money"
                answer="Lyvora charges a transparent 2.5% transaction fee. No subscriptions. No withdrawal fees. No hidden costs. This model is sustainable, fair, and designed to grow with the community — keeping more value with users."
                delay="0s"
              />
              <FAQItem
                question="Why Lyvora?"
                answer="Traditional marketplaces control your business, charge excessive fees, block accounts, and hold your money. Lyvora puts power back into the hands of users — with crypto payments, smart contracts, and global borderless commerce. No middlemen. No restrictions. Full transparency on-chain."
                delay="0.2s"
              />
              <FAQItem
                question="Security & Trust"
                answer="Funds are secured through smart contract escrow. Payments are only released when the buyer confirms delivery. On-chain reputation protects both buyers and sellers — with transparent history and no possibility of censorship, account freezing, or scams. No centralized entity can hold your money hostage. Trust is built with code, not with intermediaries."
                delay="0.4s"
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-900/10" data-animate>
          <div className="container mx-auto">
            <h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${visibleSections.has("features") ? "animate-title-reveal" : "opacity-0"}`}
            >
              Revolutionary Features
            </h2>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${visibleSections.has("features") ? "animate-grid-appear" : "opacity-0"}`}
            >
              <FeatureCard
                icon={Shield}
                title="Protection Against Mistakes"
                description="No accidental clicks. No rushed confirmations. Multiple confirmations required for releasing funds or opening disputes."
                features={[
                  "Checkboxes for confirmation",
                  "Clear warnings for final actions",
                  "Protection from pressure and scams",
                ]}
                color="red"
                delay="0s"
              />

              <FeatureCard
                icon={Globe}
                title="Buyer Freedom — You Choose Who You Buy From"
                description="Buy locally (faster delivery, no import taxes) or globally (accept possible import fees and shipping times). Total freedom. You decide."
                features={["Local and global options", "Transparent shipping costs", "Complete buyer control"]}
                color="green"
                delay="0.1s"
              />

              <FeatureCard
                icon={MessageSquare}
                title="In-App Chat — Everything Happens Inside Lyvora"
                description="All communication happens inside the platform. No external apps needed. Chats are encrypted and stored on-chain."
                features={["Encrypted communications", "On-chain storage", "Dispute evidence ready"]}
                color="blue"
                delay="0.2s"
              />

              <FeatureCard
                icon={Coins}
                title="100% Crypto Payments — 100% On-Chain"
                description="Payments happen only inside Lyvora, using crypto. Funds stay locked in smart contracts until delivery confirmation."
                features={["No external wallets needed", "Smart contract protection", "Automatic escrow system"]}
                color="yellow"
                delay="0.3s"
              />

              <FeatureCard
                icon={Zap}
                title="Gas Fees — Explained"
                description="Every blockchain transaction has a gas fee that goes to validators/miners, not Lyvora. A small price for freedom."
                features={["Transparent fee structure", "Network security costs", "No hidden charges"]}
                color="purple"
                delay="0.4s"
              />

              <FeatureCard
                icon={BookOpen}
                title="Education Hub — Learn Everything"
                description="Full Education Hub with multilingual courses covering everything from buying to dispute resolution."
                features={["How to buy and sell", "Wallet and crypto guides", "Multi-language support"]}
                color="pink"
                delay="0.5s"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4" data-animate>
          <div className="container mx-auto">
            <h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${visibleSections.has("how-it-works") ? "animate-title-reveal" : "opacity-0"}`}
            >
              How Lyvora Works
            </h2>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 ${visibleSections.has("how-it-works") ? "animate-work-cards" : "opacity-0"}`}
            >
              <WorkCard
                icon={Target}
                title="A Decentralized Marketplace. No Middlemen. No Banks. No Borders. No Censorship."
                description="Lyvora is a decentralized marketplace for real-world products. You buy and sell using cryptocurrencies. Your payments are protected by smart contract escrow. Your reputation is public, immutable, and fully on-chain."
                highlight="The control is not in the hands of companies, banks, or governments. It's in YOUR hands."
                color="purple"
                delay="0s"
              />

              <WorkCard
                icon={Lock}
                title="Security & Escrow — Protected by Code"
                description="Every transaction is protected by smart contract escrow. When a purchase is made, funds are locked in the contract. No one can touch the funds — not the seller, not the platform, not even the buyer."
                highlight="Funds are released only when the buyer confirms the product was received as agreed."
                color="yellow"
                delay="0.2s"
              />

              <WorkCard
                icon={Scale}
                title="Fast Dispute System — No Bureaucracy, No Delays"
                description="Disputes are resolved in hours — maximum 1 day. Both buyer and seller submit evidence. Funds stay locked until dispute is resolved."
                highlight="All processes are transparent, public, and fully on-chain."
                color="blue"
                delay="0.4s"
              />

              <WorkCard
                icon={AlertTriangle}
                title="Fraud Prevention — It Simply Doesn't Pay"
                description="Tried to scam as a seller? You lose the dispute, don't get paid, and get a permanent on-chain negative reputation. Tried to scam as a buyer? Funds go to the seller and you get flagged."
                highlight="At Lyvora, fraud is simply not worth it."
                color="red"
                delay="0.6s"
              />
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${visibleSections.has("how-it-works") ? "animate-work-cards-delayed" : "opacity-0"}`}
            >
              <WorkCard
                icon={Eye}
                title="Transparent Security — Trust Code, Not People"
                description="All Lyvora smart contracts are open-source, public, and auditable. Anyone can verify the code. Code doesn't lie, freeze, censor, or steal."
                highlight="It just executes — fairly, transparently, immutably."
                color="green"
                delay="0.8s"
              />

              <WorkCard
                icon={Rocket}
                title="Roadmap & Future"
                description="DAO Launch for decentralized governance. Token Launch for staking and incentives. NFT-Based Reputation system. Built-in DEX for crypto swapping."
                highlight="Continuous improvements to the dispute system — smarter, faster, fully automated."
                color="pink"
                delay="1s"
              />
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section
          className="py-16 px-4 bg-gradient-to-r from-amber-900/20 to-red-900/20 border-y border-amber-500/30"
          data-animate
          id="notice"
        >
          <div className="container mx-auto text-center">
            <div
              className={`flex items-center justify-center mb-4 ${visibleSections.has("notice") ? "animate-warning-pulse" : "opacity-0"}`}
            >
              <AlertTriangle className="w-8 h-8 text-amber-400 mr-3 animate-warning-icon" />
              <h3 className="text-2xl font-bold text-amber-400">Important — Full Protection Only Inside Lyvora</h3>
            </div>
            <p
              className={`text-lg text-gray-300 mb-4 ${visibleSections.has("notice") ? "animate-fade-in-up" : "opacity-0"}`}
            >
              All payments, negotiations, and deals happen inside the platform.
            </p>
            <p
              className={`text-lg text-gray-300 mb-4 ${visibleSections.has("notice") ? "animate-fade-in-up-delay" : "opacity-0"}`}
            >
              If you pay outside Lyvora — you are not protected.
            </p>
            <p
              className={`text-lg font-semibold text-white ${visibleSections.has("notice") ? "animate-fade-in-up-delay-2" : "opacity-0"}`}
            >
              Only Lyvora offers escrow, dispute resolution, on-chain reputation, and real security.
            </p>
          </div>
        </section>

        {/* Global Access */}
        <section className="py-20 px-4" data-animate id="global">
          <div className="container mx-auto text-center">
            <div
              className={`flex items-center justify-center mb-6 ${visibleSections.has("global") ? "animate-global-appear" : "opacity-0"}`}
            >
              <Globe className="w-12 h-12 text-cyan-400 mr-4 animate-globe-spin" />
              <h2 className="text-4xl font-bold text-cyan-400">Global Since Day One</h2>
            </div>
            <p
              className={`text-xl text-gray-300 mb-8 ${visibleSections.has("global") ? "animate-fade-in-up" : "opacity-0"}`}
            >
              No borders. No restrictions. No bureaucracy.
            </p>
            <p
              className={`text-lg text-gray-300 mb-4 ${visibleSections.has("global") ? "animate-fade-in-up-delay" : "opacity-0"}`}
            >
              If you have a wallet — you have a store. You have a business. You have freedom.
            </p>
            <p
              className={`text-2xl font-bold text-white ${visibleSections.has("global") ? "animate-fade-in-up-delay-2" : "opacity-0"}`}
            >
              This is the future of commerce.
            </p>
          </div>
        </section>

        {/* The System Ends Here */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-green-900/10" data-animate id="system">
          <div className="container mx-auto text-center">
            <div
              className={`flex items-center justify-center mb-6 ${visibleSections.has("system") ? "animate-flame-appear" : "opacity-0"}`}
            >
              <Flame className="w-12 h-12 text-green-400 mr-4 animate-flame-flicker" />
              <h2 className="text-4xl md:text-5xl font-bold text-green-400">
                The System They've Always Taken From You — Ends Here.
              </h2>
            </div>
            <p
              className={`text-xl text-gray-300 mb-8 ${visibleSections.has("system") ? "animate-fade-in-up" : "opacity-0"}`}
            >
              You work. You sell. You create. And yet:
            </p>
            <div
              className={`max-w-3xl mx-auto text-left space-y-4 mb-12 ${visibleSections.has("system") ? "animate-list-appear" : "opacity-0"}`}
            >
              <div className="flex items-start animate-list-item">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                <p className="text-gray-300">
                  Platforms take absurd fees, control your business, freeze your money, and block your account.
                </p>
              </div>
              <div className="flex items-start animate-list-item" style={{ animationDelay: "0.2s" }}>
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                <p className="text-gray-300">
                  Banks charge you for everything, hold your money, and decide what you can do with it.
                </p>
              </div>
              <div className="flex items-start animate-list-item" style={{ animationDelay: "0.4s" }}>
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                <p className="text-gray-300">
                  Governments create borders, impose restrictions, and limit your freedom to trade.
                </p>
              </div>
              <div className="flex items-start animate-list-item" style={{ animationDelay: "0.6s" }}>
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                <p className="text-gray-300">
                  Payment processors take their cut, delay your money, and can shut you down anytime.
                </p>
              </div>
            </div>
            <p
              className={`text-2xl font-bold text-white mb-8 ${visibleSections.has("system") ? "animate-fade-in-up-delay" : "opacity-0"}`}
            >
              Enough. The future is decentralized. The future is Lyvora.
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection("waitlist")}
              className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 text-lg animate-pulse-glow hover:scale-105 transition-all duration-300 ${visibleSections.has("system") ? "animate-button-emerge" : "opacity-0"}`}
            >
              Break Free Now
              <ArrowRight className="ml-2 h-5 w-5 animate-arrow-move" />
            </Button>
          </div>
        </section>

        {/* Enhanced Roadmap Section */}
        <section
          id="roadmap"
          className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-900/10 relative overflow-hidden"
          data-animate
        >
          <div className="container mx-auto">
            <h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${visibleSections.has("roadmap") ? "animate-title-reveal" : "opacity-0"}`}
            >
              Roadmap
            </h2>

            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Enhanced Timeline line with animation */}
                <div
                  className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 ${visibleSections.has("roadmap") ? "animate-timeline-draw" : "opacity-0"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 animate-timeline-glow"></div>
                </div>

                {/* Floating particles along timeline */}
                <div
                  className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full ${visibleSections.has("roadmap") ? "animate-particles-float" : "opacity-0"}`}
                >
                  <div className="absolute top-1/4 w-2 h-2 bg-purple-400 rounded-full animate-particle-1"></div>
                  <div className="absolute top-1/2 w-1 h-1 bg-pink-400 rounded-full animate-particle-2"></div>
                  <div className="absolute top-3/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-particle-3"></div>
                </div>

                {/* Timeline items with enhanced animations */}
                <div className="space-y-32">
                  <RoadmapItem
                    phase="Phase 1: Q3 2024"
                    title="Platform Launch"
                    items={[
                      "Beta marketplace release",
                      "Initial smart contract deployment",
                      "Basic escrow functionality",
                      "Waitlist onboarding",
                    ]}
                    position="left"
                    delay="0s"
                    isVisible={visibleSections.has("roadmap")}
                  />

                  <RoadmapItem
                    phase="Phase 2: Q4 2024"
                    title="DAO Launch"
                    items={[
                      "Decentralized governance implementation",
                      "Community voting system",
                      "Enhanced dispute resolution",
                      "Multi-chain support",
                    ]}
                    position="right"
                    delay="0.3s"
                    isVisible={visibleSections.has("roadmap")}
                  />

                  <RoadmapItem
                    phase="Phase 3: Q1 2025"
                    title="Token Launch"
                    items={[
                      "LYVR token for staking and governance",
                      "Cashback and rewards program",
                      "Liquidity mining incentives",
                      "DAO treasury establishment",
                    ]}
                    position="left"
                    delay="0.6s"
                    isVisible={visibleSections.has("roadmap")}
                  />

                  <RoadmapItem
                    phase="Phase 4: Q2 2025"
                    title="Advanced Features"
                    items={[
                      "NFT-based reputation system",
                      "Built-in DEX for crypto swapping",
                      "Mobile app release",
                      "Cross-chain interoperability",
                    ]}
                    position="right"
                    delay="0.9s"
                    isVisible={visibleSections.has("roadmap")}
                  />
                </div>
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
                <SelectContent className="bg-gray-900 border-purple-500/30">
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
                <SelectContent className="bg-gray-900 border-purple-500/30">
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="text"
                placeholder="If 'Other', write your country"
                value={country === "other" ? expectations : ""}
                onChange={(e) => setExpectations(e.target.value)}
                className="bg-gray-900/50 border-purple-500/30 text-white placeholder:text-gray-400 hover:border-purple-400/50 transition-all duration-300"
              />

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
        <footer className="py-12 px-4 border-t border-purple-500/20" data-animate id="footer">
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
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110">
                  Telegram
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110">
                  GitHub
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

// Enhanced FAQ Item Component
function FAQItem({ question, answer, delay }: { question: string; answer: string; delay: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className="bg-gray-900/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 animate-card-hover"
        style={{ animationDelay: delay }}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-purple-500/5 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">{question}</CardTitle>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-purple-400 animate-rotate-180" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-400 animate-rotate-0" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <p className="text-gray-300 leading-relaxed animate-fade-in">{answer}</p>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

// Enhanced Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  color,
  delay,
}: {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: string
  delay: string
}) {
  const getColorClasses = () => {
    switch (color) {
      case "red":
        return "from-red-500 to-red-600 border-red-500/30"
      case "green":
        return "from-green-500 to-green-600 border-green-500/30"
      case "blue":
        return "from-blue-500 to-blue-600 border-blue-500/30"
      case "yellow":
        return "from-yellow-500 to-yellow-600 border-yellow-500/30"
      case "purple":
        return "from-purple-500 to-purple-600 border-purple-500/30"
      case "pink":
        return "from-pink-500 to-pink-600 border-pink-500/30"
      default:
        return "from-purple-500 to-purple-600 border-purple-500/30"
    }
  }

  return (
    <Card
      className={`bg-gray-900/50 border backdrop-blur-sm h-full hover:scale-105 transition-all duration-300 animate-feature-card ${getColorClasses().split(" ")[1]}`}
      style={{ animationDelay: delay }}
    >
      <CardHeader>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getColorClasses().split(" ")[0]} mr-3 animate-icon-glow`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-white text-lg">{title}</CardTitle>
        </div>
        <p className="text-gray-300">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start animate-feature-item"
              style={{ animationDelay: `${Number.parseFloat(delay) + index * 0.1}s` }}
            >
              <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0 animate-check-mark" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// Enhanced Work Card Component
function WorkCard({
  icon: Icon,
  title,
  description,
  highlight,
  color,
  delay,
}: {
  icon: LucideIcon
  title: string
  description: string
  highlight: string
  color: string
  delay: string
}) {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-purple-600 border-purple-500/30"
      case "yellow":
        return "from-yellow-500 to-yellow-600 border-yellow-500/30"
      case "blue":
        return "from-blue-500 to-blue-600 border-blue-500/30"
      case "red":
        return "from-red-500 to-red-600 border-red-500/30"
      case "green":
        return "from-green-500 to-green-600 border-green-500/30"
      case "pink":
        return "from-pink-500 to-pink-600 border-pink-500/30"
      default:
        return "from-purple-500 to-purple-600 border-purple-500/30"
    }
  }

  return (
    <Card
      className={`bg-gray-900/50 border backdrop-blur-sm h-full hover:scale-105 transition-all duration-300 animate-work-card ${getColorClasses().split(" ")[1]}`}
      style={{ animationDelay: delay }}
    >
      <CardHeader>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getColorClasses().split(" ")[0]} mr-3 animate-icon-pulse`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-white text-lg leading-tight">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
        <p className="text-white font-semibold italic animate-highlight-glow">{highlight}</p>
      </CardContent>
    </Card>
  )
}

// Enhanced Roadmap Item Component
function RoadmapItem({
  phase,
  title,
  items,
  position,
  delay,
  isVisible,
}: {
  phase: string
  title: string
  items: string[]
  position: "left" | "right"
  delay: string
  isVisible: boolean
}) {
  return (
    <div className="relative">
      {/* Enhanced Timeline dot with pulsing animation */}
      <div
        className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-black z-10 ${isVisible ? "animate-roadmap-dot" : "opacity-0"}`}
        style={{ animationDelay: delay }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75"></div>
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
      </div>

      {/* Content with enhanced animations */}
      <div
        className={`md:w-1/2 ${position === "right" ? "md:ml-auto pl-8 md:pl-12" : "pr-8 md:pr-12"} ${isVisible ? "animate-roadmap-card" : "opacity-0"}`}
        style={{ animationDelay: delay }}
      >
        <Card className="bg-gray-900/50 border-purple-500/30 backdrop-blur-sm overflow-hidden hover:border-purple-400/50 transition-all duration-500 hover:scale-105 animate-roadmap-hover">
          <CardHeader>
            <Badge
              className={`mb-2 bg-purple-500/20 text-purple-300 border-purple-500/50 w-fit animate-badge-glow`}
              style={{ animationDelay: `${Number.parseFloat(delay) + 0.2}s` }}
            >
              {phase}
            </Badge>
            <CardTitle
              className="text-white text-xl animate-title-glow"
              style={{ animationDelay: `${Number.parseFloat(delay) + 0.3}s` }}
            >
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start animate-roadmap-item"
                  style={{ animationDelay: `${Number.parseFloat(delay) + 0.4 + index * 0.1}s` }}
                >
                  <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0 animate-check-bounce" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
