import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, LayoutGroup, useInView } from 'framer-motion';
import { Briefcase, MapPin, Infinity as InfinityIcon, CheckCircle2, Terminal } from 'lucide-react';

const experienceData = [
  {
    id: 1,
    title: 'SOC Analysis Training',
    organization: 'Savory Minds – Secure 2K25',
    date: '2024 – Present',
    location: 'Remote',
    description: 'Undergoing structured training in Security Operations Center (SOC) Analysis. Covering critical domains including log ingestion, alert triage, Offensive Security, Penetration Testing, and mastering MITRE ATT&CK techniques.',
    responsibilities: [
      'Ingesting and analyzing logs via Elastic SIEM.',
      'Performing alert triage and incident investigation.',
      'Simulating attacks for Offensive Security training.'
    ],
    tech: ['Elastic SIEM', 'MITRE ATT&CK', 'Pen Testing', 'Log Analysis'],
    achievements: ['Completed advanced threat hunting module']
  },
  {
    id: 2,
    title: 'Associate Cloud Engineer Intern',
    organization: 'Miracle Software Systems',
    date: 'Past Internship',
    location: 'on-site',
    description: 'Worked extensively with Google Cloud compute and storage services. Hands-on experience configuring IAM (Identity and Access Management) roles and securely managing cloud infrastructure resources.',
    responsibilities: [
      'Provisioned and managed GCP compute instances.',
      'Configured secure IAM roles and permissions.',
      'Optimized cloud storage buckets for secure access.'
    ],
    tech: ['Google Cloud', 'IAM', 'Cloud Compute', 'Storage'],
    achievements: ['Successfully secured 10+ cloud environments']
  },
  {
    id: 3,
    title: 'AI & Data Analytics Intern',
    organization: 'AICTE, EduNet Foundation',
    date: 'Past Internship',
    location: 'Remote',
    description: 'Performed large-scale data preprocessing and exploratory data analysis. Developed and implemented machine learning prediction models, enhancing foundational knowledge in AI workflows.',
    responsibilities: [
      'Cleaned and preprocessed large datasets.',
      'Built and evaluated machine learning models.',
      'Presented data insights via comprehensive dashboards.'
    ],
    tech: ['Python', 'Machine Learning', 'Data Analysis', 'AI'],
    achievements: ['Improved model prediction accuracy by 15%']
  },
  {
    id: 4,
    title: 'B.Tech – Computer Science (DS)',
    organization: 'Dr. K. V. Subba Reddy Institute of Technology',
    date: 'Graduated',
    location: 'Kurnool, India',
    description: 'Comprehensive engineering degree with a specialized focus on Data Science, providing a strong mathematical and programmatic foundation for advanced computing.',
    responsibilities: [
      'Completed core CS coursework (Data Structures, Algorithms).',
      'Specialized in Data Science and Big Data Analytics.',
      'Led the final year capstone project team.'
    ],
    tech: ['C++', 'Python', 'SQL', 'Algorithms'],
    achievements: ['Graduated with 77% Aggregate']
  },
  {
    id: 5,
    title: 'Intermediate (MPC) & SSC',
    organization: 'Sri K. V. R Memorial / Tagore Vidhyanikethan',
    date: 'Completed',
    location: 'Kurnool, India',
    description: 'Completed primary and higher secondary education with a rigorous focus on Mathematics, Physics, and Chemistry (MPC).',
    responsibilities: [
      'Focused on analytical problem solving.',
      'Maintained top-tier academic performance.'
    ],
    tech: ['Mathematics', 'Physics', 'Chemistry'],
    achievements: ['Inter: 65.6%', 'SSC: 95%']
  }
];

// ---------------------------------------------------------
// BACKGROUND COMPONENTS
// ---------------------------------------------------------

const FloatingParticle = ({ delay, duration, xOffset, size, leftPct }) => (
  <motion.div
    animate={{
      y: ['-10vh', '110vh'],
      x: [0, xOffset, 0]
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: 'linear',
      delay: delay
    }}
    className={`absolute rounded-full bg-cyan-500/20 blur-[2px] ${size}`}
    style={{ left: `${leftPct}%`, top: '-10%' }}
  />
);

