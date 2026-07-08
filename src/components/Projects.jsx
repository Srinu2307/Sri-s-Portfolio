import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, animate, useMotionValueEvent, useTransform } from 'framer-motion';
import { X, GitBranch, PlayCircle, Code2, Server, MonitorPlay } from 'lucide-react';

const projectsData = [
  {
    category: 'SIEM • MONITORING',
    title: 'SOC Log Analysis & Alerting',
    description: 'Ingested Windows Security Event Logs into Elastic SIEM. Designed rule-based detection alerts for suspicious login attempts and brute-force attacks.',
    stack: ['Elastic SIEM', 'Windows Events', 'Alerting'],
    link: '#',
    demo: '#',
    details: {
      problem: 'Detecting stealthy lateral movement and brute-force attempts in high-noise enterprise environments.',
      architecture: 'Logstash pipeline parsing Windows XML Event Logs into structured Elasticsearch indices with Kibana visualization.',
      features: ['Real-time brute-force detection', 'Custom MITRE ATT&CK dashboards', 'Playbook automation'],
      challenges: 'Tuning alert thresholds to eliminate false positives from legitimate admin activity.',
      learning: 'Mastered KQL (Kibana Query Language) and SIEM correlation rules.'
    }
  },
  {
    category: 'BASH • AUTOMATION',
    title: 'Linux System Monitoring',
    description: 'Developed Bash-based monitoring scripts to track service uptime and detect abnormal system behavior with structured logging mechanisms.',
    stack: ['Bash', 'Linux', 'Cron'],
    link: '#',
    demo: '#',
    details: {
      problem: 'Silent service failures were causing undetected downtime in critical Linux environments.',
      architecture: 'Cron-scheduled Bash agents pushing structured telemetry data to a centralized log server.',
      features: ['Process health tracking', 'Disk/RAM usage alerts', 'Automated service restarts'],
      challenges: 'Ensuring the monitoring script itself had an extremely low memory footprint.',
      learning: 'Advanced Bash scripting, systemd integrations, and Linux internals.'
    }
  },
  {
    category: 'WEB • SECURITY',
    title: 'RBAC Web Application',
    description: 'Implemented secure authentication and authorization mechanisms using RBAC principles with rigorous backend access control validation.',
    stack: ['Node.js', 'RBAC', 'JWT'],
    link: '#',
    demo: '#',
    details: {
      problem: 'Need for a highly granular, role-based access control system for enterprise API endpoints.',
      architecture: 'Node.js/Express backend acting as an API gateway with JWT-based stateless session validation.',
      features: ['Fine-grained endpoint protection', 'Secure password hashing (Argon2)', 'Token revocation strategies'],
      challenges: 'Handling token expiry and secure refresh mechanisms without compromising statelessness.',
      learning: 'Deep understanding of OAuth2, JWTs, and secure cookie handling.'
    }
  },
  {
    category: 'INFRA • SCRIPTING',
    title: 'Availability Checker',
    description: 'Built a proactive infrastructure monitoring tool using Bash to detect service outages and identify open ports, simulating SOC workflows.',
    stack: ['Bash', 'Networking', 'Ports'],
    link: '#',
    demo: '#',
    details: {
      problem: 'Lack of automated visibility into open attack surfaces on external-facing servers.',
      architecture: 'Lightweight bash scanner utilizing netcat and curl to probe specific service states.',
      features: ['Port scanning', 'HTTP status code verification', 'Slack webhook integration for alerts'],
      challenges: 'Parsing irregular curl output securely in a shell environment.',
      learning: 'Network protocol fundamentals (TCP/UDP) and bash text processing (awk/sed).'
    }
  },
  {
    category: 'FULL-STACK • MERN',
    title: 'Post Blogging Platform',
    description: 'Developed a secure authentication-based blogging platform with comprehensive CRUD operations and encrypted user data handling.',
    stack: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    demo: '#',
    details: {
      problem: 'Building a fully responsive, secure content management system from scratch.',
      architecture: 'MERN stack (MongoDB, Express, React, Node.js) with a RESTful API architecture.',
      features: ['Markdown support', 'User authentication', 'Image upload handling'],
      challenges: 'Managing complex state across the React frontend and ensuring secure API requests.',
      learning: 'Full-stack application lifecycle, React hooks, and NoSQL database modeling.'
    }
  },
  {
    category: 'WEB • MERN',
    title: 'Hotel Room Booking System',
    description: 'Implemented a complete reservation and availability management system with a strict focus on transactional integrity and backend validation.',
    stack: ['React', 'Express', 'MongoDB'],
    link: '#',
    demo: '#',
    details: {
      problem: 'Preventing double-booking of rooms in a high-concurrency reservation environment.',
      architecture: 'React frontend communicating with an Express backend using MongoDB transactions.',
      features: ['Real-time availability calendar', 'Secure payment gateway mock', 'Admin dashboard'],
      challenges: 'Implementing safe multi-document transactions in MongoDB.',
      learning: 'Concurrency control, database transactions, and building complex UI forms.'
    }
  }
];

