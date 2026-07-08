import { motion } from 'framer-motion';
 
const Skills = () => {
  const skillsData = [
    {
      category: 'SIEM & SOC Tools',
      skills: ['Elastic SIEM', 'Microsoft Sentinel', 'Log Ingestion', 'Event Monitoring', 'Windows Logs', 'Linux Logs'],
    },
    {
      category: 'SOC Operations',
      skills: ['Incident Triage', 'Alert Analysis', 'Event Correlation', 'Threat Detection', 'Playbook Execution'],
    },
    {
      category: 'Security Concepts',
      skills: ['MITRE ATT&CK', 'Incident Management', 'Authentication Analysis', 'RBAC', 'Vulnerability Discovery'],
    },
    {
      category: 'Networking & Scripting',
      skills: ['Python', 'Bash', 'PowerShell (Detection)', 'TCP/IP', 'Network Traffic Analysis', 'Firewalls'],
    },
    {
      category: 'Web Technologies',
      skills: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'Databases & Tools',
      skills: ['MongoDB', 'SQL', 'Git', 'GitHub', 'Linux', 'Manual Testing (Basics)'],
    },
  ];
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };
 
  const skillPillVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };
 
  const SkillCard = ({ category, skills }) => {
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{
          y: -8,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
        className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
      >
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none" />
 
        {/* Card content */}
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-sm font-semibold text-white mb-4 tracking-tight font-mono">
            {category}
          </h3>
 
          {/* Skills pills container */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {skills.map((skill, idx) => (
              <motion.button
                key={idx}
                variants={skillPillVariants}
                initial="initial"
                whileHover="hover"
                className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/40 hover:bg-emerald-500/15 border border-slate-800 hover:border-emerald-500/30 rounded-full transition-all duration-300 cursor-default select-none hover:text-emerald-400 font-mono"
              >
                {skill}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
 
  return (
    <section id="skills" className="relative w-full bg-slate-950 py-16 md:py-20 overflow-hidden border-t border-slate-900">
 
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 md:mb-12"
        >
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
              Technical Stack
            </span>
          </div>
 
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 tracking-tight">
            Specialized Toolkit & Tech
          </h2>
 
          <p className="text-sm text-slate-400 font-normal">
            A combined arsenal of full-stack web development technologies and advanced security monitoring tools.
          </p>
        </motion.div>
 
        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {skillsData.map((item, idx) => (
            <SkillCard
              key={idx}
              category={item.category}
              skills={item.skills}
            />
          ))}
        </motion.div>
      </div>
 
      {/* Floating accent elements - very subtle */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 right-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl pointer-events-none"
      />
 
      <motion.div
        animate={{
          y: [0, -8, 0],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-5 w-40 h-40 bg-cyan-500 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
};
 
export default Skills;
 