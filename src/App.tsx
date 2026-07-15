import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Shield,
  Palette,
  Layout,
  Server,
  Database,
  Cpu,
  Flame,
  GitBranch,
  Layers,
  Users,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Calendar,
  Briefcase,
  Send,
  Sparkles,
  Search,
  ArrowUp,
  Check,
  BookOpen,
  Printer
} from "lucide-react";
import {
  PERSONAL_INFO,
  SKILLS,
  PROJECTS,
  EXPERIENCES,
  Project
} from "./data/portfolioData";

// Icon mapping helper for Skills section
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Shield,
  Palette,
  Layout,
  Server,
  Database,
  Cpu,
  Flame,
  GitBranch,
  Layers,
  Users,
  CheckCircle2
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isReadingMode, setIsReadingMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isReadingMode") === "true";
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form states for contact form
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem("isReadingMode", isReadingMode.toString());
  }, [isReadingMode]);

  // Scroll logic: change header active section on scroll & handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Check current section
      const sections = ["home", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  // Filter projects by both category selection and search query
  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Handle fake email submission (displays custom success animation, then opens mailto window)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Build mailto link as fallback to initiate action
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formState.subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(
        `Hello Lysa,\n\n${formState.message}\n\nBest regards,\n${formState.name} (${formState.email})`
      )}`;
      
      // Safely redirect to mailto after submission
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);
      
      // Reset form after a while
      setTimeout(() => {
        setFormState({ name: "", email: "", subject: "", message: "" });
        setFormSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className={isReadingMode
      ? "min-h-screen bg-gradient-to-tr from-sky-50 via-white to-sky-100/40 text-slate-900 font-sans selection:bg-sky-200 selection:text-sky-950 transition-colors duration-500"
      : "min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans selection:bg-[#818CF8]/30 selection:text-white transition-colors duration-500"
    }>
      {isReadingMode && (
        <div className="bg-sky-500 text-white px-6 py-2.5 text-center text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-3 shadow-md border-b border-sky-600 z-[60] relative transition-all">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>
              <strong>Pastel Reading Mode:</strong> Clean, minimalist, and ultra-readable layout (Sky Blue & White).
            </span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs px-3 py-1 rounded-lg border border-white/20 transition-all flex items-center gap-1.5"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setIsReadingMode(false)}
              className="bg-white text-sky-700 hover:bg-sky-50 active:bg-sky-100 text-xs px-3 py-1 rounded-lg font-bold transition-all shadow-sm"
            >
              Immersive Mode
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Background Noise/Mesh Effect */}
      {!isReadingMode && (
        <>
          <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#818CF8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#818CF8]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      {/* STICKY HEADER / NAVIGATION */}
      <header id="navbar-header" className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isReadingMode 
          ? "bg-white/95 border-b border-sky-100/80 shadow-sm" 
          : "bg-[#0A0A0A]/80 border-b border-white/5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="nav-logo"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg tracking-wider transition-all ${
              isReadingMode 
                ? "bg-sky-500 shadow-sm" 
                : "bg-gradient-to-br from-[#818CF8] to-[#6366F1] shadow-[0_0_15px_rgba(129,140,248,0.3)] group-hover:scale-105"
            }`}>
              KL
            </div>
            <div>
              <span className={`font-semibold block tracking-tight transition-colors ${
                isReadingMode ? "text-slate-900 group-hover:text-sky-600" : "text-white group-hover:text-[#818CF8]"
              }`}>
                {PERSONAL_INFO.name}
              </span>
              <span className={`text-xs font-mono tracking-wide block leading-none ${
                isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]"
              }`}>
                Professional Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all ${
            isReadingMode 
              ? "bg-sky-50/60 border-sky-100" 
              : "bg-[#1A1A1A]/50 border-white/5"
          }`} id="desktop-nav">
            {[
              { id: "home", label: "Home" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "experience", label: "Experience" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all relative ${
                  activeSection === link.id
                    ? isReadingMode
                      ? "text-sky-700"
                      : "text-[#818CF8]"
                    : isReadingMode
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-[#A0A0A0] hover:text-white"
                }`}
                id={`nav-link-${link.id}`}
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isReadingMode ? "bg-white shadow-[0_2px_10px_rgba(14,165,233,0.1)] border border-sky-100/40" : "bg-white/5"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Reading Mode Button */}
          <button
            onClick={() => setIsReadingMode(!isReadingMode)}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${
              isReadingMode
                ? "bg-sky-500 border-sky-600 text-white hover:bg-sky-600 shadow-[0_4px_12px_rgba(14,165,233,0.2)]"
                : "bg-[#1A1A1A] border-white/10 text-white hover:bg-[#242424] hover:border-white/20"
            }`}
            id="toggle-reading-mode"
            title="Switch to a clean, text-based format for quick reading by recruiters"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isReadingMode ? "Immersive Mode" : "Reading Mode"}</span>
            {isReadingMode && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isReadingMode
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A]"
            }`}
            id="mobile-menu-trigger"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t transition-all ${
                isReadingMode 
                  ? "border-slate-200 bg-white" 
                  : "border-white/5 bg-[#0A0A0A]"
              }`}
              id="mobile-nav-menu"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "skills", label: "Skills" },
                  { id: "projects", label: "Projects" },
                  { id: "experience", label: "Experience" },
                  { id: "contact", label: "Contact" }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium transition-all ${
                      activeSection === link.id
                        ? isReadingMode
                          ? "bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-500"
                          : "bg-white/5 text-[#818CF8]"
                        : isReadingMode
                        ? "text-slate-800 hover:bg-sky-50/50 hover:text-slate-900"
                        : "text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A]/30"
                    }`}
                    id={`mobile-nav-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                ))}
                
                {/* Mobile Reading Mode Toggle */}
                <div className="pt-4 border-t border-slate-200/50 mt-2">
                  <button
                    onClick={() => {
                      setIsReadingMode(!isReadingMode);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all ${
                      isReadingMode
                        ? "bg-sky-500 text-white border border-sky-600 shadow-sm"
                        : "bg-[#1A1A1A]/60 border border-white/5 text-white"
                    }`}
                    id="mobile-toggle-reading-mode"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-5 h-5" />
                      <span>{isReadingMode ? "Immersive Mode (Visual)" : "Clean Reading Mode"}</span>
                    </div>
                    {isReadingMode ? (
                      <span className="text-xs bg-white text-sky-700 px-2.5 py-1 rounded-full font-semibold font-mono">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs bg-white/10 text-[#A0A0A0] px-2.5 py-1 rounded-full font-mono">
                        Clean
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-6 relative">
        {/* 1. HERO SECTION (HOME) */}
        <section
          id="home"
          className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-16 md:py-24"
        >
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left side text */}
            <div className="md:col-span-7 flex flex-col justify-center" id="hero-content">
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full font-mono mb-6 w-fit transition-colors ${
                  isReadingMode
                    ? "bg-sky-50 border border-sky-200 text-sky-700 shadow-sm"
                    : "bg-[#818CF8]/10 border border-[#818CF8]/20 text-[#818CF8]"
                }`}
                id="hero-availability"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isReadingMode
                    ? "bg-sky-500 animate-pulse"
                    : "bg-[#818CF8] animate-pulse shadow-[0_0_8px_#818CF8]"
                }`} />
                {PERSONAL_INFO.availability}
              </motion.div>

              {/* Title & Role */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 transition-colors ${
                  isReadingMode ? "text-slate-900" : "text-white"
                }`}
                id="hero-title"
              >
                Hi, I am <span className={
                  isReadingMode
                    ? "text-sky-600 font-extrabold drop-shadow-sm"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#6366F1]"
                }>{PERSONAL_INFO.name}</span>
                <span className={`block text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3 font-sans transition-colors ${
                  isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
                }`}>
                  {PERSONAL_INFO.title}
                </span>
              </motion.h1>

              {/* Subtitle / Bio */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-lg font-sans leading-relaxed max-w-xl mb-10 transition-colors ${
                  isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
                }`}
                id="hero-bio"
              >
                {PERSONAL_INFO.bio}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
                id="hero-ctas"
              >
                <button
                  onClick={() => scrollToSection("skills")}
                  className={`px-6 py-3.5 rounded-xl font-bold text-base transition-all flex items-center gap-2.5 group hover:scale-[1.02] ${
                    isReadingMode
                      ? "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_4px_14px_rgba(14,165,233,0.3)]"
                      : "bg-[#818CF8] text-[#0A0A0A] hover:bg-[#6366F1] shadow-[0_0_15px_rgba(129,140,248,0.3)]"
                  }`}
                  id="hero-cta-primary"
                >
                  Discover my profile
                  <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                    isReadingMode ? "text-white" : "text-[#0A0A0A]"
                  }`} />
                </button>
              </motion.div>
            </div>

            {/* Right side modern illustration element */}
            <div className="md:col-span-5 flex justify-center items-center" id="hero-graphic">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
              >
                {/* Visual element frame */}
                {!isReadingMode && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#818CF8] to-[#6366F1] opacity-10 blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
                )}
                <div className={`absolute inset-4 rounded-[40px] flex flex-col justify-between p-8 overflow-hidden transition-all duration-500 ${
                  isReadingMode
                    ? "bg-white border border-sky-100 shadow-[0_8px_30px_rgb(14,165,233,0.06)]"
                    : "bg-[#1A1A1A] border border-white/5 shadow-2xl"
                }`}>
                  {/* Mock editor aesthetic / custom profile mockup */}
                  <div className={`flex items-center justify-between border-b pb-4 ${
                    isReadingMode ? "border-sky-50" : "border-white/5"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className={`text-xs font-mono ${
                      isReadingMode ? "text-sky-600/60" : "text-[#A0A0A0]/40"
                    }`}>portfolio.ts</span>
                  </div>

                  <div className="py-6 flex-grow flex flex-col justify-center">
                    <pre className={`text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto ${
                      isReadingMode ? "text-slate-900" : "text-[#818CF8]"
                    }`}>
                      <code>
                        <span className={isReadingMode ? "text-purple-600" : "text-purple-400"}>const</span> developer = &#123;{"\n"}
                        {"  "}name: <span className={isReadingMode ? "text-emerald-700" : "text-emerald-400"}>'{PERSONAL_INFO.name.split(" ")[0]}'</span>,{"\n"}
                        {"  "}role: <span className={isReadingMode ? "text-emerald-700" : "text-emerald-400"}>'Front-End'</span>,{"\n"}
                        {"  "}skills: [
                        <span className={isReadingMode ? "text-sky-700 font-semibold" : "text-[#A0A0A0]"}>
                          'HTML', 'CSS', 'React'
                        </span>
                        ],{"\n"}
                        {"  "}internship: <span className={isReadingMode ? "text-sky-600 font-bold" : "text-[#818CF8]"}>'Sorepco SA'</span>,{"\n"}
                        {"  "}status: <span className={isReadingMode ? "text-sky-600 font-bold" : "text-[#818CF8]"}>'Active'</span>{"\n"}
                        &#125;;
                      </code>
                    </pre>
                  </div>

                  <div className={`border-t pt-4 flex items-center justify-between text-xs transition-colors ${
                    isReadingMode ? "border-sky-50 text-slate-800" : "border-white/5 text-[#A0A0A0]"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-4 h-4 ${
                        isReadingMode ? "text-sky-500" : "text-[#818CF8] animate-bounce"
                      }`} />
                      <span className="font-medium">Internship @ Sorepco SA</span>
                    </div>
                    <span className="font-mono">UTF-8</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. SKILLS SECTION (SKILLS) */}
        <section
          id="skills"
          className={`py-20 border-t transition-all ${
            isReadingMode ? "border-sky-100" : "border-white/5"
          }`}
        >
          <div className="mb-12" id="competences-heading">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
              isReadingMode ? "text-sky-600" : "text-[#818CF8]"
            }`}>Skills</span>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mt-2 transition-colors ${
              isReadingMode ? "text-slate-900" : "text-white"
            }`}>
              My Mastered Technologies
            </h2>
            <p className={`mt-3 max-w-2xl transition-colors ${
              isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
            }`}>
              A clean and tailored structure of my essential web technologies and academic tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" id="skills-grid">
            {/* Categorized blocks: Frontend, Backend, Tools & Methods */}
            {(["Frontend", "Backend", "Tools & Methods"] as const).map((category) => {
              const categorySkills = SKILLS.filter((s) => s.category === category);
              return (
                <div
                  key={category}
                  className={`rounded-3xl p-6 transition-all shadow-md ${
                    isReadingMode
                      ? "bg-white border border-sky-100/80 shadow-[0_4px_20px_-4px_rgba(14,165,233,0.06)]"
                      : "bg-[#1A1A1A] border border-white/5 hover:border-[#818CF8]/20"
                  }`}
                  id={`skills-col-${category.toLowerCase().replace(/[^a-z]/g, "")}`}
                >
                  <h3 className={`text-xl font-semibold mb-6 pb-3 border-b flex items-center gap-2.5 transition-colors ${
                    isReadingMode 
                      ? "text-slate-900 border-sky-50" 
                      : "text-white border-white/5"
                  }`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isReadingMode
                        ? "bg-sky-500"
                        : "bg-[#818CF8] shadow-[0_0_8px_#818CF8]"
                    }`} />
                    {category}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {categorySkills.map((skill, index) => {
                      const IconComponent = IconMap[skill.iconName] || Code2;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-4 p-3 rounded-2xl transition-all group border ${
                            isReadingMode
                              ? "bg-white border-sky-50 hover:bg-sky-50/50 hover:border-sky-100"
                              : "bg-[#242424]/40 border-white/5 hover:bg-[#242424]/80 hover:border-white/10"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl transition-all ${
                            isReadingMode
                              ? "bg-sky-50 text-sky-600 border border-sky-100 group-hover:bg-sky-100"
                              : "bg-[#242424] text-[#818CF8] group-hover:scale-110"
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={`text-sm font-semibold transition-colors ${
                              isReadingMode ? "text-slate-900" : "text-[#E0E0E0] group-hover:text-white"
                            }`}>
                              {skill.name}
                            </p>
                            <span className={`text-xs font-mono font-medium ${
                              isReadingMode ? "text-sky-600" : "text-[#A0A0A0]/50"
                            }`}>{skill.level}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. PROJECTS SECTION (PROJECTS - THE DYNAMIC GRID) */}
        <section
          id="projects"
          className={`py-20 border-t transition-all ${
            isReadingMode ? "border-sky-100" : "border-white/5"
          }`}
        >
          <div className="mb-12" id="projets-heading">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
              isReadingMode ? "text-sky-600" : "text-[#818CF8]"
            }`}>Projects</span>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mt-2 transition-colors ${
              isReadingMode ? "text-slate-900" : "text-white"
            }`}>
              My Practical Achievements
            </h2>
            <p className={`mt-3 max-w-2xl transition-colors ${
              isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
            }`}>
              Explore my recent work. Dynamically filter and search by category or technology keyword.
            </p>
          </div>

          {PROJECTS.length > 0 ? (
            <>
              {/* Interactive controls: Search & Filters */}
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 p-4 rounded-3xl border shadow-md transition-colors ${
                isReadingMode
                  ? "bg-white border-sky-100/80"
                  : "bg-[#1A1A1A]/80 border-white/5"
              }`} id="projects-controls">
                {/* Category tabs */}
                <div className="flex flex-wrap gap-2" id="projects-tabs">
                  {["All", "Frontend", "Backend", "Fullstack"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        selectedCategory === cat
                          ? isReadingMode
                            ? "bg-sky-500 text-white shadow-[0_2px_8px_rgba(14,165,233,0.25)]"
                            : "bg-[#818CF8] text-[#0A0A0A] shadow-[0_0_15px_rgba(129,140,248,0.25)]"
                          : isReadingMode
                          ? "bg-sky-50/50 text-slate-700 hover:text-slate-900 border border-sky-100"
                          : "bg-[#242424] text-[#A0A0A0] hover:text-white hover:bg-[#333]"
                      }`}
                      id={`filter-tab-${cat.toLowerCase()}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative max-w-xs w-full" id="projects-search-wrapper">
                  <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isReadingMode ? "text-sky-600/60" : "text-[#A0A0A0]"
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a technology, name..."
                    className={`w-full border pl-10 pr-4 py-2.5 rounded-2xl text-sm transition-all focus:outline-none ${
                      isReadingMode
                        ? "bg-white focus:bg-white border-sky-100 focus:border-sky-500 text-slate-900 placeholder-slate-400"
                        : "bg-[#242424] hover:bg-[#333] focus:bg-[#0A0A0A] border-white/5 focus:border-[#818CF8]/80 text-[#E0E0E0] placeholder-[#A0A0A0]/50"
                    }`}
                    id="projects-search-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded transition-all ${
                        isReadingMode
                          ? "text-sky-600 bg-sky-50 hover:bg-sky-100"
                          : "text-[#A0A0A0] hover:text-white bg-[#242424] hover:bg-[#333]"
                      }`}
                      id="projects-search-clear"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Projects grid mapped dynamically from projects array */}
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                id="projects-grid"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project: Project) => (
                    <motion.article
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={project.id}
                      className={`flex flex-col h-full rounded-3xl border transition-all duration-300 overflow-hidden ${
                        isReadingMode
                          ? "bg-white border-sky-100/80 shadow-[0_4px_20px_-4px_rgba(14,165,233,0.06)]"
                          : "border border-white/5 bg-[#1A1A1A] hover:border-[#818CF8]/30 hover:shadow-[0_0_20px_rgba(129,140,248,0.05)] hover:translate-y-[-4px]"
                      }`}
                      id={`project-card-${project.id}`}
                    >
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Top level row */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-xs font-mono px-2.5 py-1 rounded-md border uppercase tracking-wide ${
                              isReadingMode
                                ? "bg-sky-50/50 border-sky-100 text-sky-700"
                                : "bg-[#242424] border border-white/5 text-[#A0A0A0]"
                            }`}>
                              {project.category}
                            </span>
                            {/* Dynamic category colored dot */}
                            <span className={`w-2 h-2 rounded-full ${
                              isReadingMode
                                ? "bg-sky-500"
                                : `shadow-[0_0_8px_currentColor] ${
                                    project.category === "Fullstack"
                                      ? "bg-[#818CF8] text-[#818CF8]"
                                      : project.category === "Frontend"
                                      ? "bg-[#6366F1] text-[#6366F1]"
                                      : "bg-amber-400 text-amber-400"
                                  }`
                            }`} />
                          </div>

                          {/* Project Title */}
                          <h3 className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                            isReadingMode ? "text-slate-900 hover:text-sky-600" : "text-white hover:text-[#818CF8]"
                          }`}>
                            {project.title}
                          </h3>

                          {/* Project Description */}
                          <p className={`text-sm leading-relaxed mb-6 font-sans ${
                            isReadingMode ? "text-slate-800 font-medium" : "text-[#A0A0A0]"
                          }`}>
                            {project.description}
                          </p>
                        </div>

                        {/* Bottom half: Tech stack and external links */}
                        <div>
                          {/* Technologies badges */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                                  isReadingMode
                                    ? "bg-sky-50/30 text-sky-700 border-sky-100/50"
                                    : "bg-[#242424] text-[#E0E0E0] border border-white/5"
                                  }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action buttons */}
                          <div className={`flex items-center gap-3 border-t pt-4 ${
                            isReadingMode ? "border-sky-50" : "border-white/5"
                          }`}>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-grow flex items-center justify-center gap-2 border py-2 rounded-xl text-xs font-medium transition-all ${
                                isReadingMode
                                  ? "bg-white hover:bg-sky-50/30 text-slate-700 border-sky-100"
                                  : "bg-[#242424] hover:bg-[#333] text-[#E0E0E0] hover:text-white border border-white/5"
                              }`}
                              id={`project-github-link-${project.id}`}
                            >
                              <Github className="w-4 h-4" />
                              Source Code
                            </a>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-grow flex items-center justify-center gap-2 font-bold py-2 rounded-xl text-xs transition-all ${
                                  isReadingMode
                                    ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                                    : "bg-[#818CF8] hover:bg-[#6366F1] text-[#0A0A0A] shadow-[0_0_10px_rgba(129,140,248,0.15)]"
                                }`}
                                id={`project-live-link-${project.id}`}
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty state when query has no results */}
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 border rounded-3xl ${
                    isReadingMode
                      ? "bg-white border-sky-100"
                      : "bg-[#1A1A1A]/30 border-white/5"
                  }`}
                  id="projects-empty-state"
                >
                  <p className={`text-lg mb-2 ${isReadingMode ? "text-slate-900 font-bold" : "text-[#A0A0A0]"}`}>No projects found</p>
                  <p className={isReadingMode ? "text-slate-800 text-sm" : "text-[#A0A0A0]/60 text-sm"}>Try another keyword or filter by category.</p>
                  <button
                    onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                    className={`mt-4 px-4 py-2 font-bold rounded-xl text-xs transition-all ${
                      isReadingMode
                        ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                        : "bg-[#818CF8] hover:bg-[#6366F1] text-[#0A0A0A]"
                    }`}
                  >
                    Reset search
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-center py-16 px-6 rounded-[32px] max-w-2xl mx-auto relative overflow-hidden transition-all ${
                isReadingMode
                  ? "bg-white border border-sky-100 shadow-[0_4px_20px_-4px_rgba(14,165,233,0.06)]"
                  : "bg-[#1A1A1A]/40 border border-white/5 shadow-2xl"
              }`}
              id="projects-empty-state"
            >
              {/* Decorative radial gradient glow */}
              {!isReadingMode && (
                <>
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#818CF8]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#6366F1]/10 rounded-full blur-2xl pointer-events-none" />
                </>
              )}
              
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-colors ${
                isReadingMode
                  ? "bg-sky-50 text-sky-600 border border-sky-100"
                  : "bg-[#818CF8]/10 text-[#818CF8] shadow-[0_0_15px_rgba(129,140,248,0.1)]"
              }`}>
                <Code2 className={`w-8 h-8 ${isReadingMode ? "" : "animate-pulse"}`} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isReadingMode ? "text-slate-900" : "text-white"}`}>
                Projects in Preparation
              </h3>
              <p className={`text-sm leading-relaxed max-w-md mx-auto mb-4 ${isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"}`}>
                Currently undergoing Software Engineering training and interning at <strong>Sorepco SA</strong>, I am actively designing future applications that will be added very soon.
              </p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
                isReadingMode
                  ? "bg-sky-50 border-sky-200 text-sky-700"
                  : "bg-[#818CF8]/10 border border-[#818CF8]/20 text-[#818CF8]"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isReadingMode
                    ? "bg-sky-500 animate-pulse"
                    : "bg-[#818CF8] animate-ping"
                }`} />
                Development in progress
              </span>
            </motion.div>
          )}
        </section>

        {/* 4. EXPERIENCE SECTION (EXPERIENCE - CHRONOLOGY TIMELINE) */}
        <section
          id="experience"
          className={`py-20 border-t transition-all ${
            isReadingMode ? "border-sky-100" : "border-white/5"
          }`}
        >
          <div className="mb-12" id="experience-heading">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
              isReadingMode ? "text-sky-600" : "text-[#818CF8]"
            }`}>Experience</span>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mt-2 transition-colors ${
              isReadingMode ? "text-slate-900" : "text-white"
            }`}>
              My Journey & Education
            </h2>
            <p className={`mt-3 max-w-2xl transition-colors ${
              isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
            }`}>
              A detailed timeline illustrating my learning path, project experiences, and commitment.
            </p>
          </div>

          {/* Vertical Timeline container */}
          <div className="relative max-w-3xl mx-auto pl-6 md:pl-0" id="timeline-container">
            {/* Center spine on desktop, left spine on mobile */}
            <div className={`absolute top-0 bottom-0 left-3.5 md:left-1/2 w-[2px] ${
              isReadingMode
                ? "bg-sky-100"
                : "bg-gradient-to-b from-[#818CF8]/80 via-[#6366F1]/40 to-transparent"
            }`} />

            <div className="flex flex-col gap-12">
              {EXPERIENCES.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col md:flex-row ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                    id={`timeline-item-${exp.id}`}
                  >
                    {/* Spine circle bullet */}
                    <div className={`absolute left-[-24.5px] md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 z-10 flex items-center justify-center transition-all ${
                      isReadingMode
                        ? "border-white bg-sky-500 shadow-sm"
                        : "border-[#0A0A0A] bg-[#818CF8] shadow-[0_0_8px_#818CF8]"
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Timeline card wrapper */}
                    <div className="w-full md:w-1/2 md:px-8">
                      <div className={`rounded-3xl p-6 transition-all shadow-md border ${
                        isReadingMode
                          ? "bg-white border-sky-100/80 shadow-[0_4px_20px_-4px_rgba(14,165,233,0.06)]"
                          : "bg-[#1A1A1A] border-white/5 hover:border-[#818CF8]/20"
                      }`}>
                        {/* Period & Metadata */}
                        <div className={`flex items-center gap-2 text-xs font-mono mb-3 ${
                          isReadingMode ? "text-sky-600 font-semibold" : "text-[#818CF8]"
                        }`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>

                        {/* Title and Organization */}
                        <h3 className={`text-lg font-bold tracking-tight mb-1 transition-colors ${
                          isReadingMode ? "text-slate-900" : "text-white"
                        }`}>
                          {exp.title}
                        </h3>
                        <div className={`flex items-center gap-2 text-xs font-semibold mb-4 ${
                          isReadingMode ? "text-sky-600/80" : "text-[#A0A0A0]"
                        }`}>
                          <Briefcase className={`w-3.5 h-3.5 ${isReadingMode ? "text-sky-500" : "text-[#A0A0A0]/60"}`} />
                          <span>{exp.company}</span>
                        </div>

                        {/* Short Description */}
                        <p className={`text-sm leading-relaxed font-sans mb-4 transition-colors ${
                          isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
                        }`}>
                          {exp.description}
                        </p>

                        {/* Tag Badges */}
                        <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${
                          isReadingMode ? "border-sky-50" : "border-white/5"
                        }`}>
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs font-mono px-2 py-0.5 rounded border ${
                                isReadingMode
                                  ? "bg-sky-50/50 border-sky-100/50 text-sky-700"
                                  : "bg-[#242424] border-white/5 text-[#A0A0A0]"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Desktop spacer to align other half cleanly */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`py-20 border-t transition-all ${
            isReadingMode ? "border-sky-100" : "border-white/5"
          }`}
        >
          <div className="mb-12" id="contact-heading">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
              isReadingMode ? "text-sky-600" : "text-[#818CF8]"
            }`}>Contact</span>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mt-2 transition-colors ${
              isReadingMode ? "text-slate-900" : "text-white"
            }`}>
              Let's Discuss Your Project
            </h2>
            <p className={`mt-3 max-w-2xl transition-colors ${
              isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"
            }`}>
              Feel free to reach out to me for any internship, project opportunity, or collaboration. I will get back to you as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-start" id="contact-content">
            {/* Left Column: Social Links & Quick Actions */}
            <div className="md:col-span-5 flex flex-col gap-6" id="contact-info">
              <div className={`border rounded-3xl p-6 shadow-md transition-all ${
                isReadingMode
                  ? "bg-white border-sky-100 shadow-[0_4px_20px_-4px_rgba(14,165,233,0.06)]"
                  : "bg-[#1A1A1A] border-white/5"
              }`}>
                <h3 className={`text-lg font-bold mb-6 transition-colors ${
                  isReadingMode ? "text-slate-900" : "text-white"
                }`}>
                  My Contact Info
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isReadingMode ? "bg-sky-50 text-sky-600" : "bg-[#242424] text-[#818CF8]"
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-mono ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>Location</p>
                      <p className={`text-sm font-semibold ${isReadingMode ? "text-slate-900" : "text-white"}`}>{PERSONAL_INFO.location}</p>
                    </div>
                  </div>

                  {/* Mail */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isReadingMode ? "bg-sky-50 text-sky-600" : "bg-[#242424] text-[#818CF8]"
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-mono ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>Email Address</p>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className={`text-sm font-semibold transition-colors ${
                          isReadingMode ? "text-slate-900 hover:text-sky-600" : "text-white hover:text-[#818CF8]"
                        }`}
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social media connections button grid */}
                <div className={`mt-8 pt-6 border-t ${isReadingMode ? "border-sky-50" : "border-white/5"}`}>
                  <p className={`text-xs font-mono mb-4 uppercase tracking-widest ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>Follow Me</p>
                  <div className="flex gap-3">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all ${
                        isReadingMode
                          ? "bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-700 border-sky-100 shadow-sm"
                          : "bg-[#242424] hover:bg-[#818CF8] hover:text-[#0A0A0A] text-[#A0A0A0] border border-white/5 hover:border-[#818CF8]/50 hover:shadow-[0_0_10px_rgba(129,140,248,0.2)]"
                      }`}
                      id="contact-github-icon"
                      aria-label="GitHub profile"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all ${
                        isReadingMode
                          ? "bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-700 border-sky-100 shadow-sm"
                          : "bg-[#242424] hover:bg-[#818CF8] hover:text-[#0A0A0A] text-[#A0A0A0] border border-white/5 hover:border-[#818CF8]/50 hover:shadow-[0_0_10px_rgba(129,140,248,0.2)]"
                      }`}
                      id="contact-linkedin-icon"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className={`p-3 rounded-xl border transition-all ${
                        isReadingMode
                          ? "bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-700 border-sky-100 shadow-sm"
                          : "bg-[#242424] hover:bg-[#818CF8] hover:text-[#0A0A0A] text-[#A0A0A0] border border-white/5 hover:border-[#818CF8]/50 hover:shadow-[0_0_10px_rgba(129,140,248,0.2)]"
                      }`}
                      id="contact-email-icon"
                      aria-label="Direct Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Status Banner */}
              <div className={`border p-5 rounded-3xl flex items-center gap-3 shadow-sm transition-all ${
                isReadingMode
                  ? "bg-white border-sky-100 text-slate-800"
                  : "bg-[#1A1A1A] border border-white/5"
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${isReadingMode ? "bg-sky-500 animate-pulse" : "bg-[#818CF8] animate-pulse shadow-[0_0_8px_#818CF8]"}`} />
                <span className={`text-xs font-mono leading-tight ${isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"}`}>
                  Average response time: <strong className={isReadingMode ? "text-sky-600 font-bold" : ""}>Less than 24h</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Modern Contact Form */}
            <div className="md:col-span-7" id="contact-form-wrapper">
              <div className={`border rounded-3xl p-6 sm:p-8 shadow-md transition-all ${
                isReadingMode
                  ? "bg-white border-sky-100 shadow-[0_4px_20px_-4px_rgba(14,165,233,0.06)]"
                  : "bg-[#1A1A1A] border-white/5"
              }`}>
                <h3 className={`text-lg font-bold mb-6 transition-colors ${
                  isReadingMode ? "text-slate-900" : "text-white"
                }`}>
                  Send a Direct Message
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-form">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="form-name" className={`block text-xs font-mono mb-1.5 ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className={`w-full border px-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all focus:ring-1 ${
                          isReadingMode
                            ? "bg-white hover:bg-slate-50 focus:bg-white border-sky-100 focus:border-sky-500 text-slate-900 placeholder-slate-400 focus:ring-sky-100"
                            : "bg-[#242424] border border-white/5 focus:border-[#818CF8] text-white focus:ring-[#818CF8]/20 focus:bg-[#1A1A1A]"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="form-email" className={`block text-xs font-mono mb-1.5 ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. john.doe@email.com"
                        className={`w-full border px-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all focus:ring-1 ${
                          isReadingMode
                            ? "bg-white hover:bg-slate-50 focus:bg-white border-sky-100 focus:border-sky-500 text-slate-900 placeholder-slate-400 focus:ring-sky-100"
                            : "bg-[#242424] border border-white/5 focus:border-[#818CF8] text-white focus:ring-[#818CF8]/20 focus:bg-[#1A1A1A]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="form-subject" className={`block text-xs font-mono mb-1.5 ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Internship or project opportunity..."
                      className={`w-full border px-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all focus:ring-1 ${
                        isReadingMode
                          ? "bg-white hover:bg-slate-50 focus:bg-white border-sky-100 focus:border-sky-500 text-slate-900 placeholder-slate-400 focus:ring-sky-100"
                          : "bg-[#242424] border border-white/5 focus:border-[#818CF8] text-white focus:ring-[#818CF8]/20 focus:bg-[#1A1A1A]"
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="form-message" className={`block text-xs font-mono mb-1.5 ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/60"}`}>
                      Message *
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me more about your request..."
                      className={`w-full border px-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all focus:ring-1 resize-none ${
                        isReadingMode
                          ? "bg-white hover:bg-slate-50 focus:bg-white border-sky-100 focus:border-sky-500 text-slate-900 placeholder-slate-400 focus:ring-sky-100"
                          : "bg-[#242424] border border-white/5 focus:border-[#818CF8] text-white focus:ring-[#818CF8]/20 focus:bg-[#1A1A1A]"
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || formSubmitted}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        formSubmitted
                          ? "bg-emerald-600 text-white"
                          : isReadingMode
                          ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                          : "bg-[#818CF8] hover:bg-[#6366F1] text-[#0A0A0A] hover:shadow-lg hover:shadow-[#818CF8]/20"
                      } disabled:opacity-80`}
                      id="form-submit-button"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                          <span>Preparing message...</span>
                        </>
                      ) : formSubmitted ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Message Ready (Opening Mail client...)</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Open in Mail client</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`border-t transition-all py-12 mt-12 text-center ${
        isReadingMode ? "border-sky-100 bg-white" : "border-white/5 bg-[#1A1A1A]/20"
      }`} id="portfolio-footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className={`text-sm transition-colors ${isReadingMode ? "text-slate-800" : "text-[#A0A0A0]"}`}>
              &copy; {new Date().getFullYear()} - <strong>{PERSONAL_INFO.name}</strong>. All rights reserved.
            </p>
            <p className={`text-xs transition-colors mt-1 font-mono ${isReadingMode ? "text-sky-600/70" : "text-[#A0A0A0]/40"}`}>
              Semantically built with React, Tailwind CSS, and TypeScript.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-xs font-mono transition-colors flex items-center gap-1.5 ${
                isReadingMode ? "text-slate-800 hover:text-sky-600 font-semibold" : "text-[#A0A0A0] hover:text-[#818CF8]"
              }`}
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* FLOATING SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => scrollToSection("home")}
            className={`fixed bottom-6 right-6 p-3 rounded-full shadow-xl transition-all z-40 focus:outline-none ${
              isReadingMode
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "bg-[#818CF8] hover:bg-[#6366F1] text-[#0A0A0A] hover:shadow-[#818CF8]/30"
            }`}
            id="floating-scroll-top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
