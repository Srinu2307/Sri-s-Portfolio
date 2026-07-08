import stackImage from '../assets/about/New_About_Pic.png';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="pt-20 pb-40 px-6 md:px-12 w-full relative overflow-visible font-sans border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Left Side: ID Badge and Skills */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">

          <motion.div 
            initial={{ y: -300, opacity: 0 }}
            whileInView={{ y: [0, -40, 0, -15, 0], opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.28, 0.84, 0.42, 1], times: [0, 0.65, 0.8, 0.9, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex justify-center w-full"
          >
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>

            {/* Badge Card */}
            <motion.div 
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.4}
              whileDrag={{ scale: 1.05, rotate: 2, cursor: "grabbing" }}
              initial={{ rotate: -3 }}
              whileHover={{ rotate: 0 }}
              className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20 cursor-grab"
            >
              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/30 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 border-2 border-transparent">
                <img
                  src={stackImage}
                  alt="Profile"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Right Side: Info Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 text-white mt-8 md:mt-0 relative z-20"
        >

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Hello!</h2>
          <p className="text-lg font-bold mb-12 leading-relaxed max-w-3xl text-slate-300">
            Hi, my name is <span className="text-emerald-400 text-xl font-black mx-1 tracking-wide uppercase">Srinivasulu Kamarthi</span>, a dedicated SOC Analyst with hands-on experience in security monitoring, analyzing Windows Event Logs, and incident triage. I am proficient in leveraging Elastic SIEM to proactively identify and mitigate threats.
          </p>

          {/* Horizontal Skills Row (Transparent & Large) */}
          <div className="flex items-center gap-6 mt-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-slate-900/50 p-4 border border-slate-800 rounded-2xl flex flex-col items-center"
            >
              <svg className="w-12 h-12 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.05" />
                <path d="M12 8v4" strokeLinecap="round" />
                <path d="M12 16h.01" strokeLinecap="round" strokeWidth="2" />
              </svg>
              <p className="text-[10px] text-center font-mono mt-2 text-slate-400">SOC Ops</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
              viewport={{ once: true }}
              className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-slate-900/50 p-4 border border-slate-800 rounded-2xl flex flex-col items-center"
            >
              <svg className="w-12 h-12 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v4h4V7H6zm6 0v4h4V7h-4zm-6 6v4h4v-4H6zm6 0v4h4v-4h-4z" />
              </svg>
              <p className="text-[10px] text-center font-mono mt-2 text-slate-400">SIEM</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-slate-900/50 p-4 border border-slate-800 rounded-2xl flex flex-col items-center"
            >
              <svg className="w-12 h-12 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
                <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
              </svg>
              <p className="text-[10px] text-center font-mono mt-2 text-slate-400">Threat Detect</p>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Torn paper divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-slate-900">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative stars */}
      <div className="absolute top-10 right-10 md:right-20 text-emerald-500 opacity-15 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" /></svg>
      </div>
      <div className="absolute bottom-32 left-4 md:left-20 text-cyan-500 opacity-15 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" /></svg>
      </div>
    </section>
  );
};

export default About;
