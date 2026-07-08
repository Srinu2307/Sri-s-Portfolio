import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ref for the navbar container to calculate mouse positions
  const navRef = useRef(null);

  // Motion values for the cursor reflection
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth interpolation for the reflection
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Update mouse coordinates relative to the navbar
  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const { left, top } = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Experience', 'Expertise', 'Skills', 'Projects', 'Certifications', 'Contact'];

  // Reflection radial gradient template
  const backgroundTemplate = useMotionTemplate`radial-gradient(250px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 md:px-6 pt-6 pointer-events-none">
      
      {/* Floating Pill Container */}
      <motion.nav 
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          // Smoothly move reflection away when cursor leaves
          mouseX.set(window.innerWidth / 2);
          mouseY.set(-100);
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover="hover"
        whileTap="tap"
        variants={{
          hover: { scale: 1.015, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
          tap: { scale: 0.98, transition: { duration: 0.1, ease: "easeOut" } }
        }}
        className={`relative w-full max-w-5xl rounded-full transition-all duration-700 pointer-events-auto ${
          isScrolled ? 'py-1.5 md:py-2' : 'py-2.5 md:py-3 mt-4'
        }`}
        style={{
          // Enhanced Liquid Glass Layer
          backgroundColor: 'rgba(8, 12, 22, 0.35)', // Slightly more transparent for depth
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          
          // Advanced Edge Lighting & Layered Ambient Shadow
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.2), 
            inset 0 -1px 2px rgba(0, 0, 0, 0.4), 
            inset 0 0 24px rgba(255, 255, 255, 0.04),
            0 24px 48px -12px rgba(0, 0, 0, 0.6),
            0 2px 6px rgba(0, 0, 0, 0.4)
          `,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)', // 3D bevel effect
          transform: 'translateZ(0)' // Force GPU acceleration
        }}
      >
        
        {/* Layer: Specular Highlight Reflection (Follows Cursor) */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none z-0 overflow-hidden"
          style={{ background: backgroundTemplate }}
        />

        {/* Layer: Micro-Noise Texture (Frost) */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay rounded-full pointer-events-none z-0"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="relative z-10 px-6 md:px-8 flex justify-between items-center w-full">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-xl md:text-2xl font-black tracking-tight text-white/90 drop-shadow-md whitespace-nowrap inline-block">
              Srinivasulu <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">.</span>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 font-semibold text-sm tracking-wide relative group transition-colors duration-300 text-slate-300 hover:text-white rounded-full overflow-hidden whitespace-nowrap inline-block"
              >
                <span className="relative z-10 drop-shadow-md">{link}</span>
                {/* Internal link hover glow */}
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="px-5 py-1.5 rounded-full text-sm font-black transition-all duration-300 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] whitespace-nowrap inline-block"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Glass Modal inside the pill) */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full mt-4 transition-all duration-500 ease-[0.23,1,0.32,1] rounded-3xl overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundColor: 'rgba(8, 12, 22, 0.42)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px -10px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-emerald-400 hover:bg-white/5 px-6 py-3 rounded-2xl font-bold text-base transition-all"
              >
                {link}
              </a>
            ))}
            <div className="pt-2 px-2 pb-2">
               <a 
                 href="#contact" 
                 onClick={() => setIsOpen(false)}                
                 className="inline-block px-6 py-3 rounded-full bg-emerald-500 text-slate-900 font-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 w-full text-center"
               >
                 Hire Me
               </a>
            </div>
          </div>
        </div>

      </motion.nav>
    </div>
  );
};

export default Navbar;