// ---------------------------------------------------------
// MICRO-COMPONENTS
// ---------------------------------------------------------

const AnimatedText = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
          viewport={{ once: true }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const BackgroundEffects = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
    <motion.div
      animate={{ y: [0, -100, 0], x: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{ y: [0, 100, 0], x: [0, -50, 0], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px]"
    />
  </div>
);

// ---------------------------------------------------------
// INTERACTIVE NETWORK VISUALIZATION
// ---------------------------------------------------------

const InteractiveNetworkLine = ({ projectsCount, hoveredIndex, clickedIndex, onNodeHit }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Array of relative x positions for nodes (percentages)
  const nodePositions = Array.from({ length: projectsCount }).map((_, i) => ((i + 0.5) / projectsCount) * 100);
  
  // Motion value for the packet's progress (0 to 100)
  const xProgress = useMotionValue(0);
  const xProgressPulse = useMotionValue(0);
  
  // State to track ripples and glows for each node
  const [activeNodes, setActiveNodes] = useState(Array(projectsCount).fill(false));
  const [pulseNodes, setPulseNodes] = useState(Array(projectsCount).fill(false));
  
  const lastTriggeredNode = useRef(-1);

  // Main ambient packet animation
  useEffect(() => {
    if (!isInView) return;
    const anim = animate(xProgress, 100, {
      duration: 12,
      repeat: Infinity,
      ease: "linear"
    });
    
    // Pause ambient flow on hover
    if (hoveredIndex !== null) {
      anim.pause();
    } else {
      anim.play();
    }
    
    return () => anim.stop();
  }, [isInView, hoveredIndex, xProgress]);

  // High velocity pulse animation on click
  useEffect(() => {
    if (clickedIndex !== null) {
      xProgressPulse.set(0);
      // Reset pulse inside animation complete callback to avoid setState-in-effect anti-pattern
      const targetX = nodePositions[clickedIndex];
      
      const anim = animate(xProgressPulse, targetX, {
        duration: 0.6,
        ease: "easeOut",
        onComplete: () => {
          setTimeout(() => setPulseNodes(Array(projectsCount).fill(false)), 1000);
        }
      });
      return () => anim.stop();
    }
  }, [clickedIndex, nodePositions, projectsCount, xProgressPulse]);

  // Monitor the ambient packet's position to trigger node ripples
  useMotionValueEvent(xProgress, "change", (latest) => {
    for (let i = 0; i < nodePositions.length; i++) {
      const pos = nodePositions[i];
      // When packet crosses the node position within a small threshold
      if (Math.abs(latest - pos) < 1.0) {
        if (lastTriggeredNode.current !== i) {
          lastTriggeredNode.current = i;
          
          // Trigger the node ripple visually
          setActiveNodes(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          
          // Trigger the corresponding project card glow
          onNodeHit(i);
          
          // Turn off visual ripple after 500ms
          setTimeout(() => {
            setActiveNodes(prev => {
              const next = [...prev];
              next[i] = false;
              return next;
            });
          }, 500);
        }
      }
    }
    
    // Reset tracker if it loops
    if (latest > 99) lastTriggeredNode.current = -1;
  });
  
  // Monitor the high-velocity pulse position
  useMotionValueEvent(xProgressPulse, "change", (latest) => {
    for (let i = 0; i < nodePositions.length; i++) {
      if (latest >= nodePositions[i] && clickedIndex >= i) {
        setPulseNodes(prev => {
          if (prev[i]) return prev;
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }
    }
  });

  const packetLeft = useTransform(xProgress, v => `${v}%`);
  const pulseLeft = useTransform(xProgressPulse, v => `${v}%`);

  return (
    <div ref={ref} className="relative w-full h-24 flex items-center justify-center my-10 overflow-visible">
      {/* Container to restrict bounds exactly to width */}
      <div className="relative w-full max-w-5xl h-full flex items-center">
        
        {/* Base inactive connection line */}
        <div className="absolute w-full h-px bg-slate-800" />
        
        {/* Glowing entrance line animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent origin-left"
        />

        {/* Hover Intensity line (shows when hovering a card) */}
        <motion.div
          animate={{ opacity: hoveredIndex !== null ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.6)] origin-left"
        />
        
        {/* Ambient Data Packet */}
        {isInView && (
          <motion.div
            style={{ left: packetLeft }}
            className="absolute z-30 w-3 h-3 -ml-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,1)]"
          />
        )}
        
        {/* High-Velocity Pulse Packet (Click Interaction) */}
        {clickedIndex !== null && (
          <motion.div
            style={{ left: pulseLeft }}
            className="absolute z-40 w-4 h-[2px] -ml-2 bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
          />
        )}

        {/* Nodes overlay */}
        <div className="absolute inset-0 w-full h-full">
          {nodePositions.map((pos, i) => {
            const isHovered = hoveredIndex === i;
            const isPulseActive = pulseNodes[i];
            const isRippleActive = activeNodes[i];
            
            return (
              <div 
                key={i} 
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ left: `${pos}%` }}
              >
                {/* Node Ripple Effect */}
                <AnimatePresence>
                  {(isRippleActive || isPulseActive) && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 3.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute w-4 h-4 rounded-full border border-cyan-400 z-10"
                    />
                  )}
                </AnimatePresence>
                
                {/* Node Core */}
                <motion.div
                  animate={{
                    scale: (isRippleActive || isHovered || isPulseActive) ? 1.4 : 1,
                    backgroundColor: (isRippleActive || isHovered || isPulseActive) ? "#22d3ee" : "#0f172a", // cyan-400 or slate-900
                    borderColor: (isRippleActive || isHovered || isPulseActive) ? "#ffffff" : "#22d3ee"
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2.5 h-2.5 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-20"
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};


// ---------------------------------------------------------
// TERMINAL SIMULATOR
// ---------------------------------------------------------


// Defined outside component so the reference is stable and won't cause missing-dep warnings
const TERMINAL_LOGS = [
  "Initializing secure repositories...",
  "Loading source metadata hashes...",
  "Synchronizing project index...",
  "Analyzing architecture matrices...",
  "Applying RBAC policies...",
  "Repository verification complete. Access GRANTED."
];

const TerminalSimulator = () => {
  const [lines, setLines] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < TERMINAL_LOGS.length) {
        setLines(prev => [...prev, TERMINAL_LOGS[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto mt-32 mb-10 relative z-10">
      <div className="flex items-center mb-8">
        <h3 className="text-xl font-black text-white whitespace-nowrap mr-6 tracking-tight flex items-center gap-3">
          <Server className="w-5 h-5 text-emerald-500" />
          System Logs & Repositories
        </h3>
        <div className="h-px w-full bg-slate-800/50"></div>
      </div>

      <div className="bg-black border border-slate-800 rounded-lg p-6 font-mono text-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-slate-500 ml-2 font-sans tracking-widest">SOC_TERMINAL_v2.1</span>
        </div>
        
        <div className="pt-6 min-h-[160px] flex flex-col gap-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start ${i === TERMINAL_LOGS.length - 1 ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
            >
              <span className="text-emerald-500 mr-2 opacity-50">❯</span>
              {line}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2.5 h-4 bg-emerald-500 mt-1 ml-4 inline-block"
          />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// MODAL COMPONENT
// ---------------------------------------------------------

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-48 md:h-64 bg-slate-950 flex items-center justify-center overflow-hidden shrink-0 rounded-t-3xl border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
          <Code2 className="w-24 h-24 text-slate-800/50" />
          
          <div className="absolute bottom-6 left-8">
             <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
               {project.category}
             </p>
             <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
               {project.title}
             </h2>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-10 flex-1">
          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
               <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block" />
               Overview
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Problem Statement</h4>
              <p className="text-slate-300 leading-relaxed text-sm">{project.details.problem}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Architecture</h4>
              <p className="text-slate-300 leading-relaxed text-sm">{project.details.architecture}</p>
            </div>
          </div>

          <div>
             <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Technology Stack</h4>
             <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm font-medium text-emerald-300 shadow-inner">
                    {tech}
                  </span>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50">
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Key Features</h4>
              <ul className="space-y-2">
                {project.details.features.map((feature, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start">
                    <span className="text-emerald-500 mr-2 mt-0.5">▹</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Challenges & Learnings</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4"><strong>Challenge:</strong> {project.details.challenges}</p>
              <p className="text-slate-300 text-sm leading-relaxed"><strong>Learning:</strong> {project.details.learning}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md rounded-b-3xl flex flex-wrap gap-4 shrink-0">
           <a href={project.demo} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors">
             <PlayCircle className="w-5 h-5" /> Live Demo
           </a>
           <a href={project.link} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-colors">
             <GitBranch className="w-5 h-5" /> Repository
           </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------
// MAIN CARD COMPONENT
// ---------------------------------------------------------

const ProjectCard = ({ project, index, onOpen, onHover, isTimelineActive, isClicked }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleHoverStart = () => onHover(index);
  const handleHoverEnd = () => onHover(null);
  const handleClick = () => onOpen(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
      className="relative block group"
    >
      <motion.div
        animate={{ 
          y: [0, -4, 0],
          // Subtle scale down if a click pulse hits it
          scale: isClicked ? 0.96 : 1
        }}
        transition={{ 
          y: { duration: 6 + (index % 2), repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.3 }
        }}
        className="h-full"
      >
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={`relative h-full w-full bg-slate-900 border rounded-[2rem] p-8 shadow-xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between
            group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:border-emerald-500/40
            ${isTimelineActive ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-slate-800' : 'border-slate-800'}
          `}
        >
          {/* Dynamic Radial Glow following Cursor */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.06), transparent 40%)`
            }}
          />

          {/* Top Hole Punch */}
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center z-20 shadow-inner transition-colors duration-500
            group-hover:border-emerald-500/30 ${isTimelineActive ? 'border-cyan-500/50' : ''}`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-500 
              ${isTimelineActive ? 'bg-cyan-400' : 'bg-slate-800 group-hover:bg-emerald-500/50'}`} 
            />
          </div>

          <div className="relative z-10 flex-1">
            <p className="text-emerald-500 text-xs font-bold tracking-widest mb-3 uppercase">
              {project.category}
            </p>

            <h3 className="text-white text-2xl font-black tracking-tight mb-4 group-hover:text-emerald-400 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
              {project.description}
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-950/80 border border-slate-800/80 rounded-full text-[10px] font-bold text-slate-300 shadow-sm group-hover:border-slate-700 group-hover:text-emerald-100 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Dark Overlay Preview */}
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 flex items-center justify-center p-6 text-center">
            <div className="space-y-4 w-full px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
               <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                 <MonitorPlay className="w-5 h-5" />
               </div>
               <button className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl shadow-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                 View Case Study
               </button>
               <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                 <GitBranch className="w-4 h-4" /> Source Code
               </button>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------
// MAIN SECTION
// ---------------------------------------------------------

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [clickedProjectIndex, setClickedProjectIndex] = useState(null);
  
  // Track which node is currently glowing because the packet hit it
  const [activeTimelineNode, setActiveTimelineNode] = useState(null);

  const handleNodeHit = (index) => {
    setActiveTimelineNode(index);
    setTimeout(() => setActiveTimelineNode(null), 600); // Cards glow for 600ms
  };

  const handleProjectClick = (index) => {
    setClickedProjectIndex(index);
    // Open modal after pulse finishes (approx 800ms)
    setTimeout(() => {
      setSelectedProjectIndex(index);
      setClickedProjectIndex(null);
    }, 800);
  };

  return (
    <motion.section 
      id="projects" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full bg-slate-950 py-32 overflow-hidden border-t border-slate-900 font-sans"
    >
      <BackgroundEffects />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-12 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 border border-emerald-500/30 rounded-full bg-emerald-500/5 text-xs font-black text-emerald-400 mb-8 shadow-[0_0_15px_rgba(16,185,129,0.15)] uppercase tracking-widest"
          >
            Featured Work
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
            <AnimatedText text="Projects That Define" />
            <span className="relative inline-block mt-2">
              <AnimatedText text="My Journey" />
              <motion.svg 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute w-full h-4 -bottom-2 left-0 text-emerald-500 -z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                viewBox="0 0 200 12" 
                preserveAspectRatio="none"
              >
                <motion.path d="M0,8 Q100,-4 200,8 L200,12 L0,12 Z" fill="currentColor" />
              </motion.svg>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
          >
            A curated portfolio of production-grade platforms, robust access controls, and automated log analysis systems built for scale and SOC observability.
          </motion.p>
        </div>

        {/* The new interactive network line */}
        <InteractiveNetworkLine 
          projectsCount={projectsData.length} 
          hoveredIndex={hoveredProjectIndex}
          clickedIndex={clickedProjectIndex}
          onNodeHit={handleNodeHit}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              onOpen={handleProjectClick}
              onHover={setHoveredProjectIndex}
              isTimelineActive={activeTimelineNode === index}
              isClicked={clickedProjectIndex === index}
            />
          ))}
        </div>

        <TerminalSimulator />

      </div>

      <AnimatePresence>
        {selectedProjectIndex !== null && (
          <ProjectModal 
            project={projectsData[selectedProjectIndex]} 
            onClose={() => setSelectedProjectIndex(null)} 
          />
        )}
      </AnimatePresence>

    </motion.section>
  );
};

export default Projects;