const BackgroundEffects = () => (
  <div 
    className="absolute inset-0 z-0 pointer-events-none"
    style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
  >
    {/* Subtle Background Board */}
    <div className="absolute inset-0 bg-[#050816]/10" />

    {/* Vertical PCB Traces */}
    <div className="absolute top-0 bottom-0 left-1/4 w-px bg-cyan-900/40" />
    <div className="absolute top-0 bottom-0 right-1/4 w-px bg-cyan-900/40" />
    <div className="absolute top-0 bottom-0 left-[15%] w-[2px] bg-cyan-900/20" />
    <div className="absolute top-0 bottom-0 right-[15%] w-[2px] bg-cyan-900/20" />
    
    {/* Animated PCB Data Flow */}
    <motion.div
      animate={{ y: [0, 800], opacity: [0, 1, 0] }}
      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
      className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.8)]"
    />
    <motion.div
      animate={{ y: [800, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: 1 }}
      className="absolute bottom-0 right-1/4 w-px h-24 bg-gradient-to-t from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.8)]"
    />

    {/* Horizontal Micro Traces */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_99%,rgba(6,182,212,0.03)_100%)] bg-[size:100%_40px]" />

    {/* Very slow radial glow */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.03, 0.08, 0.03]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-cyan-900/20 rounded-full blur-[150px]"
    />

    {/* Max 5 Floating Particles — leftPct is stable, avoids Math.random() in render */}
    <FloatingParticle delay={0}  duration={15} xOffset={50}  size="w-2 h-2"     leftPct={8}  />
    <FloatingParticle delay={5}  duration={18} xOffset={-40} size="w-3 h-3"     leftPct={27} />
    <FloatingParticle delay={10} duration={22} xOffset={60}  size="w-1.5 h-1.5" leftPct={54} />
    <FloatingParticle delay={2}  duration={25} xOffset={-20} size="w-2.5 h-2.5" leftPct={71} />
    <FloatingParticle delay={8}  duration={20} xOffset={30}  size="w-2 h-2"     leftPct={89} />
  </div>
);

// ---------------------------------------------------------
// ANIMATED TEXT COMPONENT
// ---------------------------------------------------------

const AnimatedHeading = () => (
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-white"
    >
      Experience
    </motion.span>
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-slate-500"
    >
      &
    </motion.span>
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400"
    >
      Education
    </motion.span>
  </div>
);

// ---------------------------------------------------------
// TIMELINE NODE & CARD COMPONENT
// ---------------------------------------------------------

