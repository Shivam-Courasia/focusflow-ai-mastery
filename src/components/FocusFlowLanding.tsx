"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Timer,
  Shield,
  BarChart3,
  BookOpen,
  Play,
  Volume2,
  VolumeX,
  Bell,
  Star,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Clock,
} from "lucide-react"

export default function FocusFlowLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVolumeOn, setIsVolumeOn] = useState(true)
  const [timerCount, setTimerCount] = useState(25)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const testimonials = [
    {
      text: "Since using FocusFlow, I get twice as much done! The analytics helped me identify my peak focus hours.",
      author: "Sarah Chen",
      role: "Software Developer",
      company: "Google",
      avatar: "SC",
    },
    {
      text: "The distraction blocker is a game-changer. I can finally focus on deep work without interruptions.",
      author: "Marcus Johnson",
      role: "UX Designer",
      company: "Apple",
      avatar: "MJ",
    },
    {
      text: "FocusFlow transformed my writing process. I'm completing articles 3x faster with better quality.",
      author: "Emily Rodriguez",
      role: "Content Writer",
      company: "Medium",
      avatar: "ER",
    },
  ]

  const features = [
    {
      icon: Timer,
      title: "Smart Pomodoro Timer",
      description: "AI-powered timer that adapts to your productivity patterns with customizable focus cycles.",
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      stats: "25min cycles",
      delay: "0ms",
    },
    {
      icon: Shield,
      title: "Intelligent Blocker",
      description: "Advanced AI blocks distracting websites and apps based on your focus goals and habits.",
      gradient: "from-blue-500 via-cyan-500 to-teal-600",
      stats: "99.9% effective",
      delay: "200ms",
    },
    {
      icon: BookOpen,
      title: "Session Analytics",
      description: "Comprehensive tracking with AI insights to optimize your productivity and focus patterns.",
      gradient: "from-green-500 via-emerald-500 to-lime-600",
      stats: "Real-time data",
      delay: "400ms",
    },
    {
      icon: BarChart3,
      title: "Focus Intelligence",
      description: "Advanced analytics with predictive insights to maximize your productivity potential.",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      stats: "Smart insights",
      delay: "600ms",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "2.5M+", label: "Focus Sessions", icon: Target },
    { number: "89%", label: "Productivity Boost", icon: TrendingUp },
    { number: "4.9/5", label: "User Rating", icon: Star },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimerCount((prev) => {
        if (prev <= 1) return 25
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Dynamic Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Enhanced Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Timer className="w-6 h-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    FocusFlow
                  </span>
                  <div className="text-xs text-purple-300">AI-Powered</div>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {["Features", "Analytics", "Pricing"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-white/5"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  </a>
                ))}

                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-500/30">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  #1 AI-Powered Focus Tool
                </span>
                <Award className="w-4 h-4 text-yellow-400" />
              </div>

              <div className="space-y-8">
                <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-pulse">
                    Master Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent relative">
                    Focus
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse" />
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Unlock Success
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light">
                  Transform your productivity with our revolutionary AI companion.
                  <span className="text-purple-300 font-medium"> Block distractions</span>,
                  <span className="text-pink-300 font-medium"> track progress</span>, and
                  <span className="text-blue-300 font-medium"> unlock your potential</span> with scientifically-backed
                  techniques.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Start Focusing Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-500/50 bg-purple-500/10 backdrop-blur-sm hover:bg-purple-500/20 text-white px-10 py-6 text-xl rounded-2xl transition-all duration-500 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Enhanced Controls */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-green-500/30">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-green-400" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <span className="text-sm font-medium text-green-300">Smart Notifications</span>
                </div>

                <button
                  onClick={() => setIsVolumeOn(!isVolumeOn)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300 group"
                >
                  {isVolumeOn ? (
                    <Volume2 className="w-5 h-5 text-blue-400 group-hover:animate-pulse" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-blue-400" />
                  )}
                  <span className="text-sm font-medium text-blue-300">
                    {isVolumeOn ? "Ambient Sounds" : "Silent Mode"}
                  </span>
                </button>

                <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-purple-500/30">
                  <Clock className="w-5 h-5 text-purple-400 animate-spin" />
                  <span className="text-sm font-medium text-purple-300">AI Learning Mode</span>
                </div>
              </div>
            </div>

            {/* Enhanced Animated Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center animate-bounce delay-500 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>

                {/* Computer Screen */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse delay-200" />
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-400" />
                    <div className="flex-1 bg-gray-700 rounded-lg h-6 flex items-center px-3">
                      <span className="text-xs text-gray-400">focusflow.ai/dashboard</span>
                    </div>
                  </div>

                  {/* Blocked Sites Animation */}
                  <div className="space-y-3 mb-8">
                    <div className="flex space-x-3">
                      {["Social Media", "News Sites", "Gaming"].map((site, i) => (
                        <div
                          key={site}
                          className="bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-500/30 animate-pulse"
                          style={{ animationDelay: `${i * 300}ms` }}
                        >
                          {site} ✕
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Pomodoro Timer */}
                  <div className="text-center">
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      {/* Outer Ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full animate-spin-slow opacity-30" />

                      {/* Progress Ring */}
                      <svg className="absolute inset-2 w-36 h-36 transform -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="68"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-700"
                        />
                        <circle
                          cx="72"
                          cy="72"
                          r="68"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(timerCount / 25) * 427} 427`}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="50%" stopColor="#EC4899" />
                            <stop offset="100%" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Center Content */}
                      <div className="absolute inset-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center border border-gray-600">
                        <div className="text-center">
                          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {timerCount}
                          </div>
                          <div className="text-sm text-gray-400 font-medium">minutes</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-green-400 text-lg font-semibold flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        Deep Focus Session Active
                      </p>
                      <p className="text-gray-400 text-sm">Next break in {timerCount} minutes</p>
                    </div>
                  </div>
                </div>

                {/* Floating Success Indicators */}
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold animate-bounce shadow-lg">
                  +1 Session Complete
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-semibold animate-bounce delay-1000 shadow-lg">
                  5 Sites Blocked
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:animate-pulse">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-500/30 mb-8">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Powerful Features</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="text-white">To Stay Focused</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge AI technology meets intuitive design to create the ultimate productivity experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-700 hover:transform hover:scale-105 hover:rotate-1 relative overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-8 text-center space-y-6">
                  <div className="relative">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:animate-pulse shadow-2xl`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                      {feature.stats}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <Button
                    variant="ghost"
                    className="w-full text-purple-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] opacity-50" />

            <div className="relative text-center">
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-current animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>

              <blockquote className="text-3xl md:text-4xl font-bold text-white mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <p className="font-bold text-xl text-purple-300">{testimonials[currentTestimonial].author}</p>
                  <p className="text-gray-400">{testimonials[currentTestimonial].role}</p>
                  <p className="text-sm text-purple-400 font-medium">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                  }
                  className="p-3 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-3 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-purple-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 px-6 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Enhanced Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Timer className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    FocusFlow
                  </span>
                  <div className="text-xs text-purple-300">AI-Powered Focus</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Master your focus and unlock your potential with our revolutionary AI-powered productivity companion.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Github, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                  >
                    <Icon className="w-5 h-5 text-purple-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Enhanced Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Dashboard", "Analytics", "Integrations"],
              },
              {
                title: "Support",
                links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact", "Status"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Partners"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-white mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Enhanced Newsletter */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Stay in the Flow</h3>
              <p className="text-gray-300">
                Get productivity tips, feature updates, and exclusive insights delivered weekly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 rounded-xl"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 rounded-xl">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 FocusFlow. All rights reserved. Made with ❤️ for productivity enthusiasts.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-500">Trusted by 50,000+ users worldwide</span>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 300}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}
      </style>
    </div>
  )
}