const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Derive active state directly from isInView — avoids cascading setState-in-effect
  const isInView = useInView(cardRef, { margin: "-25% 0px -25% 0px" });
  const isActive = isInView;

  return (
    <div ref={cardRef} className="relative w-full flex justify-center items-start mb-24 md:mb-32 group">

      {/* Node on the central timeline */}
      <div className="absolute left-[30px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 mt-8">
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1], opacity: 1 } : { scale: 0.8, opacity: 0.3 }}
          transition={{ duration: 0.5 }}
          className={`w-5 h-5 rounded-full border-2 bg-[#050816] flex items-center justify-center transition-colors duration-500 ${isActive ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'border-slate-700'}`}
        >
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-5 h-5 rounded-full bg-cyan-400"
            />
          )}
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-cyan-400' : 'bg-slate-700'}`} />
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`w-[calc(100%-80px)] ml-[80px] md:ml-0 md:w-5/12 relative z-10 
          ${isEven ? 'md:mr-[50%] md:pr-16 lg:pr-24 text-left md:text-right' : 'md:ml-[50%] md:pl-16 lg:pl-24 text-left'}`}
      >
        <motion.div
          layout
          className={`bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out origin-center
            ${isHovered ? '-translate-y-2 scale-[1.02] border-cyan-500/40 shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)] bg-white/[0.04]' : ''}
            ${isActive ? 'opacity-100' : 'opacity-50 grayscale-[50%]'}`}
        >

          {/* Header Area */}
          <motion.div layout className={`flex flex-col gap-3 mb-6 ${isEven ? 'md:items-end' : 'md:items-start'} items-start`}>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                {data.date}
              </span>
              <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-[10px] font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {data.location}
              </span>
            </div>
            <motion.h3 layout className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              {data.title}
            </motion.h3>
            <motion.h4 layout className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 opacity-70" /> {data.organization}
            </motion.h4>
          </motion.div>

          <motion.p layout className="text-slate-300 text-sm leading-relaxed font-medium">
            {data.description}
          </motion.p>

          {/* Expandable Content */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-white/10">
                  <h5 className={`text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                    <Terminal className="w-3 h-3" /> Key Responsibilities
                  </h5>
                  <ul className={`space-y-2 mb-6 ${isEven ? 'md:text-right text-left' : 'text-left'}`}>
                    {data.responsibilities.map((resp, i) => (
                      <li key={i} className={`text-sm text-slate-300 flex items-start gap-2 ${isEven ? 'md:flex-row-reverse md:justify-start flex-row' : 'flex-row'}`}>
                        <span className="text-cyan-500 mt-0.5">▹</span> {resp}
                      </li>
                    ))}
                  </ul>

                  <h5 className={`text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                    <CheckCircle2 className="w-3 h-3" /> Achievements
                  </h5>
                  <p className={`text-sm text-slate-300 mb-6 ${isEven ? 'md:text-right' : ''}`}>
                    {data.achievements[0]}
                  </p>

                  {/* Tech Tags */}
                  <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                    {data.tech.map((t, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(6,182,212,0.5)" }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-100 cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>

    </div>
  );
};

// ---------------------------------------------------------
// MAIN SECTION
// ---------------------------------------------------------

const Experience = () => {
  const containerRef = useRef(null);

  // Track scroll progress for the electrical connection line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full py-32 overflow-visible font-sans"
      ref={containerRef}
    >
      <BackgroundEffects />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-24 md:mb-32 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 border border-cyan-500/30 rounded-full bg-cyan-500/5 text-xs font-black text-cyan-400 mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            My Journey
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">
            <AnimatedHeading />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
          >
            A timeline highlighting my education, internships, professional training, and hands-on industry experience in software engineering, cloud computing, and cybersecurity.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <LayoutGroup>
          <div className="relative w-full max-w-5xl mx-auto pb-20">

            {/* Dim Static Background Line */}
            <div className="absolute left-[30px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />

            {/* Animated Electric Glow Line synced with Scroll */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[30px] md:left-1/2 transform md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-500 to-emerald-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] origin-top rounded-full z-10"
            />

            {/* Timeline Nodes */}
            <div className="relative z-20 pt-10">
              {experienceData.map((data, index) => (
                <TimelineItem key={data.id} data={data} index={index} />
              ))}
            </div>

            {/* Completion Node at the very bottom */}
            <div className="relative w-full flex justify-center mt-32">
              {/* Final Node on Line */}
              <div className="absolute left-[30px] md:left-1/2 transform -translate-x-1/2 -top-16 flex items-center justify-center z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-6 h-6 rounded-full border-2 border-cyan-400 bg-[#050816] flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-8 h-8 rounded-full bg-cyan-400"
                  />
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </motion.div>
              </div>

              {/* Completion Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-3xl p-10 md:p-14 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden group ml-[80px] md:ml-0"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-8 text-cyan-400 opacity-80"
                >
                  <InfinityIcon className="w-full h-full" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                  Journey Continues...
                </h3>
                <div className="space-y-2 text-slate-400 font-medium text-lg">
                  <p>Always Learning.</p>
                  <p>Always Building.</p>
                  <p className="text-cyan-400 font-bold">Always Growing.</p>
                </div>
              </motion.div>
            </div>

          </div>
        </LayoutGroup>

      </div>
    </motion.section>
  );
};

export default Experience;
